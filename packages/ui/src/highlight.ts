export type CodeLanguage = 'tsx' | 'ts' | 'js' | 'jsx' | 'css' | 'json' | 'bash' | 'html'

/** the roles GitHub's prettylights draws, which is what the colours are taken from */
export type TokenType = 'comment' | 'string' | 'constant' | 'keyword' | 'entity' | 'tag' | 'plain'

export interface Token {
  type: TokenType
  value: string
  /** offset into the source, so a list of these has stable keys without an index */
  at: number
}

/**
 * A small tokenizer for the few languages a Rodium page documents. It is not a
 * parser: it matches comments and strings first, because those swallow anything
 * that looks like syntax inside them, and everything after that is ordinary
 * word matching.
 *
 * The kit carries two runtime dependencies and this keeps it at two. Where a
 * page needs grammar-accurate colour — a language this does not know, or code
 * it does not control — highlight it upstream and hand over the result.
 */

const BACKTICK = String.fromCharCode(96)

const JS_KEYWORDS =
  'import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|' +
  'type|interface|enum|extends|implements|new|delete|await|async|class|of|in|typeof|instanceof|as|satisfies|' +
  'this|super|try|catch|finally|throw|yield|readonly|public|private|protected|static'

const CSS_KEYWORDS = 'important|from|to|and|not|only|or'

const BASH_KEYWORDS = 'if|then|else|fi|for|in|do|done|while|case|esac|function|return|export|local|source'

type Rule = [
  TokenType,
  string,
]

const QUOTED = String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`

const JS_RULES: readonly Rule[] = [
  [
    'comment',
    String.raw`//[^\n]*|/\*[\s\S]*?\*/`,
  ],
  [
    'string',
    `${QUOTED}|${BACKTICK}(?:\\\\.|[^${BACKTICK}\\\\])*${BACKTICK}`,
  ],
  // the name right after < or </ is a tag, which github draws apart from a
  // plain capitalised identifier
  [
    'tag',
    String.raw`(?<=<\/?)[A-Za-z][\w.]*`,
  ],
  [
    'keyword',
    String.raw`\b(?:${JS_KEYWORDS})\b`,
  ],
  [
    'constant',
    String.raw`\b(?:true|false|null|undefined)\b|\b\d[\d_]*(?:\.\d+)?\b`,
  ],
  [
    'entity',
    String.raw`\b[A-Z][A-Za-z0-9_]*\b`,
  ],
]

type Dialect = 'tsx' | 'css' | 'json' | 'bash' | 'html'

// the js family shares one grammar, so the alias map is what keeps a single
// copy of it rather than four
const ALIAS: Record<CodeLanguage, Dialect> = {
  tsx: 'tsx',
  ts: 'tsx',
  js: 'tsx',
  jsx: 'tsx',
  css: 'css',
  json: 'json',
  bash: 'bash',
  html: 'html',
}

const GRAMMARS: Record<Dialect, readonly Rule[]> = {
  tsx: JS_RULES,
  css: [
    [
      'comment',
      String.raw`/\*[\s\S]*?\*/`,
    ],
    [
      'string',
      QUOTED,
    ],
    [
      'keyword',
      String.raw`@[a-zA-Z-]+|\b(?:${CSS_KEYWORDS})\b`,
    ],
    // github draws a selector like a tag, a property like a constant and a
    // measured value like a string
    [
      'tag',
      String.raw`\.[a-zA-Z][\w-]*|::?[a-z-]+(?![\w-]*\s*:)`,
    ],
    [
      'constant',
      String.raw`--[a-zA-Z0-9-]+|[a-zA-Z-]+(?=\s*:)`,
    ],
    [
      'string',
      String.raw`#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|s|ms|vw|vh|svh|dvh|fr|deg|ch)?\b`,
    ],
  ],
  json: [
    [
      'constant',
      String.raw`"(?:\\.|[^"\\])*"(?=\s*:)`,
    ],
    [
      'string',
      String.raw`"(?:\\.|[^"\\])*"`,
    ],
    [
      'constant',
      String.raw`\b(?:true|false|null)\b|-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b`,
    ],
  ],
  bash: [
    [
      'comment',
      String.raw`#[^\n]*`,
    ],
    [
      'string',
      QUOTED,
    ],
    [
      'keyword',
      String.raw`\b(?:${BASH_KEYWORDS})\b|(?:^|\s)--?[a-zA-Z][\w-]*`,
    ],
    [
      'constant',
      String.raw`\b\d+\b`,
    ],
    [
      'entity',
      String.raw`^\s*[a-zA-Z][\w.-]*`,
    ],
  ],
  html: [
    [
      'comment',
      String.raw`<!--[\s\S]*?-->`,
    ],
    [
      'string',
      QUOTED,
    ],
    [
      'tag',
      String.raw`(?<=<\/?)[a-zA-Z][\w-]*`,
    ],
    [
      'constant',
      '[a-zA-Z-]+(?==)',
    ],
  ],
}

const CACHE = new Map<string, RegExp>()

function scanner(language: CodeLanguage): RegExp {
  const dialect = ALIAS[language]
  const cached = CACHE.get(dialect)
  if (cached) return cached
  // one alternation, so the first rule that matches at a position wins and a
  // comment can never be re-read as a keyword. a duplicated group name is not
  // allowed, so each rule gets its own and the type is read back from a map.
  const rules = GRAMMARS[dialect]
  const source = rules.map(([, pattern], index) => `(?<g${index}>${pattern})`).join('|')
  const re = new RegExp(source, 'gm')
  CACHE.set(dialect, re)
  return re
}

export function highlight(code: string, language?: CodeLanguage): Token[] {
  if (!language || !(language in ALIAS)) {
    return [
      {
        type: 'plain',
        value: code,
        at: 0,
      },
    ]
  }

  const rules = GRAMMARS[ALIAS[language]]
  const re = scanner(language)
  re.lastIndex = 0

  const tokens: Token[] = []
  let last = 0

  for (const match of code.matchAll(re)) {
    const at = match.index
    if (at > last)
      tokens.push({
        type: 'plain',
        value: code.slice(last, at),
        at: last,
      })

    const groups = match.groups ?? {}
    const hit = Object.keys(groups).find(key => groups[key] !== undefined)
    const index = hit ? Number(hit.slice(1)) : -1
    tokens.push({
      type: rules[index]?.[0] ?? 'plain',
      value: match[0],
      at,
    })
    last = at + match[0].length
  }

  if (last < code.length)
    tokens.push({
      type: 'plain',
      value: code.slice(last),
      at: last,
    })
  return tokens
}
