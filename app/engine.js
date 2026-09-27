(() => {
  const packs = {};
  const products = [
    {product:'Coffee', category:'Drinks', price:4, sales:120},
    {product:'Tea', category:'Drinks', price:3, sales:90},
    {product:'Cake', category:'Food', price:6, sales:70},
    {product:'Sandwich', category:'Food', price:8, sales:110},
    {product:'Juice', category:'Drinks', price:5, sales:60},
    {product:'Cookie', category:'Food', price:2, sales:150}
  ];
  const categoryTargets = [
    {category:'Drinks', goal:95},
    {category:'Food', goal:110}
  ];
  const creatorsData = [
    {creator_id:1, creator_name:'Emma Live', creator_handle:'emma123', quality:'High', posting_rate:'Daily'},
    {creator_id:2, creator_name:'Noah Studio', creator_handle:'noah7', quality:'Medium', posting_rate:'Weekly'},
    {creator_id:3, creator_name:'Liam Clips', creator_handle:'liam42', quality:'High', posting_rate:'Daily'}
  ];
  const videosData = [
    {video_id:'v1', creator_id:1, publish_time:'08:00', quality:'High', posting_rate:'Daily'},
    {video_id:'v2', creator_id:1, publish_time:'12:00', quality:'High', posting_rate:'Daily'},
    {video_id:'v3', creator_id:2, publish_time:'09:30', quality:'Medium', posting_rate:'Weekly'},
    {video_id:'v4', creator_id:2, publish_time:'21:00', quality:'Medium', posting_rate:'Weekly'},
    {video_id:'v5', creator_id:3, publish_time:'10:00', quality:'High', posting_rate:'Daily'},
    {video_id:'v6', creator_id:3, publish_time:'18:00', quality:'High', posting_rate:'Daily'}
  ];
  const videoViewData = [
    {video_id:'v1', creator_id:1, impressions_n:100, watched_n:50, watch_rate:0.50, avg_watch_share:0.55, total_watch_seconds:600},
    {video_id:'v2', creator_id:1, impressions_n:80, watched_n:34, watch_rate:0.425, avg_watch_share:0.45, total_watch_seconds:430},
    {video_id:'v3', creator_id:2, impressions_n:70, watched_n:20, watch_rate:0.286, avg_watch_share:0.33, total_watch_seconds:260},
    {video_id:'v4', creator_id:2, impressions_n:90, watched_n:40, watch_rate:0.444, avg_watch_share:0.40, total_watch_seconds:510},
    {video_id:'v5', creator_id:3, impressions_n:60, watched_n:18, watch_rate:0.30, avg_watch_share:0.31, total_watch_seconds:220},
    {video_id:'v6', creator_id:3, impressions_n:110, watched_n:66, watch_rate:0.60, avg_watch_share:0.62, total_watch_seconds:780}
  ];
  const usersData = [
    {user_id:101, user_name:'Ava', user_handle:'ava_m', baseline_login:4, satiation_decay:0.6},
    {user_id:102, user_name:'Mason', user_handle:'mason33', baseline_login:3, satiation_decay:0.5},
    {user_id:103, user_name:'Mia', user_handle:'mia8', baseline_login:5, satiation_decay:0.7}
  ];
  const userViewData = [
    {user_id:101, impressions_n:120, watched_n:48, watch_rate:0.40, like_n:10, follow_n:2},
    {user_id:102, impressions_n:90, watched_n:30, watch_rate:0.333, like_n:7, follow_n:1},
    {user_id:103, impressions_n:130, watched_n:78, watch_rate:0.60, like_n:16, follow_n:4}
  ];
  const impressionsData = [
    {impression_id:'i1', session_id:'s1', user_id:101, video_id:'v1', creator_id:1, shown_at:'2025-08-01T08:00:00Z'},
    {impression_id:'i2', session_id:'s1', user_id:101, video_id:'v2', creator_id:1, shown_at:'2025-08-01T09:00:00Z'},
    {impression_id:'i3', session_id:'s2', user_id:102, video_id:'v3', creator_id:2, shown_at:'2025-08-01T11:00:00Z'},
    {impression_id:'i4', session_id:'s3', user_id:103, video_id:'v4', creator_id:2, shown_at:'2025-08-02T10:30:00Z'},
    {impression_id:'i5', session_id:'s4', user_id:101, video_id:'v5', creator_id:3, shown_at:'2025-08-02T13:00:00Z'},
    {impression_id:'i6', session_id:'s5', user_id:102, video_id:'v6', creator_id:3, shown_at:'2025-08-02T16:00:00Z'},
    {impression_id:'i7', session_id:'s6', user_id:103, video_id:'v1', creator_id:1, shown_at:'2025-08-03T09:15:00Z'},
    {impression_id:'i8', session_id:'s6', user_id:103, video_id:'v6', creator_id:3, shown_at:'2025-08-03T10:10:00Z'}
  ];
  const watchEventsData = [
    {impression_id:'i1', action:'watch', watch_seconds:30},
    {impression_id:'i2', action:'watch', watch_seconds:22},
    {impression_id:'i4', action:'watch', watch_seconds:27},
    {impression_id:'i6', action:'watch', watch_seconds:41},
    {impression_id:'i8', action:'watch', watch_seconds:54}
  ];
  const sessionsData = [
    {session_id:'s1', user_id:101, device:'mobile'},
    {session_id:'s2', user_id:102, device:'desktop'},
    {session_id:'s3', user_id:103, device:'mobile'},
    {session_id:'s4', user_id:101, device:'tablet'},
    {session_id:'s5', user_id:102, device:'mobile'},
    {session_id:'s6', user_id:103, device:'desktop'}
  ];
  const weatherWideData = [
    {date:'2025-08-01', BE_temp:20, DE_temp:24},
    {date:'2025-08-02', BE_temp:19, DE_temp:22}
  ];
  const socialsLongData = [
    {creator_id:1, platform:'TikTok', metric:'followers', value:1200},
    {creator_id:1, platform:'Instagram', metric:'followers', value:900},
    {creator_id:2, platform:'TikTok', metric:'followers', value:800},
    {creator_id:2, platform:'Instagram', metric:'followers', value:750}
  ];
  const dayIndexData = [
    {shown_day:'2025-08-01'},
    {shown_day:'2025-08-02'},
    {shown_day:'2025-08-03'}
  ];

  let state = null;
  let el = null;

  function registerPack(pack) { packs[pack.id] = pack; }
  function currentPack(){ return packs[state.packId]; }
  function currentMission(){ return currentPack().missions[state.mission]; }
  function asFn(v, ...args){ return typeof v === 'function' ? v(...args) : v; }
  function esc(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
  function rank(xp){ if(xp>=800)return'Code Wizard'; if(xp>=550)return'Workflow Ranger'; if(xp>=300)return'Command Crafter'; if(xp>=120)return'Code Apprentice'; return'Code Curious'; }
  function isReadingMission(m){ return m?.mode==='reading'; }
  function isChoiceMission(m){ return m?.mode==='choice'; }
  function readingXp(m){
    const configured = Number(m?.readingXp ?? m?.xp);
    return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : 40;
  }
  function cloneRows(rows){ return rows.map(r=>({ ...r })); }
  function asDateString(v){
    if(v===null||v===undefined||v==='') return null;
    if(v instanceof Date) return v.toISOString().slice(0,10);
    const d=new Date(v);
    return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0,10);
  }

  function freshState(packId){
    const s={packId,mission:0,xp:0,hints:{},unlocked:[],readRewards:{},lastResult:null,complete:false,os:'mac',shellPath:[],shellRepos:false,shellCloned:false,env:{},files:{},markdownDoc:'',sqlAgent:{lastPrompt:'',draft:''},make:{rules:{},order:[],defaultTarget:'',versions:{},lastPlan:[],lastRun:[]},git:{branch:'main',branches:['main'],staged:[],modified:['analysis.R'],commits:[],merged:false,cloned:false,remote:'origin',remoteBehind:true,pushed:false,pushedBranches:{},prs:[],prCounter:0,activePr:null}};
    s.choiceSolved={};
    s.choiceAnswers={};
    s.rWorkingDirectory='/';
    s.rDirectories={};
    s.rCsvFiles={};
    s.sqlTables={};
    s.make.files=[];
    s.make.sourceText='';
    const p=packs[packId]; if(p.setup) p.setup(s, helpers); return s;
  }

  const helpers = {
    products: () => cloneRows(products),
    categoryTargets: () => cloneRows(categoryTargets),
    creators: () => cloneRows(creatorsData),
    videos: () => cloneRows(videosData),
    videoView: () => cloneRows(videoViewData),
    users: () => cloneRows(usersData),
    userView: () => cloneRows(userViewData),
    impressions: () => cloneRows(impressionsData),
    watchEvents: () => cloneRows(watchEventsData),
    sessions: () => cloneRows(sessionsData),
    weatherWide: () => cloneRows(weatherWideData),
    socialsLong: () => cloneRows(socialsLongData),
    dayIndex: () => cloneRows(dayIndexData)
  };

  function start(){
    el=Object.fromEntries(['questName','missionNum','missionTotal','xp','rank','packSelect','packControls','packDescription','missionBadge','difficulty','missionTitle','missionIntro','taskBox','conceptBox','conceptText','readingBox','readingTitle','readingText','hintBtn','solutionBtn','hintArea','workspaceTitle','workspaceSubtitle','consoleOutput','consoleInput','prompt','commandInput','runBtn','resultPanel','feedback','clearBtn','resetMissionBtn','nextBtn','stateTitle','stateSubtitle','statePanel','inventory','victory','victoryText','restartBtn','instructorView'].map(id=>[id,document.getElementById(id)]));
    Object.values(packs).forEach(p=>{ const o=document.createElement('option'); o.value=p.id; o.textContent=p.title; el.packSelect.appendChild(o); });
    const first=Object.keys(packs)[0]; if(!first) throw new Error('No lesson packs registered.');
    state=freshState(first);
    bind();
    const cfg=window.CODE_QUEST_CONFIG||{}; el.instructorView.classList.toggle('hidden', cfg.showInstructorView === false);
    render();
  }

  function bind(){
    el.runBtn.addEventListener('click',run);
    el.taskBox.addEventListener('click',event=>{
      const button=event.target.closest('[data-choice-index]');
      if(button&&el.taskBox.contains(button)) selectChoice(Number(button.dataset.choiceIndex));
    });
    el.commandInput.addEventListener('keydown',e=>{
      if(e.key!=='Enter') return;
      if(currentPack().type==='markdown'){
        if(e.metaKey||e.ctrlKey){e.preventDefault();run();}
        return;
      }
      if(!e.shiftKey){e.preventDefault();run();}
    });
    el.hintBtn.addEventListener('click',showHint); el.solutionBtn.addEventListener('click',showSolution); el.nextBtn.addEventListener('click',nextMission);
    el.resetMissionBtn.addEventListener('click',resetMission); el.clearBtn.addEventListener('click',()=>el.consoleOutput.textContent='');
    el.packSelect.addEventListener('change',switchPack); el.restartBtn.addEventListener('click',restartPack);
  }

  function render(){
    const p=currentPack(),m=currentMission();
    const reading=isReadingMission(m);
    const choice=isChoiceMission(m);
    el.packSelect.value=p.id; el.questName.textContent=p.title.replace(' Quest',''); el.missionNum.textContent=state.mission+1; el.missionTotal.textContent=p.missions.length; el.xp.textContent=state.xp; el.rank.textContent=rank(state.xp);
    el.packDescription.textContent=p.description||''; el.missionBadge.textContent=`MISSION ${state.mission+1}`; el.difficulty.textContent=m.difficulty||''; el.missionTitle.textContent=m.title; el.missionIntro.textContent=m.intro||'';
    if(reading){
      el.taskBox.classList.add('hidden');
      el.conceptBox.classList.add('hidden');
      el.readingBox.classList.remove('hidden');
      el.readingTitle.textContent=asFn(m.readingTitle,state,helpers)||'Reading pane';
      el.readingText.innerHTML=asFn(m.readingBody,state,helpers)||'';
    } else if(choice){
      el.taskBox.classList.remove('hidden');
      const question=esc(asFn(m.question,state,helpers)||'Choose the best option.');
      const selected=state.choiceAnswers[state.mission];
      const solved=!!state.choiceSolved[state.mission];
      const scenario=m.scenario?`<pre class="choice-scenario">${esc(asFn(m.scenario,state,helpers))}</pre>`:'';
      const options=(m.choices||[]).map((option,index)=>{
        const selectedClass=selected===index?' is-selected':'';
        const correctClass=solved&&option.correct?' is-correct':'';
        const incorrectClass=selected===index&&!option.correct?' is-incorrect':'';
        return `<button type="button" class="choice-option${selectedClass}${correctClass}${incorrectClass}" data-choice-index="${index}" aria-pressed="${selected===index}"${solved?' disabled':''}><span class="choice-indicator" aria-hidden="true"></span><span>${esc(option.text)}</span></button>`;
      }).join('');
      el.taskBox.innerHTML=`<strong>Choose the best next step</strong>${scenario}<p>${question}</p><div class="choice-list">${options}</div>`;
      el.readingBox.classList.add('hidden');
      if(m.concept){el.conceptBox.classList.remove('hidden');el.conceptText.textContent=asFn(m.concept,state,helpers);} else el.conceptBox.classList.add('hidden');
    } else {
      el.taskBox.classList.remove('hidden');
      el.taskBox.innerHTML=`<strong>Your task:</strong> ${asFn(m.task,state,helpers)}`;
      el.readingBox.classList.add('hidden');
      if(m.concept){el.conceptBox.classList.remove('hidden');el.conceptText.textContent=asFn(m.concept,state,helpers);} else el.conceptBox.classList.add('hidden');
    }
    el.hintArea.textContent=''; el.feedback.textContent=''; el.resultPanel.classList.add('hidden'); el.victory.classList.add('hidden');
    el.hintBtn.classList.toggle('hidden', reading||choice); el.solutionBtn.classList.toggle('hidden', reading||choice); el.hintArea.classList.toggle('hidden', reading||choice);
    el.consoleInput.classList.toggle('hidden', reading||choice);
    el.nextBtn.disabled=choice?!state.choiceSolved[state.mission]:!reading; el.commandInput.disabled=reading||choice; el.runBtn.disabled=reading||choice;
    if(reading){el.feedback.innerHTML=`<span class="small muted">Read this pane, then continue. You will earn +${readingXp(m)} XP when you click Next mission.</span>`;}
    if(choice&&!state.choiceSolved[state.mission]) el.feedback.textContent='Click an option to choose. You can try another option if needed.';
    if(choice&&state.choiceSolved[state.mission]){
      const answer=currentMission().choices[state.choiceAnswers[state.mission]];
      el.feedback.innerHTML=`<div class="choice-feedback correct"><strong>Good choice.</strong> ${esc(answer?.feedback||'You solved this question.')} Continue when ready.</div>`;
    }
    setupPackControls(); configureWorkspace(); renderState(); renderInventory();
    if(!el.consoleOutput.textContent) el.consoleOutput.textContent=welcomeText();
  }

  function setupPackControls(){
    if(currentPack().type==='shell'){
      el.packControls.innerHTML='<label><span class="small"><strong>Operating system</strong></span><select id="osSelect"><option value="mac">macOS</option><option value="win">Windows</option></select></label>';
      const os=document.getElementById('osSelect'); os.value=state.os; os.addEventListener('change',()=>{state.os=os.value;configureWorkspace();renderState();});
    } else el.packControls.innerHTML='<div class="small muted" style="padding-top:24px">This pack uses its own simulated workspace.</div>';
  }

  function configureWorkspace(){
    const t=currentPack().type;
    el.commandInput.rows=2;
    el.commandInput.placeholder='Type a command…';
    if(t==='r'){el.workspaceTitle.textContent='R Console';el.workspaceSubtitle.textContent='RStudio-style mock';el.prompt.textContent='>';el.stateTitle.textContent='Environment';el.stateSubtitle.textContent='Global Environment';}
    if(t==='shell'){el.workspaceTitle.textContent=state.os==='mac'?'Terminal':'Command Prompt';el.workspaceSubtitle.textContent='filesystem simulation';el.prompt.textContent=shellPrompt();el.stateTitle.textContent='Folder tree';el.stateSubtitle.textContent=shellPathText();}
    if(t==='git'){el.workspaceTitle.textContent='Git Terminal';el.workspaceSubtitle.textContent=`branch: ${state.git.branch}`;el.prompt.textContent='$';el.stateTitle.textContent='Repository';el.stateSubtitle.textContent=state.git.branch;}
    if(t==='sql'){el.workspaceTitle.textContent='SQL Console';el.workspaceSubtitle.textContent='mock teaching database';el.prompt.textContent='SQL>';el.stateTitle.textContent='Database';el.stateSubtitle.textContent=Object.keys(state.sqlTables||{}).join(', ')||'products';}
    if(t==='make'){el.workspaceTitle.textContent='Make Terminal';el.workspaceSubtitle.textContent='make workflow simulation';el.prompt.textContent='$';el.stateTitle.textContent='Build graph';el.stateSubtitle.textContent='targets and prerequisites';el.commandInput.rows=8;el.commandInput.placeholder='Enter Makefile rules or run make -n…';}
    if(t==='markdown'){
      const workspace=currentPack().workspace||{};
      el.workspaceTitle.textContent=workspace.title||'Markdown Editor';
      el.workspaceSubtitle.textContent=workspace.subtitle||'README.md mock workspace';
      el.prompt.textContent=workspace.prompt||'MD>';
      el.stateTitle.textContent=workspace.stateTitle||'Document';
      el.stateSubtitle.textContent=workspace.stateSubtitle||'README.md';
      el.commandInput.placeholder=workspace.placeholder||'Write Markdown content here...';
      el.commandInput.rows=10;
      el.commandInput.value=state.markdownDoc;
    }
  }

  function welcomeText(){ const t=currentPack().type; if(t==='r')return'R version 4.x.x (mock)\nReady.'; if(t==='shell')return`Welcome.\nCurrent directory: ${shellPathText()}`; if(t==='git')return'Initialized teaching repository.\nOn branch main'; if(t==='markdown')return currentPack().welcomeText||'README.md opened in the editor.\nPress Enter for new lines; click Run (or Cmd/Ctrl+Enter) to check and preview.'; if(t==='make')return'Make workspace ready.\nSubmit makefile text or run make commands.'; const tables=Object.keys(state.sqlTables||{});return`Connected to a mock teaching database.\nTables available: ${tables.length?tables.join(', '):'products, category_targets'}`; }
  function shellPathText(){ if(state.os==='mac')return state.shellPath.length?'~/'+state.shellPath.join('/'):'~'; return state.shellPath.length?'C:\\Users\\student\\'+state.shellPath.join('\\'):'C:\\Users\\student'; }
  function shellPrompt(){ return state.os==='mac'?`student@laptop ${shellPathText()} %`:`${shellPathText()}>`; }

  function run(){
    if(isReadingMission(currentMission())||isChoiceMission(currentMission())) return;
    const t=currentPack().type;
    const raw=el.commandInput.value;
    const code=t==='markdown'?raw:raw.trim();
    if(!code.trim())return; let result;
    try{ result=execute(code); state.lastResult=result; appendConsole(code,result); }
    catch(e){ appendConsole(code,{error:e.message}); el.feedback.textContent='That produced an error. Read it carefully and try again.'; el.commandInput.value=''; renderState(); return; }
    if(t!=='markdown')el.commandInput.value='';
    showResult(result); renderState();
    let solved=false; try{solved=!!currentMission().check(state,result,code,helpers);}catch(e){}
    if(solved) completeMission('Mission solved!');
    else el.feedback.textContent='The command ran, but the mission is not solved yet.';
  }

  function completeMission(message){
    const reward=state.hints[state.mission]?Math.max(40,currentMission().xp-20):currentMission().xp;
    state.xp+=reward;
    (asFn(currentMission().unlock,state,helpers)||[]).forEach(x=>{if(!state.unlocked.includes(x))state.unlocked.push(x)});
    el.feedback.innerHTML=isChoiceMission(currentMission())
      ?`<div class="choice-feedback correct"><strong>Good choice.</strong> ${esc(message)} <span>+${reward} XP</span></div>`
      :`<span class="ok">✓ ${esc(message)} +${reward} XP</span>`;
    el.nextBtn.disabled=false;
    el.commandInput.disabled=true;
    el.runBtn.disabled=true;
    el.xp.textContent=state.xp;
    el.rank.textContent=rank(state.xp);
    renderInventory();
  }

  function selectChoice(index){
    const mission=currentMission();
    const option=mission.choices?.[index];
    if(!option||state.choiceSolved[state.mission]) return;
    state.choiceAnswers[state.mission]=index;
    const buttons=el.taskBox.querySelectorAll('[data-choice-index]');
    buttons.forEach((button,buttonIndex)=>{
      button.classList.remove('is-selected','is-correct','is-incorrect');
      button.setAttribute('aria-pressed',String(buttonIndex===index));
      if(buttonIndex===index) button.classList.add('is-selected',option.correct?'is-correct':'is-incorrect');
    });
    if(option.correct){
      state.choiceSolved[state.mission]=true;
      buttons.forEach(button=>{button.disabled=true;});
      buttons[index].classList.remove('is-selected');
      completeMission(option.feedback||'Good choice.');
      return;
    }
    el.feedback.innerHTML=`<div class="choice-feedback try-again"><strong>Consider this:</strong> ${esc(option.feedback||'This option misses an important part of the situation.')} You can try another option.</div>`;
  }

  function execute(code){ const t=currentPack().type; if(t==='shell')return execShell(code); if(t==='r')return execR(code); if(t==='git')return execGit(code); if(t==='markdown')return execMarkdown(code); if(t==='make')return execMake(code); return execSQL(code); }
  function appendConsole(code,r){
    const t=currentPack().type;
    const rendered=t==='markdown'?'[document checked]':code;
    el.consoleOutput.textContent+=(el.consoleOutput.textContent?'\n':'')+`${el.prompt.textContent} ${rendered}`+(r.error?`\nError: ${r.error}`:r.output?`\n${r.output}`:'');
  }

  function execShell(code){
    const c=code.trim(), lower=c.toLowerCase(), listCmd=state.os==='mac'?'ls':'dir';
    if(lower===listCmd)return{action:'list',output:shellListing()};
    if((state.os==='mac'&&lower==='dir')||(state.os==='win'&&lower==='ls'))throw new Error(`command not found: ${c}`);
    let m=c.match(/^cd\s+(.+)$/i); if(m){ const dest=m[1].trim(); if(dest==='..'){state.shellPath.pop();return{action:'cd',output:''};} const valid={'':['terminal-quest'],'terminal-quest':['data','notes'].concat(state.shellRepos?['repos']:[]),'terminal-quest/data':[],'terminal-quest/repos':state.shellCloned?['Hello-World']:[]}[state.shellPath.join('/')]||[]; if(!valid.includes(dest))throw new Error(`directory not found: ${dest}`); state.shellPath.push(dest); return{action:'cd',output:''}; }
    m=c.match(/^mkdir\s+(\S+)$/i); if(m){ if(state.shellPath.join('/')==='terminal-quest'&&m[1]==='repos'){state.shellRepos=true;return{action:'mkdir',output:''};} throw new Error('cannot create that directory in this mission'); }
    if(/^git\s+clone\s+https:\/\/github\.com\/octocat\/Hello-World(?:\.git)?\/?$/i.test(c)){ if(state.shellPath.join('/')!=='terminal-quest/repos')throw new Error('clone from the repos directory'); state.shellCloned=true; return{action:'clone',output:"Cloning into 'Hello-World'…\nReceiving objects: 100%\n✓ Clone complete!"}; }
    throw new Error(`command not recognized: ${c}`);
  }
  function shellListing(){ const p=state.shellPath.join('/'); if(!p)return'Desktop    Documents    Downloads    terminal-quest'; if(p==='terminal-quest')return`data    notes    README.txt${state.shellRepos?'    repos':''}`; if(p==='terminal-quest/data')return'survey.csv    products.csv'; if(p==='terminal-quest/repos')return state.shellCloned?'Hello-World':'(empty folder)'; return''; }

  function resolveRPath(path){
    const parts=String(path).startsWith('/')?[]:state.rWorkingDirectory.split('/').filter(Boolean);
    String(path).split('/').forEach(part=>{
      if(!part||part==='.') return;
      if(part==='..') parts.pop();
      else parts.push(part);
    });
    return '/'+parts.join('/');
  }

  function execR(code){
    const c=code.trim();
    const ggplotResult=execGGPlotExpression(c);
    if(ggplotResult) return ggplotResult;
    let m=c.match(/^([A-Za-z.][\w.]*)\s*(?:<-|=)\s*(.+)$/);
    if(m){
      const rhs=m[2].trim();
      const rhsPlot=execGGPlotExpression(rhs);
      const value=rhsPlot||rEval(rhs);
      state.env[m[1]]=value;
      return rhsPlot?{action:'assign',value,output:''}:{action:'assign',value,output:''};
    }
    const value=rEval(c);
    if(value&&value.__action)return value;
    return{action:'eval',value,output:rFormat(value)};
  }

  function execGGPlotExpression(expr){
    const text=String(expr).replace(/\s+/g,' ').trim();
    if(!/^ggplot\(/i.test(text)) return null;
    const scatter=text.match(/^ggplot\(\s*([A-Za-z.][\w.]*)\s*,\s*aes\(\s*([A-Za-z.][\w.]*)\s*,\s*([A-Za-z.][\w.]*)\s*\)\s*\)\s*\+\s*geom_point\(/i);
    const hist=text.match(/^ggplot\(\s*([A-Za-z.][\w.]*)\s*,\s*aes\(\s*([A-Za-z.][\w.]*)\s*\)\s*\)\s*\+\s*geom_histogram\(/i);
    const hasLabels=/\blabs\s*\(/i.test(text);
    const hasTheme=/\btheme_[a-z0-9_]+\s*\(/i.test(text);
    if(scatter){
      const df=state.env[scatter[1]];
      if(!df || (df.type!=='data.frame'&&df.type!=='grouped.data.frame')) throw new Error(`object '${scatter[1]}' not found`);
      const x=df.rows.map(r=>r[scatter[2]]);
      const y=df.rows.map(r=>r[scatter[3]]);
      if(!x.length||!y.length) throw new Error('ggplot mapping produced no rows');
      return {__action:true,action:'ggplot',kind:'scatter',x,y,xLabel:scatter[2],yLabel:scatter[3],meta:{labels:hasLabels,theme:hasTheme},output:'ggplot scatter created.'};
    }
    if(hist){
      const df=state.env[hist[1]];
      if(!df || (df.type!=='data.frame'&&df.type!=='grouped.data.frame')) throw new Error(`object '${hist[1]}' not found`);
      const x=df.rows.map(r=>r[hist[2]]);
      if(!x.length) throw new Error('ggplot mapping produced no rows');
      return {__action:true,action:'ggplot',kind:'hist',x,meta:{labels:hasLabels,theme:hasTheme},output:'ggplot histogram created.'};
    }
    throw new Error('Only ggplot(..., aes(x, y)) + geom_point(...) and ggplot(..., aes(x)) + geom_histogram(...) are supported in this quest.');
  }
  function rEval(s){
    s=s.trim();
    if(s.includes('%>%')){
      const parts=s.split(/\s*%>%\s*/).map(x=>x.trim()).filter(Boolean);
      if(parts.length){
        let value=rEval(parts[0]);
        for(let i=1;i<parts.length;i++) value=rPipeStep(value,parts[i]);
        return value;
      }
    }
    if(/^[-+]?\d+(\.\d+)?$/.test(s))return Number(s);
    if(/^['"].*['"]$/.test(s))return s.slice(1,-1).replace(/\\([\\"'])/g,'$1');
    if(s==='TRUE')return true;
    if(s==='FALSE')return false;
    if(s==='NULL')return null;
    let unary=s.match(/^([+-])\s*([A-Za-z.][\w.]*)$/);
    if(unary){
      const v=rEval(unary[2]);
      if(unary[1]==='+') return v;
      if(Array.isArray(v)) return v.map(x=>-Number(x));
      return -Number(v);
    }
    let m=s.match(/^(\w+)\$(\w+)$/);
    if(m){
      const df=state.env[m[1]];
      if(!df||(df.type!=='data.frame'&&df.type!=='grouped.data.frame'))throw new Error(`object '${m[1]}' not found`);
      return df.rows.map(r=>r[m[2]]);
    }
    m=s.match(/^(\w+)\[(\d+)\]$/);
    if(m){const v=state.env[m[1]];if(!Array.isArray(v))throw new Error('object is not subsettable');return v[Number(m[2])-1];}
    m=s.match(/^([A-Za-z.][\w.]*)\((.*)\)$/);
    if(m) return rCall(m[1], splitArgs(m[2]));
    m=s.match(/^(.+?)\s*([+\-*\/])\s*(.+)$/);
    if(m){const a=rEval(m[1]),b=rEval(m[3]);if(m[2]==='+')return a+b;if(m[2]==='-')return a-b;if(m[2]==='*')return a*b;return a/b;}
    if(Object.prototype.hasOwnProperty.call(state.env,s))return state.env[s];
    throw new Error(`object '${s}' not found`);
  }

  function rPipeStep(value, step){
    const m=step.match(/^([A-Za-z.][\w.]*)\((.*)\)$/);
    if(!m) throw new Error(`unsupported pipe step: ${step}`);
    return rCall(m[1], splitArgs(m[2]), value);
  }

  function splitArgs(s){
    const input=String(s).trim();
    if(!input) return [];
    const args=[];
    let buf='', depth=0, quote='';
    for(let i=0;i<input.length;i++){
      const ch=input[i];
      if(quote){
        buf+=ch;
        if(ch===quote && input[i-1]!=='\\') quote='';
        continue;
      }
      if(ch==='"' || ch==="'"){quote=ch;buf+=ch;continue;}
      if(ch==='('){depth++;buf+=ch;continue;}
      if(ch===')'){depth=Math.max(0,depth-1);buf+=ch;continue;}
      if(ch===',' && depth===0){args.push(buf.trim());buf='';continue;}
      buf+=ch;
    }
    if(buf.trim()) args.push(buf.trim());
    return args;
  }

  function colName(token){ return token.replace(/^['"]|['"]$/g,'').trim(); }
  function ensureDf(v){ if(!v || (v.type!=='data.frame'&&v.type!=='grouped.data.frame')) throw new Error('argument is not a data frame'); return v; }
  function asDf(rows){ return {type:'data.frame',rows}; }

  function rCall(name, args, piped){
    const fn=name.toLowerCase();
    const firstArg=()=>piped!==undefined?piped:rEval(args[0]||'');
    if(fn==='c') return args.map(x=>rEval(x));
    if(fn==='getwd') return state.rWorkingDirectory;
    if(fn==='setwd'){
      const old=state.rWorkingDirectory;
      const requested=rEval(args[0]||'');
      const destination=resolveRPath(requested);
      if(!state.rDirectories[destination]) throw new Error(`cannot change working directory to '${requested}'`);
      state.rWorkingDirectory=destination;
      return {__action:true,action:'setwd',value:old,output:`Working directory: ${destination}`};
    }
    if(fn==='list.files'){
      const target=args.length?resolveRPath(rEval(args[0])):state.rWorkingDirectory;
      const files=state.rDirectories[target];
      if(!files) throw new Error(`directory not found: ${target}`);
      return {__action:true,action:'list.files',files:files.slice(),output:files.join('    ')};
    }
    if(fn==='read_csv'){
      const file=rEval(args[0]||'');
      const rows=state.rCsvFiles[resolveRPath(file)];
      if(!rows) throw new Error(`cannot open file '${file}' in ${state.rWorkingDirectory}`);
      return asDf(cloneRows(rows));
    }
    if(fn==='head'){ const df=ensureDf(firstArg()); return {__action:true,action:'head',rows:df.rows.slice(0,6),table:df.rows.slice(0,6),output:''}; }
    if(fn==='glimpse'){
      const df=ensureDf(firstArg());
      const columns=Object.keys(df.rows[0]||{});
      const details=columns.map(col=>`$ ${col} <${typeof (df.rows[0]||{})[col]}>`).join('\n');
      return {__action:true,action:'glimpse',output:`Rows: ${df.rows.length}\nColumns: ${columns.length}\n${details}`};
    }
    if(fn==='nrow'){ const df=ensureDf(firstArg()); return df.rows.length; }
    if(fn==='mean'){ const v=piped!==undefined?piped:rEval(args[0]||''); if(!Array.isArray(v)) throw new Error('argument is not numeric'); return v.reduce((a,b)=>a+b,0)/v.length; }
    if(fn==='length'){ const v=piped!==undefined?piped:rEval(args[0]||''); return Array.isArray(v)?v.length:1; }
    if(fn==='plot'){ const x=piped!==undefined?piped:rEval(args[0]||''); const y=rEval(args[piped!==undefined?0:1]||''); if(!Array.isArray(x)||!Array.isArray(y)) throw new Error('plot requires vectors'); return {__action:true,action:'plot',x,y,output:'Plot created.'}; }
    if(fn==='hist'){ const x=piped!==undefined?piped:rEval(args[0]||''); if(!Array.isArray(x)) throw new Error('hist requires a numeric vector'); return {__action:true,action:'hist',x,output:'Histogram created.'}; }
    if(fn==='grepl'){
      const pattern=rEval(args[0]||'');
      const values=rEval(args[1]||'');
      const re=new RegExp(pattern);
      return (Array.isArray(values)?values:[values]).map(value=>re.test(String(value)));
    }
    if(fn==='gsub'){
      const pattern=rEval(args[0]||'');
      const replacement=rEval(args[1]||'');
      const values=rEval(args[2]||'');
      const re=new RegExp(pattern,'g');
      return (Array.isArray(values)?values:[values]).map(value=>String(value).replace(re,String(replacement)));
    }

    if(fn==='select'){
      const df=ensureDf(firstArg());
      const cols=(piped!==undefined?args:args.slice(1)).map(colName);
      const rows=df.rows.map(r=>Object.fromEntries(cols.map(c=>[c,r[c]])));
      return asDf(rows);
    }
    if(fn==='filter'){
      const df=ensureDf(firstArg());
      const clauses=piped!==undefined?args:args.slice(1);
      let rows=df.rows.slice();
      clauses.forEach(expr=>{rows=rows.filter(row=>evalFilterExpr(row,expr));});
      return asDf(rows);
    }
    if(fn==='left_join' || fn==='inner_join'){
      const left=ensureDf(firstArg());
      const right=ensureDf(piped!==undefined?rEval(args[0]||''):rEval(args[1]||''));
      const bySpec=args.find(arg=>/^by\s*=/.test(arg));
      if(!bySpec) throw new Error(`${name} needs a by = key`);
      const key=String(rEval(bySpec.slice(bySpec.indexOf('=')+1).trim()));
      if(!Object.hasOwn(left.rows[0]||{},key) || !Object.hasOwn(right.rows[0]||{},key)) throw new Error(`join key '${key}' not found in both tables`);
      const rightColumns=Object.keys(right.rows[0]||{}).filter(column=>column!==key);
      const rows=[];
      left.rows.forEach(leftRow=>{
        const matches=right.rows.filter(rightRow=>rightRow[key]===leftRow[key]);
        if(matches.length){
          matches.forEach(rightRow=>rows.push({...leftRow,...Object.fromEntries(rightColumns.map(column=>[column,rightRow[column]]))}));
        } else if(fn==='left_join'){
          rows.push({...leftRow,...Object.fromEntries(rightColumns.map(column=>[column,null]))});
        }
      });
      return asDf(rows);
    }
    if(fn==='pivot_wider'){
      const df=ensureDf(firstArg());
      const namesFrom=args.find(arg=>/^names_from\s*=/.test(arg))?.split('=').slice(1).join('=').trim();
      const valuesFrom=args.find(arg=>/^values_from\s*=/.test(arg))?.split('=').slice(1).join('=').trim();
      if(!namesFrom||!valuesFrom) throw new Error('pivot_wider needs names_from and values_from');
      const groups=Object.keys(df.rows[0]||{}).filter(column=>column!==namesFrom&&column!==valuesFrom);
      const wide=new Map();
      df.rows.forEach(row=>{
        const groupKey=groups.map(column=>String(row[column])).join('||');
        if(!wide.has(groupKey)) wide.set(groupKey,Object.fromEntries(groups.map(column=>[column,row[column]])));
        wide.get(groupKey)[row[namesFrom]]=row[valuesFrom];
      });
      return asDf([...wide.values()]);
    }
    if(fn==='mutate'){
      const df=ensureDf(firstArg());
      const specs=piped!==undefined?args:args.slice(1);
      const rows=df.rows.map(row=>{
        const next={...row};
        specs.forEach(spec=>{
          const m=spec.match(/^([A-Za-z.][\w.]*)\s*=\s*(.+)$/);
          if(!m) throw new Error('mutate expects new_col = expression');
          next[m[1]]=evalRowExpr(next,m[2]);
        });
        return next;
      });
      return asDf(rows);
    }
    if(fn==='rename'){
      const df=ensureDf(firstArg());
      const specs=piped!==undefined?args:args.slice(1);
      const mapping={};
      specs.forEach(spec=>{
        const m=spec.match(/^([A-Za-z.][\w.]*)\s*=\s*([A-Za-z.][\w.]*)$/);
        if(!m) throw new Error('rename expects new_name = old_name');
        mapping[m[2]]=m[1];
      });
      const rows=df.rows.map(row=>{
        const next={};
        Object.keys(row).forEach(k=>{ next[mapping[k]||k]=row[k]; });
        return next;
      });
      return asDf(rows);
    }
    if(fn==='arrange'){
      const df=ensureDf(firstArg());
      const term=(piped!==undefined?args[0]:args[1]||'').trim();
      const descM=term.match(/^desc\(([^)]+)\)$/i);
      const key=colName(descM?descM[1]:term);
      const isDesc=!!descM;
      const rows=df.rows.slice().sort((a,b)=>{
        if(a[key]===b[key]) return 0;
        if(a[key]>b[key]) return isDesc?-1:1;
        return isDesc?1:-1;
      });
      return asDf(rows);
    }
    if(fn==='group_by'){
      const df=ensureDf(firstArg());
      const groups=(piped!==undefined?args:args.slice(1)).map(colName);
      return {type:'grouped.data.frame',rows:df.rows.slice(),groups};
    }
    if(fn==='summarize' || fn==='summarise'){
      const df=ensureDf(firstArg());
      const specs=piped!==undefined?args:args.slice(1);
      const groups=df.type==='grouped.data.frame' ? df.groups : [];
      const buckets=new Map();
      const bucketKey=row=>groups.map(g=>String(row[g])).join('||');
      if(groups.length){
        df.rows.forEach(row=>{ const k=bucketKey(row); if(!buckets.has(k)) buckets.set(k,[]); buckets.get(k).push(row); });
      } else buckets.set('__all__',df.rows.slice());
      const out=[];
      buckets.forEach(rows=>{
        const next={};
        if(groups.length) groups.forEach(g=>{ next[g]=rows[0][g]; });
        specs.forEach(spec=>{
          const m=spec.match(/^([A-Za-z.][\w.]*)\s*=\s*(.+)$/);
          if(!m) throw new Error('summarize expects name = expression');
          next[m[1]]=evalSummaryExpr(rows,m[2]);
        });
        out.push(next);
      });
      return asDf(out);
    }
    throw new Error(`function '${name}' is not supported in this quest`);
  }

  function evalFilterExpr(row, expr){
    const trimmed=String(expr).trim();
    const m=trimmed.match(/^([A-Za-z.][\w.]*)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
    if(!m){
      if(/^[A-Za-z.][\w.]*\s*=\s*.+$/.test(trimmed) && !/(==|!=|>=|<=)/.test(trimmed)){
        throw new Error('Use == for comparisons in filter() (not =).');
      }
      throw new Error('filter currently supports one condition like price > 4');
    }
    const left=row[m[1]];
    const right=evalRowExpr(row,m[3]);
    if((m[2]==='=='||m[2]==='!=')&&typeof left==='string'&&typeof right==='string'){
      const l=left.toLowerCase();
      const r=right.toLowerCase();
      return m[2]==='==' ? l===r : l!==r;
    }
    if(m[2]==='==') return left===right;
    if(m[2]==='!=') return left!==right;
    if(m[2]==='>=') return left>=right;
    if(m[2]==='<=') return left<=right;
    if(m[2]==='>') return left>right;
    return left<right;
  }

  function evalRowExpr(row, expr){
    const s=String(expr).trim();
    if(/^[-+]?\d+(\.\d+)?$/.test(s)) return Number(s);
    if(/^['"].*['"]$/.test(s)) return s.slice(1,-1);
    if(Object.prototype.hasOwnProperty.call(row,s)) return row[s];
    const m=s.match(/^(.+?)\s*([+\-*\/])\s*(.+)$/);
    if(m){
      const a=evalRowExpr(row,m[1]);
      const b=evalRowExpr(row,m[3]);
      if(m[2]==='+') return a+b;
      if(m[2]==='-') return a-b;
      if(m[2]==='*') return a*b;
      return a/b;
    }
    return rEval(s);
  }

  function evalSummaryExpr(rows, expr){
    const s=String(expr).trim();
    if(/^n\(\)$/.test(s)) return rows.length;
    let m=s.match(/^mean\((\w+)\)$/i);
    if(m){ const vals=rows.map(r=>r[m[1]]); return vals.reduce((a,b)=>a+b,0)/vals.length; }
    m=s.match(/^sum\((\w+)\)$/i);
    if(m){ return rows.map(r=>r[m[1]]).reduce((a,b)=>a+b,0); }
    throw new Error('summarize currently supports mean(col), sum(col), and n()');
  }

  function rFormat(v){ if(Array.isArray(v))return'[1] '+v.join(' '); if(v&&(v.type==='data.frame'||v.type==='grouped.data.frame'))return`${v.type}: ${v.rows.length} rows`; if(typeof v==='string')return`[1] "${v}"`; if(typeof v==='boolean')return v?'[1] TRUE':'[1] FALSE'; return v===undefined?'':`[1] ${v}`; }

  function execGit(code){
    const c=code.trim(); if(c==='git status')return{action:'status',output:`On branch ${state.git.branch}\n${state.git.staged.length?'Changes to be committed:\n  '+state.git.staged.join('\n  '):'No changes staged.'}${state.git.modified.length?'\nChanges not staged:\n  '+state.git.modified.join('\n  '):''}`};
    let m=c.match(/^git clone\s+(https?:\/\/\S+)$/i); if(m){state.git.cloned=true;state.git.remote='origin';return{action:'clone',output:`Cloning into 'project-repo'...\nremote: Enumerating objects: 42, done.\nReceiving objects: 100%\n✓ Clone complete.`};}
    m=c.match(/^git add\s+(.+)$/); if(m){const f=m[1].trim();if(!state.git.staged.includes(f))state.git.staged.push(f);state.git.modified=state.git.modified.filter(x=>x!==f);return{action:'add',output:''};}
    m=c.match(/^git commit\s+-m\s+["'](.+)["']$/); if(m){if(!state.git.staged.length)throw new Error('nothing added to commit');state.git.commits.push({id:String(state.git.commits.length+1).padStart(3,'0'),message:m[1],branch:state.git.branch,files:[...state.git.staged]});state.git.staged=[];return{action:'commit',output:`[${state.git.branch} ${String(state.git.commits.length).padStart(3,'0')}] ${m[1]}`};}
    m=c.match(/^git branch\s+(\S+)$/); if(m){if(!state.git.branches.includes(m[1]))state.git.branches.push(m[1]);if(m[1]==='feature-plot'&&!state.git.modified.includes('plot.R'))state.git.modified.push('plot.R');return{action:'branch',output:''};}
    m=c.match(/^git (?:switch|checkout)\s+(\S+)$/); if(m){if(!state.git.branches.includes(m[1]))throw new Error(`unknown branch '${m[1]}'`);state.git.branch=m[1];return{action:'switch',output:`Switched to branch '${m[1]}'`};}
    m=c.match(/^git merge\s+(\S+)$/); if(m){if(state.git.branch!=='main')throw new Error('switch to main before this teaching merge');if(m[1]!=='feature-plot')throw new Error('branch not found');if(!state.git.commits.some(x=>x.branch==='feature-plot'))throw new Error('feature branch has no commit yet');state.git.merged=true;return{action:'merge',output:'Updating main\nFast-forward\n plot.R | 1 +\n✓ feature-plot merged'};}
    if(c==='git pull'){if(state.git.branch!=='main')throw new Error('pull from main in this lesson');if(!state.git.remoteBehind)return{action:'pull',output:'Already up to date.'};state.git.remoteBehind=false;if(!state.git.modified.includes('README.md'))state.git.modified.push('README.md');return{action:'pull',output:'From origin/main\nUpdating 001..002\nFast-forward\n README.md | 2 ++'};}
    if(c==='git push'){if(state.git.branch!=='main')throw new Error('push from main in this lesson');if(!state.git.merged&&!state.git.commits.some(x=>x.branch==='main'))throw new Error('nothing new to push from main yet');state.git.pushed=true;return{action:'push',output:'Enumerating objects: 8, done.\nTo origin\n   002..003  main -> main\n✓ Push complete.'};}
    if(c==='git log')return{action:'log',output:state.git.commits.slice().reverse().map(x=>`commit ${x.id}\n    ${x.message}`).join('\n\n')||'No commits yet.'};
    throw new Error(`git: '${c.replace(/^git\s*/, '')}' is not supported in this quest`);
  }

  function parseMakefile(text){
    const rules={};
    const order=[];
    let currentRule=null;
    for(const rawLine of String(text).replace(/\r\n?/g,'\n').split('\n')){
      if(!rawLine.trim()||/^\s*#/.test(rawLine)) continue;
      const recipeIndent=rawLine.startsWith('\t')?1:rawLine.startsWith('   ')?3:0;
      if(recipeIndent){
        if(!currentRule) return {error:'recipe line must follow a target rule'};
        currentRule.recipe.push(rawLine.slice(recipeIndent));
        continue;
      }
      if(/^\s+/.test(rawLine)) return {error:'recipe lines must start with a tab or three spaces'};
      const match=rawLine.match(/^([^:\s]+)\s*:\s*(.*)$/);
      if(!match) return {error:`cannot parse Makefile line: ${rawLine}`};
      const target=match[1];
      const rule={prerequisites:match[2].trim()?match[2].trim().split(/\s+/):[],recipe:[]};
      rules[target]=rule;
      order.push(target);
      currentRule=rule;
    }
    if(!order.length) return {error:'Makefile has no target rules'};
    state.make.rules=rules;
    state.make.order=order;
    state.make.defaultTarget=order[0];
    state.make.sourceText=String(text);
    return {rules,order};
  }

  function makePlan(target){
    const commands=[];
    const visiting=[];
    const built=new Set();
    const visit=(name,parent)=>{
      if(state.make.files.includes(name)||built.has(name)) return null;
      if(visiting.includes(name)) return `Circular dependency for target '${name}'.`;
      const rule=state.make.rules[name];
      if(!rule) return parent
        ? `No rule to make target '${name}', needed by '${parent}'.`
        : `No rule to make target '${name}'.`;
      visiting.push(name);
      for(const prerequisite of rule.prerequisites){
        const problem=visit(prerequisite,name);
        if(problem) return problem;
      }
      visiting.pop();
      built.add(name);
      commands.push(...rule.recipe);
      return null;
    };
    const error=visit(target,null);
    return {commands,error};
  }

  function execMake(code){
    const input=String(code).trim();
    if(!/^make(?:\s|$)/.test(input)){
      const parsed=parseMakefile(code);
      if(parsed.error) return {action:'make-error',output:`Makefile error: ${parsed.error}`};
      return {action:'makefile',rules:parsed.rules,output:`Read ${parsed.order.length} target rule${parsed.order.length===1?'':'s'}.`};
    }
    const command=input.match(/^make(?:\s+(-n))?(?:\s+([\w./-]+))?$/);
    if(!command) return {action:'make-error',output:'Usage: make [-n] [target]'};
    const dryRun=command[1]==='-n';
    const target=command[2]||state.make.defaultTarget;
    if(!target) return {action:'make-error',output:'No target is available. Enter Makefile rules first.'};
    const plan=makePlan(target);
    if(plan.error) return {action:'make-error',output:`make: *** ${plan.error} Stop.`};
    state.make.lastPlan=plan.commands.slice();
    if(dryRun) return {action:'make-plan',target,commands:plan.commands,output:plan.commands.length?plan.commands.join('\n'):`make: Nothing to be done for '${target}'.`};
    state.make.lastRun=plan.commands.slice();
    return {action:'make-run',target,commands:plan.commands,output:plan.commands.length?plan.commands.join('\n'):`make: Nothing to be done for '${target}'.`};
  }

  function execSQL(code){
    const q=code.trim().replace(/;$/,'').replace(/\s+/g,' '); if(!/^select\s+/i.test(q))throw new Error('This teaching database currently expects SELECT queries.');
    if(/^select count\(\*\) from products$/i.test(q))return{aggregate:'count',value:products.length,columns:['COUNT(*)'],rows:[{'COUNT(*)':products.length}],output:String(products.length)};
    if(/^select avg\(sales\) from products$/i.test(q)){const v=products.reduce((a,b)=>a+b.sales,0)/products.length;return{aggregate:'avg',value:v,columns:['AVG(sales)'],rows:[{'AVG(sales)':v}],output:String(v)};}
    if(/^select category, avg\(sales\) from products group by category$/i.test(q)){const cats=[...new Set(products.map(x=>x.category))];const rows=cats.map(cat=>{const a=products.filter(x=>x.category===cat);return{category:cat,'AVG(sales)':a.reduce((s,x)=>s+x.sales,0)/a.length};});return{grouped:true,columns:['category','AVG(sales)'],rows,output:`${rows.length} rows`};}
    const m=q.match(/^select (.+) from (\w+)(?: where (.+?))?(?: order by (\w+)(?: (asc|desc))?)?$/i); if(!m)throw new Error('Query shape not supported in this mock yet.');
    const tableName=m[2];
    const source=tableName.toLowerCase()==='products'?products:state.sqlTables[tableName];
    if(!source) throw new Error(`no such table: ${tableName}`);
    let rows=source.map(x=>({...x})),filter='';
    if(m[3]){
      const condition=m[3].trim();
      const where=condition.match(/^(\w+)\s*(=|==|!=|>=|<=|>|<)\s*(.+)$/);
      if(!where) throw new Error('This lesson supports a simple WHERE column = value condition.');
      const [,column,operator,rawValue]=where;
      const value=/^['"].*['"]$/.test(rawValue)?rawValue.slice(1,-1):Number(rawValue);
      if(!Object.hasOwn(rows[0]||{},column)) throw new Error(`no such column: ${column}`);
      rows=rows.filter(row=>{
        const left=row[column];
        if(operator==='='||operator==='==') return left===value || String(left)===String(value);
        if(operator==='!=') return left!==value;
        if(operator==='>') return left>value;
        if(operator==='<') return left<value;
        if(operator==='>=') return left>=value;
        return left<=value;
      });
      filter=condition.replace(/\s+/g,'');
    }
    if(m[4]){const k=m[4];if(!Object.hasOwn(rows[0]||source[0]||{},k))throw new Error(`no such column: ${k}`);const desc=(m[5]||'asc').toLowerCase()==='desc';rows.sort((a,b)=>desc?(a[k]<b[k]?1:a[k]>b[k]?-1:0):(a[k]>b[k]?1:a[k]<b[k]?-1:0));}
    const cols=m[1].trim()==='*'?Object.keys(source[0]||{}):m[1].split(',').map(x=>x.trim());
    cols.forEach(column=>{if(!Object.hasOwn(source[0]||{},column))throw new Error(`no such column: ${column}`);});
    rows=rows.map(r=>Object.fromEntries(cols.map(c=>[c,r[c]])));
    return{columns:cols,rows,filter,output:`${rows.length} rows`};
  }

  function execMarkdown(code){
    state.markdownDoc=code;
    return{action:'markdown',doc:code,html:markdownToHtml(code),output:'Preview updated.'};
  }

  function markdownToHtml(md){
    const lines=String(md).replace(/\r\n?/g,'\n').split('\n');
    const out=[];
    let inUl=false,inOl=false;
    const closeLists=()=>{if(inUl){out.push('</ul>');inUl=false;}if(inOl){out.push('</ol>');inOl=false;}};
    for(const line of lines){
      const trimmed=line.trim();
      if(!trimmed){closeLists();continue;}
      const h=trimmed.match(/^(#{1,6})\s+(.+)$/);
      if(h){closeLists();const lvl=h[1].length;out.push(`<h${lvl}>${mdInline(h[2])}</h${lvl}>`);continue;}
      const ul=trimmed.match(/^[-*]\s+(.+)$/);
      if(ul){if(inOl){out.push('</ol>');inOl=false;}if(!inUl){out.push('<ul>');inUl=true;}out.push(`<li>${mdInline(ul[1])}</li>`);continue;}
      const ol=trimmed.match(/^\d+\.\s+(.+)$/);
      if(ol){if(inUl){out.push('</ul>');inUl=false;}if(!inOl){out.push('<ol>');inOl=true;}out.push(`<li>${mdInline(ol[1])}</li>`);continue;}
      closeLists();
      out.push(`<p>${mdInline(trimmed)}</p>`);
    }
    closeLists();
    return out.join('');
  }

  function mdInline(text){
    let s=esc(text);
    s=s.replace(/`([^`\n]+)`/g,'<code>$1</code>');
    s=s.replace(/\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    s=s.replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>');
    s=s.replace(/__([^_\n]+)__/g,'<strong>$1</strong>');
    s=s.replace(/\*([^*\n]+)\*/g,'<em>$1</em>');
    s=s.replace(/_([^_\n]+)_/g,'<em>$1</em>');
    return s;
  }

  function showResult(r){
    el.resultPanel.innerHTML='';
    if(r.table){el.resultPanel.classList.remove('hidden');renderTable(r.table,el.resultPanel);return;}
    if(currentPack().type==='sql'&&r.rows){el.resultPanel.classList.remove('hidden');renderTable(r.rows,el.resultPanel);return;}
    if(currentPack().type==='r'&&r.value&&(r.value.type==='data.frame'||r.value.type==='grouped.data.frame')){el.resultPanel.classList.remove('hidden');renderTable(r.value.rows.slice(0,10),el.resultPanel);return;}
    if(r.action==='plot'){el.resultPanel.classList.remove('hidden');el.resultPanel.innerHTML='<strong class="small">Plots</strong>'+scatterSvg(r.x,r.y);return;}
    if(r.action==='hist'){el.resultPanel.classList.remove('hidden');el.resultPanel.innerHTML='<strong class="small">Plots</strong>'+histSvg(r.x);}
    if(r.action==='ggplot'){
      el.resultPanel.classList.remove('hidden');
      el.resultPanel.innerHTML='<strong class="small">ggplot preview</strong>'+(r.kind==='hist'?histSvg(r.x):scatterSvg(r.x,r.y,r.xLabel,r.yLabel));
    }
    if(r.action==='markdown'){el.resultPanel.classList.remove('hidden');el.resultPanel.innerHTML='<strong class="small">Preview</strong><div class="reading-pane" style="margin-top:8px">'+r.html+'</div>';}
  }
  function renderTable(rows,target){ if(!rows.length){target.textContent='0 rows';return;}const cols=Object.keys(rows[0]);target.innerHTML=`<table><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }
  function scatterSvg(x,y,xLabel='price',yLabel='sales'){const W=420,H=240,p=32,xmin=Math.min(...x),xmax=Math.max(...x),ymin=Math.min(...y),ymax=Math.max(...y),sx=v=>p+(v-xmin)/(xmax-xmin||1)*(W-2*p),sy=v=>H-p-(v-ymin)/(ymax-ymin||1)*(H-2*p);return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;margin-top:8px" role="img" aria-label="Scatter plot"><line x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}" stroke="#9ca3af"/><line x1="${p}" y1="${p}" x2="${p}" y2="${H-p}" stroke="#9ca3af"/>${x.map((v,i)=>`<circle cx="${sx(v)}" cy="${sy(y[i])}" r="5" fill="#2563eb"/>`).join('')}<text x="${W/2}" y="${H-5}" text-anchor="middle" font-size="12">${esc(xLabel)}</text><text x="12" y="${H/2}" text-anchor="middle" font-size="12" transform="rotate(-90 12 ${H/2})">${esc(yLabel)}</text></svg>`;}
  function histSvg(x){const min=Math.min(...x),max=Math.max(...x),bins=4,width=(max-min)/bins||1,counts=Array(bins).fill(0);x.forEach(v=>counts[Math.min(bins-1,Math.floor((v-min)/width))]++);const W=420,H=220,p=30,bw=(W-2*p)/bins,mx=Math.max(...counts);return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;margin-top:8px" role="img" aria-label="Histogram">${counts.map((c,i)=>{const h=c/mx*(H-2*p);return`<rect x="${p+i*bw+2}" y="${H-p-h}" width="${bw-4}" height="${h}" fill="#2563eb" opacity=".8"/>`}).join('')}<line x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}" stroke="#9ca3af"/><text x="${W/2}" y="${H-5}" text-anchor="middle" font-size="12">sales</text></svg>`;}

  function renderState(){
    const t=currentPack().type;
    if(t==='r'){const entries=Object.entries(state.env);el.statePanel.innerHTML=entries.length?entries.map(([k,v])=>`<div class="state-row"><div class="mono"><strong>${esc(k)}</strong></div><div class="small muted">${Array.isArray(v)?`num [1:${v.length}] ${v.join(' ')}`:v?.type==='data.frame'?`data.frame ${v.rows.length} × ${Object.keys(v.rows[0]).length}`:typeof v==='number'?`num ${v}`:esc(typeof v)}</div></div>`).join(''):'<div class="state-row small muted">No objects yet.</div>';}
    if(t==='shell'){el.prompt.textContent=shellPrompt();el.stateSubtitle.textContent=shellPathText();el.statePanel.innerHTML=`<pre class="state-row mono small">HOME\n├── Desktop\n├── Documents\n├── Downloads\n└── terminal-quest\n    ├── data\n    │   ├── survey.csv\n    │   └── products.csv\n    ├── notes\n    └── README.txt${state.shellRepos?`\n    └── repos${state.shellCloned?'\n        └── Hello-World':''}`:''}</pre>`;}
    if(t==='git'){el.workspaceSubtitle.textContent=`branch: ${state.git.branch}`;el.stateSubtitle.textContent=state.git.branch;el.statePanel.innerHTML=`<div class="state-row small"><strong>Current branch</strong><div class="mono">${state.git.branch}</div></div><div class="state-row small"><strong>Branches</strong><div class="mono">${state.git.branches.map(b=>b===state.git.branch?'* '+b:'  '+b).join('<br>')}</div></div><div class="state-row small"><strong>Staged</strong><div>${state.git.staged.join(', ')||'—'}</div></div><div class="state-row small"><strong>Modified</strong><div>${state.git.modified.join(', ')||'—'}</div></div><div class="state-row small"><strong>Remote</strong><div>${state.git.remote} (${state.git.remoteBehind?'behind':'up to date'})</div></div><div class="state-row small"><strong>Commits</strong><div>${state.git.commits.length}</div></div><div class="state-row small"><strong>Merged feature?</strong><div>${state.git.merged?'✓ yes':'not yet'}</div></div><div class="state-row small"><strong>Pushed to remote?</strong><div>${state.git.pushed?'✓ yes':'not yet'}</div></div>`;}
    if(t==='sql'){
      const tables=state.sqlTables&&Object.keys(state.sqlTables).length?state.sqlTables:{products};
      el.statePanel.innerHTML=Object.entries(tables).map(([name,rows])=>`<div class="state-row"><div class="mono"><strong>${esc(name)}</strong></div><div class="small muted">${rows.length} rows × ${Object.keys(rows[0]||{}).length} columns</div><div class="small mono">${Object.keys(rows[0]||{}).map(esc).join(', ')}</div></div>`).join('');
    }
    if(t==='markdown'){const lines=state.markdownDoc?state.markdownDoc.split(/\r\n?|\n/).length:0;const chars=state.markdownDoc.length;const label=currentPack().workspace?.documentLabel||'README.md';el.statePanel.innerHTML=`<div class="state-row small"><strong>Response</strong><div class="mono">${esc(label)}</div></div><div class="state-row small"><strong>Lines</strong><div>${lines}</div></div><div class="state-row small"><strong>Characters</strong><div>${chars}</div></div>`;}
    if(t==='make'){
      const rules=state.make.order.map(target=>{
        const rule=state.make.rules[target];
        return `<div class="state-row small"><strong class="mono">${esc(target)}</strong><div class="muted">needs: ${esc(rule.prerequisites.join(', ')||'no prerequisites')}</div></div>`;
      }).join('');
      el.statePanel.innerHTML=rules||'<div class="state-row small muted">Enter a Makefile rule to see its target and prerequisites.</div>';
    }
  }
  function renderInventory(){el.inventory.innerHTML=state.unlocked.length?state.unlocked.map(x=>`<div class="inventory-item"><span class="ok">✓</span> <code>${esc(x)}</code></div>`).join(''):'<div class="small muted">Tools unlock as you progress.</div>';}

  function showHint(){const hs=asFn(currentMission().hints,state,helpers)||[];const n=state.hints[state.mission]||0;el.hintArea.innerHTML=`💡 ${hs[Math.min(n,hs.length-1)]}`;state.hints[state.mission]=n+1;}
  function showSolution(){state.hints[state.mission]=99;el.hintArea.innerHTML=`<strong>One solution:</strong><pre class="mono">${esc(asFn(currentMission().solution,state,helpers))}</pre>`;}
  function grantReadingReward(){
    const m=currentMission();
    if(!isReadingMission(m) || state.readRewards[state.mission]) return;
    const reward=readingXp(m);
    state.xp+=reward;
    (asFn(m.unlock,state,helpers)||[]).forEach(x=>{if(!state.unlocked.includes(x))state.unlocked.push(x);});
    state.readRewards[state.mission]=reward;
    el.xp.textContent=state.xp;
    el.rank.textContent=rank(state.xp);
    renderInventory();
  }
  function nextMission(){
    grantReadingReward();
    if(state.mission===currentPack().missions.length-1){state.complete=true;el.victory.classList.remove('hidden');el.victoryText.textContent=`You completed ${currentPack().title} with ${state.xp} XP.`;return;}
    if(currentPack().type==='markdown')state.markdownDoc='';
    state.mission++;
    el.commandInput.value='';
    render();
    el.commandInput.focus();
  }
  function resetMission(){
    const reading=isReadingMission(currentMission());
    if(isChoiceMission(currentMission())){
      delete state.choiceAnswers[state.mission];
      render();
      return;
    }
    el.commandInput.value=currentPack().type==='markdown'?state.markdownDoc:'';
    el.feedback.textContent='';
    el.hintArea.textContent='';
    el.commandInput.disabled=reading;
    el.runBtn.disabled=reading;
    el.nextBtn.disabled=!reading;
    if(reading){el.feedback.innerHTML=`<span class="small muted">Read this pane, then continue. You will earn +${readingXp(currentMission())} XP when you click Next mission.</span>`;}
  }
  function switchPack(){state=freshState(el.packSelect.value);el.consoleOutput.textContent='';el.resultPanel.classList.add('hidden');render();}
  function restartPack(){const id=state.packId,os=state.os;state=freshState(id);state.os=os;el.consoleOutput.textContent='';render();}

  window.CODE_QUEST={registerPack,start,helpers};
})();
