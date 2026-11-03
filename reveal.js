(function(){
  var wrap=document.getElementById('plwrap');
  if(!wrap||(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches))return;
  wrap.classList.add('loading');
  var started=false;
  function start(){
    if(started)return;started=true;
    wrap.classList.remove('loading');wrap.classList.add('intro');
    setTimeout(function(){wrap.classList.remove('intro');},3400);
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();setTimeout(start,400);}},{threshold:0.3});
    io.observe(wrap);
  }else setTimeout(start,800);
})();
