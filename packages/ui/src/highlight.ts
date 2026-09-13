export type CodeLanguage = 'tsx' | 'ts' | 'js' | 'jsx' | 'css' | 'json' | 'bash' | 'html'

export type TokenType = 'comment' | 'string' | 'number' | 'keyword' | 'name' | 'plain'

export interface Token {
  type: TokenType
  value: string
  /** byte offset, so a list of these has stable keys without an index */
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
 * it does not control — highlight it upstream and hand CodeBlock the result.
 */

const JS_KEYWORDS =
  'import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|' +
  'type|interface|enum|extends|implements|new|delete|await|async|class|of|in|typeof|instanceof|as|satisfies|' +
  'null|undefined|true|false|this|super|try|catch|finally|throw|yield|readonly|public|private|protected|static'

const CSS_KEYWORDS = 'important|from|to|and|not|only|or'

const BASH_KEYWORDS = 'if|then|else|fi|for|in|do|done|while|case|esac|function|return|export|local|source'

const BACKTICK = String.fromCharCode(96)

type Rule = [
  TokenType,
  string,
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
  tsx: [
    [
      'comment',
      String.raw`//[^\n]*|/\*[\s\S]*?\*/`,
    ],
    [
      'string',
      `'(?:\\\\.|[^'\\\\])*'|"(?:\\\\.|[^"\\\\])*"|${BACKTICK}(?:\\\\.|[^${BACKTICK}\\\\])*${BACKTICK}`,
    ],
    [
      'keyword',
      String.raw`\b(?:${JS_KEYWORDS})\b`,
    ],
    [
      'number',
      String.raw`\b\d[\d_]*(?:\.\d+)?\b`,
    ],
    // a capitalised word is a component or a type, which is what a reader scans for
    [
      'name',
      String.raw`\b[A-Z][A-Za-z0-9_]*\b`,
    ],
  ],
  css: [
    [
      'comment',
      String.raw`/\*[\s\S]*?\*/`,
    ],
    [
      'string',
      String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`,
    ],
    [
      'keyword',
      String.raw`@[a-zA-Z-]+|\b(?:${CSS_KEYWORDS})\b`,
    ],
    [
      'name',
      String.raw`--[a-zA-Z0-9-]+|[a-zA-Z-]+(?=\s*:)`,
    ],
    [
      'number',
      String.raw`#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|em|%|s|ms|vw|vh|svh|dvh|fr|deg|ch)?\b`,
    ],
  ],
  json: [
    [
      'name',
      String.raw`"(?:\\.|[^"\\])*"(?=\s*:)`,
    ],
    [
      'string',
      String.raw`"(?:\\.|[^"\\])*"`,
    ],
    [
      'keyword',
      String.raw`\b(?:true|false|null)\b`,
    ],
    [
      'number',
      String.raw`-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b`,
    ],
  ],
  bash: [
    [
      'comment',
      String.raw`#[^\n]*`,
    ],
    [
      'string',
      String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`,
    ],
    [
      'keyword',
      String.raw`\b(?:${BASH_KEYWORDS})\b|(?:^|\s)--?[a-zA-Z][\w-]*`,
    ],
    [
      'number',
      String.raw`\b\d+\b`,
    ],
    [
      'name',
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
      String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`,
    ],
    [
      'keyword',
      String.raw`</?[a-zA-Z][\w-]*|/?>`,
    ],
    [
      'name',
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
  // comment can never be re-read as a keyword
  const source = GRAMMARS[dialect].map(([type, pattern]) => `(?<${type}>${pattern})`).join('|')
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
    const type = (Object.keys(groups).find(key => groups[key] !== undefined) ?? 'plain') as TokenType
    tokens.push({
      type,
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
