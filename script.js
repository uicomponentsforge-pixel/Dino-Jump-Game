(() => {
  const canvas = document.getElementById('game'), ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score'), hiEl = document.getElementById('hi');
  const startBtn = document.getElementById('start'), pauseBtn = document.getElementById('pause');
  const W=900,H=280, groundY=226;
  let dino, obstacles, clouds, score, hi=Number(localStorage.getItem('dinoHi')||0), speed, frame, state='ready', duck=false;
  hiEl.textContent=String(hi).padStart(5,'0');
  function reset(){
    dino={x:72,y:groundY-44,w:34,h:44,vy:0,onGround:true,step:0};
    obstacles=[]; clouds=[{x:220,y:48},{x:590,y:72},{x:790,y:38}];
    score=0; speed=6; frame=0; duck=false; state='playing'; scoreEl.textContent='00000';
  }
  function jump(){
    if(state==='ready'||state==='over'){reset();return;}
    if(state==='paused'){state='playing';return;}
    if(dino.onGround){dino.vy=-13.5;dino.onGround=false;}
  }
  function drawDino(x,y,w,h,leg=0,isDuck=false){
    ctx.fillStyle='#535353';
    if(isDuck){
      ctx.fillRect(x,y+12,38,22); ctx.fillRect(x+23,y+1,19,19);
      ctx.fillRect(x+36,y+8,11,5); ctx.fillStyle='#fff';ctx.fillRect(x+35,y+5,3,3);
      ctx.fillStyle='#535353';ctx.fillRect(x+5,y+30,7,8);ctx.fillRect(x+25,y+30,7,8);
      ctx.fillRect(x-5,y+17,9,5);
    } else {
      ctx.fillRect(x+6,y+12,23,27); ctx.fillRect(x+17,y,20,22);
      ctx.fillRect(x+31,y+9,11,5); ctx.fillRect(x+1,y+17,9,6);
      ctx.fillStyle='#fff';ctx.fillRect(x+28,y+5,4,4);
      ctx.fillStyle='#535353';
      ctx.fillRect(x+9,y+37,7,7+(leg%2?0:-4));ctx.fillRect(x+23,y+37,7,7+(leg%2?-4:0));
      ctx.fillRect(x+11,y+23,5,12);
    }
  }
  function cactus(o){
    ctx.fillStyle='#535353';let x=o.x,y=groundY-o.h;
    ctx.fillRect(x+8,y,10,o.h);ctx.fillRect(x,y+14,8,6);ctx.fillRect(x,y+7,5,13);
    ctx.fillRect(x+18,y+23,8,6);ctx.fillRect(x+21,y+15,5,14);
  }
  function drawGround(){
    ctx.strokeStyle='#777';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,groundY);ctx.lineTo(W,groundY);ctx.stroke();
    ctx.fillStyle='#aaa';
    for(let i=0;i<14;i++){let x=((i*83-frame*speed*.7)%W+W)%W;ctx.fillRect(x,groundY+10+(i%3)*5,18,2);}
  }
  function drawCloud(c){
    ctx.strokeStyle='#ddd';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(c.x,c.y+5);ctx.lineTo(c.x+28,c.y+5);ctx.moveTo(c.x+7,c.y);ctx.lineTo(c.x+7,c.y+5);ctx.moveTo(c.x+18,c.y-3);ctx.lineTo(c.x+18,c.y+5);ctx.stroke();
  }
  function overlay(title,subtitle){
    ctx.fillStyle='rgba(255,255,255,.88)';ctx.fillRect(220,82,460,88);
    ctx.textAlign='center';ctx.fillStyle='#535353';ctx.font='bold 27px Arial';ctx.fillText(title,W/2,116);
    ctx.font='16px Arial';ctx.fillText(subtitle,W/2,145);ctx.textAlign='left';
  }
  function loop(){
    ctx.clearRect(0,0,W,H);
    // faint pixel-style sun
    ctx.fillStyle='#f7f7f7';ctx.fillRect(800,20,24,24);
    clouds.forEach(c=>{drawCloud(c); if(state==='playing') c.x-=speed*.25; if(c.x < -40)c.x=W+30;});
    drawGround();
    if(state==='playing'){
      frame++; score=Math.floor(frame/5); speed=Math.min(12,6+score/180);
      if(frame%Math.max(42,Math.floor(94-speed*3))===0) obstacles.push({x:W+10,h:30+Math.floor(Math.random()*25),w:27});
      obstacles.forEach(o=>o.x-=speed);
      obstacles=obstacles.filter(o=>o.x>-40);
      dino.vy+=.68;dino.y+=dino.vy;
      const floor=groundY-dino.h;
      if(dino.y>=floor){dino.y=floor;dino.vy=0;dino.onGround=true;}
      dino.step++;
      for(const o of obstacles){
        const dh=duck?25:34, dy=duck?dino.y+14:dino.y+7;
        if(dino.x+ (duck?40:29)>o.x+2 && dino.x+5<o.x+o.w-2 && dy+dh>groundY-o.h+3){
          state='over';
          if(score>hi){hi=score;localStorage.setItem('dinoHi',hi);hiEl.textContent=String(hi).padStart(5,'0');}
          break;
        }
      }
      scoreEl.textContent=String(score).padStart(5,'0');
    }
    obstacles.forEach(cactus);
    drawDino(dino?dino.x:72,dino?dino.y:groundY-44,34,44,dino?dino.step:0,duck&&state==='playing');
    if(state==='ready')overlay('DINO JUMP','Press SPACE, ↑, or tap to start');
    if(state==='over')overlay('GAME OVER','Press SPACE or tap to try again');
    if(state==='paused')overlay('PAUSED','Press Pause or tap to continue');
    requestAnimationFrame(loop);
  }
  reset(); state='ready';
  function setDuck(v){duck=v;if(dino&&v&&dino.onGround){dino.h=25;dino.y=groundY-25;}else if(dino){dino.h=44;if(dino.onGround)dino.y=groundY-44;}}
  document.addEventListener('keydown',e=>{
    if(['Space','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault();
    if(e.code==='Space'||e.code==='ArrowUp')jump();
    if(e.code==='ArrowDown')setDuck(true);
  });
  document.addEventListener('keyup',e=>{if(e.code==='ArrowDown')setDuck(false);});
  canvas.addEventListener('pointerdown',()=>jump());
  startBtn.addEventListener('click',()=>reset());
  pauseBtn.addEventListener('click',()=>{if(state==='playing')state='paused';else if(state==='paused')state='playing';});
  requestAnimationFrame(loop);
})();
