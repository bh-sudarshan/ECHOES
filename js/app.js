/* ECHOES — all features run in the browser, no backend, database, or APIs. */
(() => {
  'use strict';
  const data = window.ECHOES_DATA || [];
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const pad = x => String(x).padStart(2, '0');
  const STORAGE_KEY = 'echoes-space-historian-v1';
  let progress = {read:[],solved:[]};
  try {const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');progress={read:Array.isArray(stored.read)?stored.read:[],solved:Array.isArray(stored.solved)?stored.solved:[]};}catch(e) { /* Private browsing can restrict storage. */ }
  const save = () => {try {localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));} catch(e) { /* App remains usable without storage. */ }};
  const mark = (key,id) => {if(!progress[key].includes(id)){progress[key].push(id);save();updatePassport();renderArchive();toast(key==='read'?'Story recorded in your Space Passport.':'Mission detective case solved!');}};
  let atlasWorld = 'mars', archiveFilter = 'all', archiveSearch = '', archiveSort = 'featured', activeMission = null, chapterIndex = 0, showingQuiz = false, quizSolvedNow = false, previousRoute = '#/home', toastTimeout, voice = null;

  function toast(message) {const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('show'),3100);}
  function go(route) {window.location.hash = '#/'+route;}
  function setPage(name){$$('.page').forEach(el=>el.classList.toggle('active',el.id==='page-'+name));$$('[data-nav]').forEach(el=>{const active=el.getAttribute('data-nav')===name;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});$('#mobileNav').hidden=true;$('#menuToggle').setAttribute('aria-expanded','false');window.scrollTo(0,0);}
  function route(){
    const segments=(window.location.hash.replace(/^#\/?/,'')||'home').split('/').filter(Boolean);const page=segments[0]||'home';
    if(page==='mission' && segments[1]) {const item=data.find(m=>m.id===segments[1]);if(item){openMission(item);return;} }
    closeModal(true);
    let safePage=['home','atlas','archive','lab','passport','sources'].includes(page)?page:'home';
    if(safePage==='atlas' && ['mars','moon'].includes(segments[1]))atlasWorld=segments[1];
    previousRoute=window.location.hash||'#/home';setPage(safePage);
    if(safePage==='atlas')renderAtlas();if(safePage==='archive')renderArchive();if(safePage==='passport')updatePassport();if(safePage==='sources')renderSources();
  }

  function renderAtlas(){
    const arr=data.filter(m=>m.world===atlasWorld);
    $('#atlasWorldName').textContent=atlasWorld.toUpperCase();$('#atlasWorldLabel').textContent=atlasWorld==='mars'?'MARS ARCHIVE':'LUNAR ARCHIVE';$('#atlasWorldCount').textContent=pad(arr.length)+' OBJECTS';
    const img=$('#atlasPlanet');img.src='assets/images/planet-'+atlasWorld+'.svg';img.alt='Illustrated planet '+(atlasWorld==='mars'?'Mars':'the Moon');
    $$('.world-toggle').forEach(el=>{const active=el.dataset.world===atlasWorld;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
    $('#atlasList').innerHTML=arr.map((m,i)=>`<button class="atlas-item" type="button" data-open="${m.id}"><span class="atlas-num">${pad(i+1)}</span><span class="atlas-item-body"><strong>${escapeHTML(m.name)}</strong><small>${m.year} · ${escapeHTML(m.kind)} · ${escapeHTML(m.site)}</small></span><span class="atlas-item-arrow">↗</span></button>`).join('');
    // Artistic coordinates, NOT geographic coordinates; legend is visible beside map.
    const positions=atlasWorld==='mars' ? [[45,28],[62,33],[39,48],[57,56],[27,37],[68,50],[32,63],[50,71],[73,64]]:[[50,29],[32,44],[65,39],[43,59],[67,61],[31,70],[53,75]];
    $('#atlasMarkers').innerHTML=arr.map((m,i)=>`<button class="atlas-marker" type="button" data-open="${m.id}" style="left:${positions[i][0]}%;top:${positions[i][1]}%" aria-label="Open ${escapeHTML(m.name)} mission story" title="${escapeHTML(m.name)}"></button>`).join('');
  }
  function renderArchive(){
    let items=data.filter(m=>(archiveFilter==='all'||m.world===archiveFilter));
    if(archiveSearch){const term=archiveSearch.toLowerCase();items=items.filter(m=>[m.name,m.site,m.kind,m.summary,m.discovery].join(' ').toLowerCase().includes(term));}
    if(archiveSort==='oldest')items.sort((a,b)=>a.year-b.year);
    else if(archiveSort==='newest')items.sort((a,b)=>b.year-a.year);
    else if(archiveSort==='name')items.sort((a,b)=>a.name.localeCompare(b.name));
    $$('.filter-tab').forEach(el=>{const yes=el.dataset.filter===archiveFilter;el.classList.toggle('active',yes);el.setAttribute('aria-pressed',String(yes));});
    $('#resultsText').textContent=`Showing ${items.length} of ${data.length} archived artifacts`;
    $('#missionGrid').innerHTML=items.map((m)=>`
       <article class="mission-card"><button class="card-image-button" type="button" data-open="${m.id}" aria-label="Open ${escapeHTML(m.name)} story"><img src="${m.illustration}" alt="Original stylized illustration of ${escapeHTML(m.name)}" loading="lazy"/><span class="card-world">${m.world.toUpperCase()}</span><span class="card-top-right">${m.year}</span></button>
       <div class="mission-card-body"><div class="card-topline"><span>${escapeHTML(m.kind.toUpperCase())}</span><span>${progress.solved.includes(m.id)?'✳ CASE SOLVED':progress.read.includes(m.id)?'✓ READ':'ARCHIVED'}</span></div><h3>${escapeHTML(m.name)}</h3><p>${escapeHTML(m.tagline)}.</p><div class="card-location"><span>⌖</span>${escapeHTML(m.site)}</div></div>
       <button type="button" class="card-btn" data-open="${m.id}"><span>OPEN THE STORY ${progress.read.includes(m.id)?'<span class="card-complete">✓ EXPLORED</span>':''}</span><span>↗</span></button></article>`).join('');
    $('#emptySearch').hidden=items.length!==0;
  }
  function renderTimeline(){const entries=[...data].sort((a,b)=>a.year-b.year || a.name.localeCompare(b.name));$('#timelineList').innerHTML=entries.map(m=>`<button type="button" class="timeline-event" data-open="${m.id}" aria-label="Explore ${escapeHTML(m.name)}"><span class="timeline-year">${m.year}</span><span class="timeline-dot"></span><span class="timeline-event-body"><strong>${escapeHTML(m.name)}</strong><small>${m.world.toUpperCase()} · ${escapeHTML(m.kind)} · ${escapeHTML(m.site)}</small></span><span class="timeline-event-arrow">↗</span></button>`).join('');}
  function renderSources(){
    $('#sourceList').innerHTML=data.map(m=>`<a class="source-item" href="${m.source}" target="_blank" rel="noopener noreferrer"><div><span>${m.world.toUpperCase()} / ${m.year}</span><strong>${escapeHTML(m.name)}</strong><small>${escapeHTML(m.sourceLabel)}</small></div><i aria-hidden="true">↗</i></a>`).join('');
  }

  function stopNarration(){if('speechSynthesis' in window) window.speechSynthesis.cancel();voice=null;$('#narrateIcon').textContent='▶';$('#narrateLabel').textContent='Read aloud';$('#narrateBtn').setAttribute('aria-pressed','false');}
  function narrate(){
    if(!('speechSynthesis' in window)){toast('Speech synthesis is unavailable in this browser.');return;}
    if(voice){stopNarration();return;}
    const ch=activeMission?.chapters[chapterIndex];if(!ch)return;
    const utterance=new SpeechSynthesisUtterance(`${ch.title}. ${ch.text}`);
    utterance.lang='en-US';utterance.rate=.86;utterance.pitch=1;voice=utterance;
    utterance.onend=()=>stopNarration();utterance.onerror=()=>stopNarration();
    $('#narrateIcon').textContent='■';$('#narrateLabel').textContent='Stop narration';$('#narrateBtn').setAttribute('aria-pressed','true');window.speechSynthesis.speak(utterance);
  }
  function openMission(m){
    if(!$('#missionModal').hidden && activeMission?.id===m.id)return;
    stopNarration();activeMission=m;chapterIndex=0;showingQuiz=false;quizSolvedNow=false;
    $('#storyNumber').textContent=pad(data.findIndex(x=>x.id===m.id)+1);$('#storyTitle').textContent=m.name;$('#storySite').textContent=m.site;
    $('#storyWorld').textContent=m.world.toUpperCase();$('#storyWorld').className='tag '+(m.world==='mars'?'tag-orange':'tag-blue');
    $('#storyImage').src=m.illustration;$('#storyImage').alt=`Original stylized illustration of ${m.name}`;
    $('#storyType').textContent=m.kind.toUpperCase()+' / '+m.year;$('#storySource').href=m.source;$('#storySource').textContent='Open official '+m.sourceLabel+' ↗';
    $('#storyFacts').innerHTML=m.stats.map(s=>`<div class="story-fact"><small>${escapeHTML(s[0])}</small><strong>${escapeHTML(s[1])}</strong></div>`).join('');
    $('#storyDiscovery').textContent=m.discovery;
    $('#quizQuestion').textContent=m.quiz.question;
    $('#missionModal').hidden=false;document.body.classList.add('modal-open');
    renderChapter();$('#modalClose').focus();
  }
  function renderChapter(){
    const chapters=activeMission.chapters;
    $('#storyView').hidden=false;$('#quizView').hidden=true;showingQuiz=false;
    $('#chapterTitle').textContent=chapters[chapterIndex].title;$('#chapterText').textContent=chapters[chapterIndex].text;
    $('#chapterCount').textContent=pad(chapterIndex+1)+' / '+pad(chapters.length);
    $('#chapterDots').innerHTML=chapters.map((_,i)=>`<button class="chapter-dot ${i===chapterIndex?'active':''}" type="button" data-chapter="${i}" aria-label="Read chapter ${i+1}" ${i===chapterIndex?'aria-current="step"':''}></button>`).join('');
    $('#prevChapter').disabled=chapterIndex===0;$('#nextChapter').textContent=chapterIndex===chapters.length-1?'Solve the mystery →':'Next chapter →';
    $('#storyContentScrollTop')?.remove(); // intentionally harmless: no external dependencies
    $('.story-content-side').scrollTop=0;
  }
  function renderQuiz(){
    stopNarration();mark('read',activeMission.id);showingQuiz=true;quizSolvedNow=progress.solved.includes(activeMission.id);
    $('#storyView').hidden=true;$('#quizView').hidden=false;
    $('#quizFeedback').hidden=true;$('#quizFeedback').className='quiz-feedback';
    $('#quizOptions').innerHTML=activeMission.quiz.options.map((x,i)=>`<button type="button" class="quiz-option" data-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${escapeHTML(x)}</button>`).join('');
    $('#finishMission').hidden=!quizSolvedNow;
    if(quizSolvedNow){$('#quizFeedback').hidden=false;$('#quizFeedback').textContent='Already solved! '+activeMission.quiz.explanation;$('#quizOptions').querySelectorAll('button').forEach(b=>b.disabled=true);}
    $('.story-content-side').scrollTop=0;
  }
  function chooseAnswer(index){
    if(!activeMission || quizSolvedNow)return;
    const correct=activeMission.quiz.correct;
    const isCorrect=index===correct;
    $$('#quizOptions .quiz-option').forEach(b=>{b.classList.remove('correct','wrong');if(Number(b.dataset.answer)===index)b.classList.add(isCorrect?'correct':'wrong');if(isCorrect){b.disabled=true;if(Number(b.dataset.answer)===correct)b.classList.add('correct');}});
    $('#quizFeedback').hidden=false;$('#quizFeedback').className='quiz-feedback'+(isCorrect?'':' error');
    $('#quizFeedback').textContent=(isCorrect?'Correct! ':'Not quite. Try another answer. ')+activeMission.quiz.explanation;
    if(isCorrect){quizSolvedNow=true;mark('solved',activeMission.id);$('#finishMission').hidden=false;}
  }
  function closeModal(silent=false){
    if($('#missionModal').hidden)return;
    stopNarration();$('#missionModal').hidden=true;document.body.classList.remove('modal-open');activeMission=null;
    if(!silent)go((previousRoute||'#/archive').replace(/^#\//,''));
  }
  function updatePassport(){
    $('#storiesCount').textContent=progress.read.filter(id=>data.some(m=>m.id===id)).length;
    $('#solvedCount').textContent=progress.solved.filter(id=>data.some(m=>m.id===id)).length;
    const n=progress.read.length;$('#storyBar').style.width=Math.min(100,n/16*100)+'%';
    $('#passportMessage').textContent=n===16?'Every explorer has a story. You heard them all.':n===0?'Your journey begins with one story.':`${16-n} stories are waiting to be discovered.`;
    $('#stampGrid').innerHTML=data.map(m=>{const read=progress.read.includes(m.id),solved=progress.solved.includes(m.id);return `<button class="stamp ${solved?'solved':read?'read':''}" data-open="${m.id}" type="button" aria-label="${escapeHTML(m.name)}, ${solved?'case solved':read?'story read':'not yet read'}"><span class="stamp-seal">${solved?'✳':read?'✓':'✦'}</span><strong>${escapeHTML(m.name)}</strong><small>${solved?'CASE SOLVED':read?'STORY EXPLORED':'DISCOVER THIS STORY'}</small></button>`;}).join('');
  }
  function flightLab(){const n=Number($('#flightRange').value);$('#flightValue').textContent=n+' / 72';$('#flightHuge').textContent=pad(n);$('#heliFlying').style.transform=`translate(${(n%12-6)*6}px,${-n*0.5}px) rotate(${Math.sin(n/6)*10}deg)`;$('#flightMessage').textContent=n<5?`Flight ${n}: Still inside the original five-flight technology demonstration.`:n===5?'Flight 5 met the original five-flight goal. Everything afterward went beyond the planned test flights.':n<72?`Flight ${n}: Ingenuity is already ${n-5} flights beyond the five originally planned. NASA eventually documented 72 flights.`:'Flight 72, on January 18, 2024, was Ingenuity’s last flight. Its extraordinary legacy endures.';}
  function dustLab(){const d=Number($('#dustRange').value);$('#dustValue').textContent=d+'%';$('#lightValue').textContent=(100-d)+'%';$('#sunlightBar').style.width=(100-d)+'%';$('#dustHaze').style.opacity=String(.05+d*.0075);$('#dustSun').style.opacity=String(1-d*.008);}

  function certificate(){
    const name=$('#explorerName').value.trim();if(!name){$('#explorerName').focus();toast('Please enter your name for the certificate.');return;}
    const canvas=document.createElement('canvas');canvas.width=1800;canvas.height=1100;const ctx=canvas.getContext('2d');
    const grd=ctx.createLinearGradient(0,0,1800,1100);grd.addColorStop(0,'#071223');grd.addColorStop(.6,'#17243a');grd.addColorStop(1,'#30283a');ctx.fillStyle=grd;ctx.fillRect(0,0,1800,1100);
    let seed=12;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};for(let i=0;i<180;i++){const x=rand()*1800,y=rand()*1100;ctx.fillStyle=`rgba(255,248,226,${rand()*.55})`;ctx.beginPath();ctx.arc(x,y,.5+rand()*2,0,Math.PI*2);ctx.fill();}
    ctx.strokeStyle='#c89b76';ctx.lineWidth=6;ctx.strokeRect(70,70,1660,960);ctx.lineWidth=1;ctx.strokeRect(88,88,1624,924);
    ctx.textAlign='center';ctx.fillStyle='#e5bc92';ctx.font='bold 33px Arial';ctx.fillText('✦    E C H O E S    ✦',900,230);
    ctx.fillStyle='#a9bbca';ctx.font='22px Arial';ctx.fillText('OFFICIAL SPACE HISTORIAN KEEPSAKE — EDUCATIONAL PROJECT',900,290);
    ctx.fillStyle='#f3efea';ctx.font='66px Georgia';ctx.fillText('Certificate of Cosmic Exploration',900,425);
    ctx.fillStyle='#9fadc0';ctx.font='27px Arial';ctx.fillText('Presented with curiosity and courage to',900,503);
    ctx.fillStyle='#f3bb8e';let fs=84;do{ctx.font=`italic ${fs}px Georgia`;fs-=3;}while(ctx.measureText(name).width>1430 && fs>32);ctx.fillText(name,900,630);
    ctx.fillStyle='#d1dbe6';ctx.font='28px Arial';ctx.fillText(`For exploring ${progress.read.length} of 16 stories and solving ${progress.solved.length} mission science challenges`,900,722);
    ctx.font='24px Arial';ctx.fillStyle='#9bb4c9';ctx.fillText('Every silent machine has a discovery worth remembering.',900,778);
    ctx.fillStyle='#deb28c';ctx.font='bold 25px Arial';ctx.fillText('THE MOON  ✦  MARS  ✦  SCIENCE',900,900);
    ctx.fillStyle='#798da4';ctx.font='18px Arial';ctx.fillText('Independent educational keepsake · Not a NASA-issued certificate',900,972);
    const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download='ECHOES-Space-Historian-Certificate.png';document.body.appendChild(a);a.click();a.remove();toast('Certificate created — saved as a PNG image.');
  }

  // All interactive elements are event-delegated so cards and missions can be filtered safely.
  document.addEventListener('click',event=>{
    const open=event.target.closest('[data-open]');if(open){const m=data.find(x=>x.id===open.dataset.open);if(m)go('mission/'+m.id);return;}
    const wc=event.target.closest('.world-toggle');if(wc){atlasWorld=wc.dataset.world;go('atlas/'+atlasWorld);renderAtlas();return;}
    const ft=event.target.closest('.filter-tab');if(ft){archiveFilter=ft.dataset.filter;renderArchive();return;}
    const cb=event.target.closest('[data-chapter]');if(cb&&activeMission){stopNarration();chapterIndex=Number(cb.dataset.chapter);renderChapter();return;}
    const ans=event.target.closest('[data-answer]');if(ans&&activeMission){chooseAnswer(Number(ans.dataset.answer));return;}
    if(event.target.closest('#menuToggle')){const nav=$('#mobileNav');nav.hidden=!nav.hidden;$('#menuToggle').setAttribute('aria-expanded',String(!nav.hidden));return;}
    if(event.target.closest('#modalClose')){closeModal();return;}
    if(event.target===$('#missionModal')){closeModal();return;}
    if(event.target.closest('#nextChapter')&&activeMission){stopNarration();if(chapterIndex<activeMission.chapters.length-1){chapterIndex++;renderChapter();}else renderQuiz();return;}
    if(event.target.closest('#prevChapter')&&activeMission){if(chapterIndex>0){stopNarration();chapterIndex--;renderChapter();}return;}
    if(event.target.closest('#returnStory')&&activeMission){chapterIndex=activeMission.chapters.length-1;renderChapter();return;}
    if(event.target.closest('#finishMission')&&activeMission){const m=activeMission;closeModal();toast(`Mission complete: ${m.name}. Your passport has been updated.`);return;}
    if(event.target.closest('#narrateBtn')){narrate();return;}
    if(event.target.closest('#downloadCertificate')){certificate();return;}
    if(event.target.closest('#resetFilters')){archiveFilter='all';archiveSearch='';$('#archiveSearch').value='';renderArchive();return;}
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#missionModal').hidden)closeModal();});
  $('#archiveSearch').addEventListener('input',e=>{archiveSearch=e.target.value.trim();renderArchive();});
  $('#archiveSort').addEventListener('change',e=>{archiveSort=e.target.value;renderArchive();});
  $('#flightRange').addEventListener('input',flightLab);
  $('#dustRange').addEventListener('input',dustLab);
  window.addEventListener('hashchange',route);
  window.addEventListener('beforeunload',stopNarration);
  renderAtlas();renderArchive();renderTimeline();renderSources();updatePassport();flightLab();dustLab();
  if(!window.location.hash)window.location.hash='#/home';route();
})();
