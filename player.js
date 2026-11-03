(function(){
  var TRACKS=[
    {name:'Kai Angel — Pretty Girls',url:'assets/audio/01-kai-angel-pretty-girls.mp3'},
    {name:'Kai Angel feat. 9mice — Lipstick',url:'assets/audio/02-kai-angel-feat-9mice-lipstick.mp3'},
    {name:'9mice feat. Kai Angel — Phoenix',url:'assets/audio/03-9mice-feat-kai-angel-phoenix.mp3'},
    {name:'9mice — Honey Bunny',url:'assets/audio/04-9mice-honey-bunny.mp3'}
  ];
  var cur=0,audio=null,tn=document.getElementById('tn');
  var EVS=['click','keydown','touchend','pointerup'];
  function renderList(){
    var pl=document.getElementById('pl');pl.innerHTML='';
    TRACKS.forEach(function(t,i){
      var li=document.createElement('li'),b=document.createElement('button');
      b.type='button';if(i===cur)b.className='cur';
      var n=document.createElement('span');n.className='n';n.textContent=(i<9?'0':'')+(i+1);
      var s=document.createElement('span');s.className='t';s.textContent=t.name;
      var e=document.createElement('span');e.className='eq';e.innerHTML='<i></i><i></i><i></i>';
      b.appendChild(n);b.appendChild(s);b.appendChild(e);
      b.addEventListener('click',function(){
        unkick();
        if(i===cur&&audio){if(audio.paused)audio.play().catch(function(){});else audio.pause();}
        else go(i);
      });
      li.appendChild(b);pl.appendChild(li);
    });
  }
  function go(i){
    cur=(i+TRACKS.length)%TRACKS.length;
    if(audio)audio.pause();
    var t=TRACKS[cur],a=new Audio(t.url);audio=a;
    a.addEventListener('error',function(){
      if(a!==audio)return;
      tn.textContent='не удалось загрузить трек';
    });
    audio.addEventListener('ended',function(){go(cur+1);});
    audio.addEventListener('play',ui);audio.addEventListener('pause',ui);
    tn.textContent=TRACKS[cur].name;
    renderList();
    audio.play().catch(function(){});
  }
  function unkick(){EVS.forEach(function(e){document.removeEventListener(e,kick);});}
  function kick(ev){
    if(ev&&ev.target&&ev.target.closest&&ev.target.closest('#pp,#bp,#pl'))return;
    if(audio&&audio.paused){audio.play().then(unkick).catch(function(){});}else unkick();
  }
  var pp=document.getElementById('pp'),bp=document.getElementById('bp');
  function ui(){
    var on=audio&&!audio.paused;
    pp.innerHTML='<svg viewBox="0 0 24 24"><path d="'+(on?'M6 5h4v14H6zM14 5h4v14h-4z':'M8 5v14l11-7z')+'"/></svg>';
    pp.setAttribute('aria-label',on?'Пауза':'Играть');
    document.getElementById('pl').classList.toggle('on',!!on);
    bp.innerHTML='<svg viewBox="0 0 24 24"><path d="'+(on?'M6 5h4v14H6zM14 5h4v14h-4z':'M8 5v14l11-7z')+'"/></svg><span>'+(on?'Пауза':'Включить музыку')+'</span>';
  }
  [pp,bp].forEach(function(b){b.addEventListener('click',function(){
    unkick();
    if(!audio)return;
    if(audio.paused)audio.play().catch(function(){});else audio.pause();
  });});
  document.getElementById('prev').addEventListener('click',function(){go(cur-1);});
  document.getElementById('next').addEventListener('click',function(){go(cur+1);});
  EVS.forEach(function(e){document.addEventListener(e,kick);});
  go(0);
})();
