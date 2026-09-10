// the disclosure is the browser's own; this is what it does not do. close on a
// link, close on escape, close on a tap outside, and build the opening.
//
// the opening is built with Element.animate rather than left to a css rule on
// [open]: a closed <details> subtree skips style recalc, so a css animation
// bound to that selector is never torn down and only ever runs once.
//
// toggle fires after the browser has already painted the open sheet, so the
// sheet is stamped invisible on the way in - on the click or the key, while it
// is still hidden - and the stamp is lifted the moment the animation exists.
// the lift is unconditional, so no path can leave the sheet hidden.
export const MENU_SCRIPT = `
addEventListener('click',function(e){
  var t=e.target,a=t.closest&&t.closest('a');
  document.querySelectorAll('.menu[open]').forEach(function(d){
    if(!d.contains(t)||(a&&d.contains(a)))d.open=false;
  });
});
addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  document.querySelectorAll('.menu[open]').forEach(function(d){
    d.open=false;var s=d.querySelector('summary');if(s)s.focus();
  });
});
var calm=matchMedia('(prefers-reduced-motion: reduce)');
var ease='cubic-bezier(.16,1,.3,1)';
document.querySelectorAll('.menu').forEach(function(d){
  var sheet=function(){return d.querySelector('.sheet')};
  var arm=function(){
    if(d.open||calm.matches)return;
    var s=sheet();if(s&&s.animate)s.style.opacity='0';
  };
  var sum=d.querySelector('summary');
  if(sum){
    sum.addEventListener('click',arm);
    sum.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' ')arm();
    });
  }
  d.addEventListener('toggle',function(){
    var s=sheet();if(!s)return;
    s.style.opacity='';
    if(!d.open||calm.matches||!s.animate)return;
    s.animate([{opacity:0,clipPath:'inset(0 0 100% 0)'},
               {opacity:1,clipPath:'inset(0)'}],
      {duration:320,easing:ease});
    s.querySelectorAll('a').forEach(function(a,i){
      a.animate([{opacity:0,transform:'translateY(10px)',filter:'blur(6px)'},
                 {opacity:1,transform:'none',filter:'none'}],
        {duration:360,delay:60+i*45,easing:ease,fill:'backwards'});
    });
  });
});`
