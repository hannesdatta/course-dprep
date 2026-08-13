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

  let state = null;
  let el = null;

  function registerPack(pack) { packs[pack.id] = pack; }
  function currentPack(){ return packs[state.packId]; }
  function currentMission(){ return currentPack().missions[state.mission]; }
  function asFn(v, ...args){ return typeof v === 'function' ? v(...args) : v; }
  function esc(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
  function rank(xp){ if(xp>=800)return'Code Wizard'; if(xp>=550)return'Workflow Ranger'; if(xp>=300)return'Command Crafter'; if(xp>=120)return'Code Apprentice'; return'Code Curious'; }

  function freshState(packId){
    const s={packId,mission:0,xp:0,hints:{},unlocked:[],lastResult:null,complete:false,os:'mac',shellPath:[],shellRepos:false,shellCloned:false,env:{},git:{branch:'main',branches:['main'],staged:[],modified:['analysis.R'],commits:[],merged:false}};
    const p=packs[packId]; if(p.setup) p.setup(s, helpers); return s;
  }

  const helpers = { products: () => products.map(x=>({...x})) };

  function start(){
    el=Object.fromEntries(['questName','missionNum','missionTotal','xp','rank','packSelect','packControls','packDescription','missionBadge','difficulty','missionTitle','missionIntro','taskBox','conceptBox','conceptText','hintBtn','solutionBtn','hintArea','workspaceTitle','workspaceSubtitle','consoleOutput','prompt','commandInput','runBtn','resultPanel','feedback','clearBtn','resetMissionBtn','nextBtn','stateTitle','stateSubtitle','statePanel','inventory','victory','victoryText','restartBtn','instructorView'].map(id=>[id,document.getElementById(id)]));
    Object.values(packs).forEach(p=>{ const o=document.createElement('option'); o.value=p.id; o.textContent=p.title; el.packSelect.appendChild(o); });
    const first=Object.keys(packs)[0]; if(!first) throw new Error('No lesson packs registered.');
    state=freshState(first);
    bind();
    const cfg=window.CODE_QUEST_CONFIG||{}; el.instructorView.classList.toggle('hidden', cfg.showInstructorView === false);
    render();
  }

  function bind(){
    el.runBtn.addEventListener('click',run);
    el.commandInput.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();run();}});
    el.hintBtn.addEventListener('click',showHint); el.solutionBtn.addEventListener('click',showSolution); el.nextBtn.addEventListener('click',nextMission);
    el.resetMissionBtn.addEventListener('click',resetMission); el.clearBtn.addEventListener('click',()=>el.consoleOutput.textContent='');
    el.packSelect.addEventListener('change',switchPack); el.restartBtn.addEventListener('click',restartPack);
  }

  function render(){
    const p=currentPack(),m=currentMission();
    el.packSelect.value=p.id; el.questName.textContent=p.title.replace(' Quest',''); el.missionNum.textContent=state.mission+1; el.missionTotal.textContent=p.missions.length; el.xp.textContent=state.xp; el.rank.textContent=rank(state.xp);
    el.packDescription.textContent=p.description||''; el.missionBadge.textContent=`MISSION ${state.mission+1}`; el.difficulty.textContent=m.difficulty||''; el.missionTitle.textContent=m.title; el.missionIntro.textContent=m.intro||''; el.taskBox.innerHTML=`<strong>Your task:</strong> ${asFn(m.task,state,helpers)}`;
    if(m.concept){el.conceptBox.classList.remove('hidden');el.conceptText.textContent=asFn(m.concept,state,helpers);} else el.conceptBox.classList.add('hidden');
    el.hintArea.textContent=''; el.feedback.textContent=''; el.resultPanel.classList.add('hidden'); el.nextBtn.disabled=true; el.commandInput.disabled=false; el.runBtn.disabled=false; el.victory.classList.add('hidden');
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
    if(t==='r'){el.workspaceTitle.textContent='R Console';el.workspaceSubtitle.textContent='RStudio-style mock';el.prompt.textContent='>';el.stateTitle.textContent='Environment';el.stateSubtitle.textContent='Global Environment';}
    if(t==='shell'){el.workspaceTitle.textContent=state.os==='mac'?'Terminal':'Command Prompt';el.workspaceSubtitle.textContent='filesystem simulation';el.prompt.textContent=shellPrompt();el.stateTitle.textContent='Folder tree';el.stateSubtitle.textContent=shellPathText();}
    if(t==='git'){el.workspaceTitle.textContent='Git Terminal';el.workspaceSubtitle.textContent=`branch: ${state.git.branch}`;el.prompt.textContent='$';el.stateTitle.textContent='Repository';el.stateSubtitle.textContent=state.git.branch;}
    if(t==='sql'){el.workspaceTitle.textContent='SQL Console';el.workspaceSubtitle.textContent='products database';el.prompt.textContent='SQL>';el.stateTitle.textContent='Database';el.stateSubtitle.textContent='products';}
  }

  function welcomeText(){ const t=currentPack().type; if(t==='r')return'R version 4.x.x (mock)\nReady.'; if(t==='shell')return`Welcome.\nCurrent directory: ${shellPathText()}`; if(t==='git')return'Initialized teaching repository.\nOn branch main'; return'Database connected.\nTable available: products'; }
  function shellPathText(){ if(state.os==='mac')return state.shellPath.length?'~/'+state.shellPath.join('/'):'~'; return state.shellPath.length?'C:\\Users\\student\\'+state.shellPath.join('\\'):'C:\\Users\\student'; }
  function shellPrompt(){ return state.os==='mac'?`student@laptop ${shellPathText()} %`:`${shellPathText()}>`; }

  function run(){
    const code=el.commandInput.value.trim(); if(!code)return; let result;
    try{ result=execute(code); state.lastResult=result; appendConsole(code,result); }
    catch(e){ appendConsole(code,{error:e.message}); el.feedback.textContent='That produced an error. Read it carefully and try again.'; el.commandInput.value=''; renderState(); return; }
    el.commandInput.value=''; showResult(result); renderState();
    let solved=false; try{solved=!!currentMission().check(state,result,code,helpers);}catch(e){}
    if(solved){ const reward=state.hints[state.mission]?Math.max(40,currentMission().xp-20):currentMission().xp; state.xp+=reward; (asFn(currentMission().unlock,state,helpers)||[]).forEach(x=>{if(!state.unlocked.includes(x))state.unlocked.push(x)}); el.feedback.innerHTML=`<span class="ok">✓ Mission solved! +${reward} XP</span>`; el.nextBtn.disabled=false; el.commandInput.disabled=true; el.runBtn.disabled=true; el.xp.textContent=state.xp; el.rank.textContent=rank(state.xp); renderInventory(); }
    else el.feedback.textContent='The command ran, but the mission is not solved yet.';
  }

  function execute(code){ const t=currentPack().type; if(t==='shell')return execShell(code); if(t==='r')return execR(code); if(t==='git')return execGit(code); return execSQL(code); }
  function appendConsole(code,r){ el.consoleOutput.textContent+=(el.consoleOutput.textContent?'\n':'')+`${el.prompt.textContent} ${code}`+(r.error?`\nError: ${r.error}`:r.output?`\n${r.output}`:''); }

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

  function execR(code){ const c=code.trim(); let m=c.match(/^([A-Za-z.][\w.]*)\s*(?:<-|=)\s*(.+)$/); if(m){const value=rEval(m[2]);state.env[m[1]]=value;return{action:'assign',value,output:''};} const value=rEval(c); if(value&&value.__action)return value; return{action:'eval',value,output:rFormat(value)}; }
  function rEval(s){
    s=s.trim(); if(/^[-+]?\d+(\.\d+)?$/.test(s))return Number(s); if(/^['"].*['"]$/.test(s))return s.slice(1,-1); if(s==='TRUE')return true; if(s==='FALSE')return false;
    let m=s.match(/^c\((.*)\)$/); if(m)return m[1].split(',').map(x=>rEval(x));
    m=s.match(/^head\((\w+)\)$/); if(m){const df=state.env[m[1]];if(!df||df.type!=='data.frame')throw new Error(`object '${m[1]}' is not a data frame`);return{__action:true,action:'head',rows:df.rows.slice(0,6),table:df.rows.slice(0,6),output:''};}
    m=s.match(/^nrow\((\w+)\)$/); if(m){const df=state.env[m[1]];return df?.type==='data.frame'?df.rows.length:1;}
    m=s.match(/^(\w+)\$(\w+)$/); if(m){const df=state.env[m[1]];if(!df||df.type!=='data.frame')throw new Error(`object '${m[1]}' not found`);return df.rows.map(r=>r[m[2]]);}
    m=s.match(/^mean\((.+)\)$/); if(m){const v=rEval(m[1]);if(!Array.isArray(v))throw new Error('argument is not numeric');return v.reduce((a,b)=>a+b,0)/v.length;}
    m=s.match(/^length\((.+)\)$/); if(m){const v=rEval(m[1]);return Array.isArray(v)?v.length:1;}
    m=s.match(/^(\w+)\[(\d+)\]$/); if(m){const v=state.env[m[1]];if(!Array.isArray(v))throw new Error('object is not subsettable');return v[Number(m[2])-1];}
    m=s.match(/^plot\((.+),\s*(.+)\)$/); if(m){const x=rEval(m[1]),y=rEval(m[2]);if(!Array.isArray(x)||!Array.isArray(y))throw new Error('plot requires vectors');return{__action:true,action:'plot',x,y,output:'Plot created.'};}
    m=s.match(/^hist\((.+)\)$/); if(m){const x=rEval(m[1]);if(!Array.isArray(x))throw new Error('hist requires a numeric vector');return{__action:true,action:'hist',x,output:'Histogram created.'};}
    m=s.match(/^(.+?)\s*([+\-*\/])\s*(.+)$/); if(m){const a=rEval(m[1]),b=rEval(m[3]);if(m[2]==='+')return a+b;if(m[2]==='-')return a-b;if(m[2]==='*')return a*b;return a/b;}
    if(Object.prototype.hasOwnProperty.call(state.env,s))return state.env[s]; throw new Error(`object '${s}' not found`);
  }
  function rFormat(v){ if(Array.isArray(v))return'[1] '+v.join(' '); if(v&&v.type==='data.frame')return`data.frame: ${v.rows.length} obs.`; if(typeof v==='string')return`[1] "${v}"`; if(typeof v==='boolean')return v?'[1] TRUE':'[1] FALSE'; return v===undefined?'':`[1] ${v}`; }

  function execGit(code){
    const c=code.trim(); if(c==='git status')return{action:'status',output:`On branch ${state.git.branch}\n${state.git.staged.length?'Changes to be committed:\n  '+state.git.staged.join('\n  '):'No changes staged.'}${state.git.modified.length?'\nChanges not staged:\n  '+state.git.modified.join('\n  '):''}`};
    let m=c.match(/^git add\s+(.+)$/); if(m){const f=m[1].trim();if(!state.git.staged.includes(f))state.git.staged.push(f);state.git.modified=state.git.modified.filter(x=>x!==f);return{action:'add',output:''};}
    m=c.match(/^git commit\s+-m\s+["'](.+)["']$/); if(m){if(!state.git.staged.length)throw new Error('nothing added to commit');state.git.commits.push({id:String(state.git.commits.length+1).padStart(3,'0'),message:m[1],branch:state.git.branch,files:[...state.git.staged]});state.git.staged=[];return{action:'commit',output:`[${state.git.branch} ${String(state.git.commits.length).padStart(3,'0')}] ${m[1]}`};}
    m=c.match(/^git branch\s+(\S+)$/); if(m){if(!state.git.branches.includes(m[1]))state.git.branches.push(m[1]);if(m[1]==='feature-plot'&&!state.git.modified.includes('plot.R'))state.git.modified.push('plot.R');return{action:'branch',output:''};}
    m=c.match(/^git (?:switch|checkout)\s+(\S+)$/); if(m){if(!state.git.branches.includes(m[1]))throw new Error(`unknown branch '${m[1]}'`);state.git.branch=m[1];return{action:'switch',output:`Switched to branch '${m[1]}'`};}
    m=c.match(/^git merge\s+(\S+)$/); if(m){if(state.git.branch!=='main')throw new Error('switch to main before this teaching merge');if(m[1]!=='feature-plot')throw new Error('branch not found');if(!state.git.commits.some(x=>x.branch==='feature-plot'))throw new Error('feature branch has no commit yet');state.git.merged=true;return{action:'merge',output:'Updating main\nFast-forward\n plot.R | 1 +\n✓ feature-plot merged'};}
    if(c==='git log')return{action:'log',output:state.git.commits.slice().reverse().map(x=>`commit ${x.id}\n    ${x.message}`).join('\n\n')||'No commits yet.'};
    throw new Error(`git: '${c.replace(/^git\s*/, '')}' is not supported in this quest`);
  }

  function execSQL(code){
    const q=code.trim().replace(/;$/,'').replace(/\s+/g,' '); if(!/^select\s+/i.test(q))throw new Error('This teaching database currently expects SELECT queries.');
    if(/^select count\(\*\) from products$/i.test(q))return{aggregate:'count',value:products.length,columns:['COUNT(*)'],rows:[{'COUNT(*)':products.length}],output:String(products.length)};
    if(/^select avg\(sales\) from products$/i.test(q)){const v=products.reduce((a,b)=>a+b.sales,0)/products.length;return{aggregate:'avg',value:v,columns:['AVG(sales)'],rows:[{'AVG(sales)':v}],output:String(v)};}
    if(/^select category, avg\(sales\) from products group by category$/i.test(q)){const cats=[...new Set(products.map(x=>x.category))];const rows=cats.map(cat=>{const a=products.filter(x=>x.category===cat);return{category:cat,'AVG(sales)':a.reduce((s,x)=>s+x.sales,0)/a.length};});return{grouped:true,columns:['category','AVG(sales)'],rows,output:`${rows.length} rows`};}
    let m=q.match(/^select (.+) from products(?: where (.+?))?(?: order by (\w+)(?: (asc|desc))?)?$/i); if(!m)throw new Error('Query shape not supported in this mock yet.');
    let rows=products.map(x=>({...x})),filter=''; if(m[2]){const w=m[2].trim();let fm=w.match(/^price\s*>\s*(\d+(?:\.\d+)?)$/i);if(fm){const v=Number(fm[1]);rows=rows.filter(x=>x.price>v);filter='price>'+v;}else throw new Error('This lesson currently supports WHERE price > number.');}
    if(m[3]){const k=m[3];const desc=(m[4]||'asc').toLowerCase()==='desc';rows.sort((a,b)=>desc?b[k]-a[k]:a[k]-b[k]);}
    const cols=m[1].trim()==='*'?['product','category','price','sales']:m[1].split(',').map(x=>x.trim()); rows=rows.map(r=>Object.fromEntries(cols.map(c=>[c,r[c]]))); return{columns:cols,rows,filter,output:`${rows.length} rows`};
  }

  function showResult(r){
    el.resultPanel.innerHTML='';
    if(r.table){el.resultPanel.classList.remove('hidden');renderTable(r.table,el.resultPanel);return;}
    if(currentPack().type==='sql'&&r.rows){el.resultPanel.classList.remove('hidden');renderTable(r.rows,el.resultPanel);return;}
    if(r.action==='plot'){el.resultPanel.classList.remove('hidden');el.resultPanel.innerHTML='<strong class="small">Plots</strong>'+scatterSvg(r.x,r.y);return;}
    if(r.action==='hist'){el.resultPanel.classList.remove('hidden');el.resultPanel.innerHTML='<strong class="small">Plots</strong>'+histSvg(r.x);}
  }
  function renderTable(rows,target){ if(!rows.length){target.textContent='0 rows';return;}const cols=Object.keys(rows[0]);target.innerHTML=`<table><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }
  function scatterSvg(x,y){const W=420,H=240,p=32,xmin=Math.min(...x),xmax=Math.max(...x),ymin=Math.min(...y),ymax=Math.max(...y),sx=v=>p+(v-xmin)/(xmax-xmin||1)*(W-2*p),sy=v=>H-p-(v-ymin)/(ymax-ymin||1)*(H-2*p);return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;margin-top:8px" role="img" aria-label="Scatter plot"><line x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}" stroke="#9ca3af"/><line x1="${p}" y1="${p}" x2="${p}" y2="${H-p}" stroke="#9ca3af"/>${x.map((v,i)=>`<circle cx="${sx(v)}" cy="${sy(y[i])}" r="5" fill="#2563eb"/>`).join('')}<text x="${W/2}" y="${H-5}" text-anchor="middle" font-size="12">price</text><text x="12" y="${H/2}" text-anchor="middle" font-size="12" transform="rotate(-90 12 ${H/2})">sales</text></svg>`;}
  function histSvg(x){const min=Math.min(...x),max=Math.max(...x),bins=4,width=(max-min)/bins||1,counts=Array(bins).fill(0);x.forEach(v=>counts[Math.min(bins-1,Math.floor((v-min)/width))]++);const W=420,H=220,p=30,bw=(W-2*p)/bins,mx=Math.max(...counts);return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;margin-top:8px" role="img" aria-label="Histogram">${counts.map((c,i)=>{const h=c/mx*(H-2*p);return`<rect x="${p+i*bw+2}" y="${H-p-h}" width="${bw-4}" height="${h}" fill="#2563eb" opacity=".8"/>`}).join('')}<line x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}" stroke="#9ca3af"/><text x="${W/2}" y="${H-5}" text-anchor="middle" font-size="12">sales</text></svg>`;}

  function renderState(){
    const t=currentPack().type;
    if(t==='r'){const entries=Object.entries(state.env);el.statePanel.innerHTML=entries.length?entries.map(([k,v])=>`<div class="state-row"><div class="mono"><strong>${esc(k)}</strong></div><div class="small muted">${Array.isArray(v)?`num [1:${v.length}] ${v.join(' ')}`:v?.type==='data.frame'?`data.frame ${v.rows.length} × ${Object.keys(v.rows[0]).length}`:typeof v==='number'?`num ${v}`:esc(typeof v)}</div></div>`).join(''):'<div class="state-row small muted">No objects yet.</div>';}
    if(t==='shell'){el.prompt.textContent=shellPrompt();el.stateSubtitle.textContent=shellPathText();el.statePanel.innerHTML=`<pre class="state-row mono small">HOME\n├── Desktop\n├── Documents\n├── Downloads\n└── terminal-quest\n    ├── data\n    │   ├── survey.csv\n    │   └── products.csv\n    ├── notes\n    └── README.txt${state.shellRepos?`\n    └── repos${state.shellCloned?'\n        └── Hello-World':''}`:''}</pre>`;}
    if(t==='git'){el.workspaceSubtitle.textContent=`branch: ${state.git.branch}`;el.stateSubtitle.textContent=state.git.branch;el.statePanel.innerHTML=`<div class="state-row small"><strong>Current branch</strong><div class="mono">${state.git.branch}</div></div><div class="state-row small"><strong>Branches</strong><div class="mono">${state.git.branches.map(b=>b===state.git.branch?'* '+b:'  '+b).join('<br>')}</div></div><div class="state-row small"><strong>Staged</strong><div>${state.git.staged.join(', ')||'—'}</div></div><div class="state-row small"><strong>Modified</strong><div>${state.git.modified.join(', ')||'—'}</div></div><div class="state-row small"><strong>Commits</strong><div>${state.git.commits.length}</div></div><div class="state-row small"><strong>Merged feature?</strong><div>${state.git.merged?'✓ yes':'not yet'}</div></div>`;}
    if(t==='sql'){el.statePanel.innerHTML='<div class="state-row"><div class="mono"><strong>products</strong></div><div class="small muted">6 rows × 4 columns</div></div>'+['product TEXT','category TEXT','price NUMERIC','sales INTEGER'].map(x=>`<div class="state-row mono small">${x}</div>`).join('');}
  }
  function renderInventory(){el.inventory.innerHTML=state.unlocked.length?state.unlocked.map(x=>`<div class="inventory-item"><span class="ok">✓</span> <code>${esc(x)}</code></div>`).join(''):'<div class="small muted">Tools unlock as you progress.</div>';}

  function showHint(){const hs=asFn(currentMission().hints,state,helpers)||[];const n=state.hints[state.mission]||0;el.hintArea.innerHTML=`💡 ${hs[Math.min(n,hs.length-1)]}`;state.hints[state.mission]=n+1;}
  function showSolution(){state.hints[state.mission]=99;el.hintArea.innerHTML=`<strong>One solution:</strong><pre class="mono">${esc(asFn(currentMission().solution,state,helpers))}</pre>`;}
  function nextMission(){if(state.mission===currentPack().missions.length-1){state.complete=true;el.victory.classList.remove('hidden');el.victoryText.textContent=`You completed ${currentPack().title} with ${state.xp} XP.`;return;}state.mission++;render();el.commandInput.focus();}
  function resetMission(){el.commandInput.value='';el.feedback.textContent='';el.hintArea.textContent='';el.commandInput.disabled=false;el.runBtn.disabled=false;el.nextBtn.disabled=true;}
  function switchPack(){state=freshState(el.packSelect.value);el.consoleOutput.textContent='';el.resultPanel.classList.add('hidden');render();}
  function restartPack(){const id=state.packId,os=state.os;state=freshState(id);state.os=os;el.consoleOutput.textContent='';render();}

  window.CODE_QUEST={registerPack,start,helpers};
})();
