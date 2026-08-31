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
  function isReadingMission(m){ return m?.mode==='reading'; }
  function readingXp(m){
    const configured = Number(m?.readingXp ?? m?.xp);
    return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : 40;
  }

  function freshState(packId){
    const s={packId,mission:0,xp:0,hints:{},unlocked:[],readRewards:{},lastResult:null,complete:false,os:'mac',shellPath:[],shellRepos:false,shellCloned:false,env:{},markdownDoc:'',git:{branch:'main',branches:['main'],staged:[],modified:['analysis.R'],commits:[],merged:false,cloned:false,remote:'origin',remoteBehind:true,pushed:false}};
    const p=packs[packId]; if(p.setup) p.setup(s, helpers); return s;
  }

  const helpers = { products: () => products.map(x=>({...x})) };

  function start(){
    el=Object.fromEntries(['questName','missionNum','missionTotal','xp','rank','packSelect','packControls','packDescription','missionBadge','difficulty','missionTitle','missionIntro','taskBox','conceptBox','conceptText','readingBox','readingTitle','readingText','hintBtn','solutionBtn','hintArea','workspaceTitle','workspaceSubtitle','consoleOutput','prompt','commandInput','runBtn','resultPanel','feedback','clearBtn','resetMissionBtn','nextBtn','stateTitle','stateSubtitle','statePanel','inventory','victory','victoryText','restartBtn','instructorView'].map(id=>[id,document.getElementById(id)]));
    Object.values(packs).forEach(p=>{ const o=document.createElement('option'); o.value=p.id; o.textContent=p.title; el.packSelect.appendChild(o); });
    const first=Object.keys(packs)[0]; if(!first) throw new Error('No lesson packs registered.');
    state=freshState(first);
    bind();
    const cfg=window.CODE_QUEST_CONFIG||{}; el.instructorView.classList.toggle('hidden', cfg.showInstructorView === false);
    render();
  }

  function bind(){
    el.runBtn.addEventListener('click',run);
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
    el.packSelect.value=p.id; el.questName.textContent=p.title.replace(' Quest',''); el.missionNum.textContent=state.mission+1; el.missionTotal.textContent=p.missions.length; el.xp.textContent=state.xp; el.rank.textContent=rank(state.xp);
    el.packDescription.textContent=p.description||''; el.missionBadge.textContent=`MISSION ${state.mission+1}`; el.difficulty.textContent=m.difficulty||''; el.missionTitle.textContent=m.title; el.missionIntro.textContent=m.intro||'';
    if(reading){
      el.taskBox.classList.add('hidden');
      el.conceptBox.classList.add('hidden');
      el.readingBox.classList.remove('hidden');
      el.readingTitle.textContent=asFn(m.readingTitle,state,helpers)||'Reading pane';
      el.readingText.innerHTML=asFn(m.readingBody,state,helpers)||'';
    } else {
      el.taskBox.classList.remove('hidden');
      el.taskBox.innerHTML=`<strong>Your task:</strong> ${asFn(m.task,state,helpers)}`;
      el.readingBox.classList.add('hidden');
      if(m.concept){el.conceptBox.classList.remove('hidden');el.conceptText.textContent=asFn(m.concept,state,helpers);} else el.conceptBox.classList.add('hidden');
    }
    el.hintArea.textContent=''; el.feedback.textContent=''; el.resultPanel.classList.add('hidden'); el.victory.classList.add('hidden');
    el.hintBtn.classList.toggle('hidden', reading); el.solutionBtn.classList.toggle('hidden', reading); el.hintArea.classList.toggle('hidden', reading);
    el.nextBtn.disabled=!reading; el.commandInput.disabled=reading; el.runBtn.disabled=reading;
    if(reading){el.feedback.innerHTML=`<span class="small muted">Read this pane, then continue. You will earn +${readingXp(m)} XP when you click Next mission.</span>`;}
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
    if(t==='sql'){el.workspaceTitle.textContent='SQL Console';el.workspaceSubtitle.textContent='products database';el.prompt.textContent='SQL>';el.stateTitle.textContent='Database';el.stateSubtitle.textContent='products';}
    if(t==='markdown'){el.workspaceTitle.textContent='Markdown Editor';el.workspaceSubtitle.textContent='README.md mock workspace';el.prompt.textContent='MD>';el.stateTitle.textContent='Document';el.stateSubtitle.textContent='README.md';el.commandInput.placeholder='Write Markdown content here...';el.commandInput.rows=10;el.commandInput.value=state.markdownDoc;}
  }

  function welcomeText(){ const t=currentPack().type; if(t==='r')return'R version 4.x.x (mock)\nReady.'; if(t==='shell')return`Welcome.\nCurrent directory: ${shellPathText()}`; if(t==='git')return'Initialized teaching repository.\nOn branch main'; if(t==='markdown')return'README.md opened in the editor.\nPress Enter for new lines; click Run (or Cmd/Ctrl+Enter) to check and preview.'; return'Database connected.\nTable available: products'; }
  function shellPathText(){ if(state.os==='mac')return state.shellPath.length?'~/'+state.shellPath.join('/'):'~'; return state.shellPath.length?'C:\\Users\\student\\'+state.shellPath.join('\\'):'C:\\Users\\student'; }
  function shellPrompt(){ return state.os==='mac'?`student@laptop ${shellPathText()} %`:`${shellPathText()}>`; }

  function run(){
    if(isReadingMission(currentMission())) return;
    const t=currentPack().type;
    const raw=el.commandInput.value;
    const code=t==='markdown'?raw:raw.trim();
    if(!code.trim())return; let result;
    try{ result=execute(code); state.lastResult=result; appendConsole(code,result); }
    catch(e){ appendConsole(code,{error:e.message}); el.feedback.textContent='That produced an error. Read it carefully and try again.'; el.commandInput.value=''; renderState(); return; }
    if(t!=='markdown')el.commandInput.value='';
    showResult(result); renderState();
    let solved=false; try{solved=!!currentMission().check(state,result,code,helpers);}catch(e){}
    if(solved){ const reward=state.hints[state.mission]?Math.max(40,currentMission().xp-20):currentMission().xp; state.xp+=reward; (asFn(currentMission().unlock,state,helpers)||[]).forEach(x=>{if(!state.unlocked.includes(x))state.unlocked.push(x)}); el.feedback.innerHTML=`<span class="ok">✓ Mission solved! +${reward} XP</span>`; el.nextBtn.disabled=false; el.commandInput.disabled=true; el.runBtn.disabled=true; el.xp.textContent=state.xp; el.rank.textContent=rank(state.xp); renderInventory(); }
    else el.feedback.textContent='The command ran, but the mission is not solved yet.';
  }

  function execute(code){ const t=currentPack().type; if(t==='shell')return execShell(code); if(t==='r')return execR(code); if(t==='git')return execGit(code); if(t==='markdown')return execMarkdown(code); return execSQL(code); }
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

  function execR(code){ const c=code.trim(); let m=c.match(/^([A-Za-z.][\w.]*)\s*(?:<-|=)\s*(.+)$/); if(m){const value=rEval(m[2]);state.env[m[1]]=value;return{action:'assign',value,output:''};} const value=rEval(c); if(value&&value.__action)return value; return{action:'eval',value,output:rFormat(value)}; }
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
    if(/^['"].*['"]$/.test(s))return s.slice(1,-1);
    if(s==='TRUE')return true;
    if(s==='FALSE')return false;
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
    if(fn==='head'){ const df=ensureDf(firstArg()); return {__action:true,action:'head',rows:df.rows.slice(0,6),table:df.rows.slice(0,6),output:''}; }
    if(fn==='nrow'){ const df=ensureDf(firstArg()); return df.rows.length; }
    if(fn==='mean'){ const v=piped!==undefined?piped:rEval(args[0]||''); if(!Array.isArray(v)) throw new Error('argument is not numeric'); return v.reduce((a,b)=>a+b,0)/v.length; }
    if(fn==='length'){ const v=piped!==undefined?piped:rEval(args[0]||''); return Array.isArray(v)?v.length:1; }
    if(fn==='plot'){ const x=piped!==undefined?piped:rEval(args[0]||''); const y=rEval(args[piped!==undefined?0:1]||''); if(!Array.isArray(x)||!Array.isArray(y)) throw new Error('plot requires vectors'); return {__action:true,action:'plot',x,y,output:'Plot created.'}; }
    if(fn==='hist'){ const x=piped!==undefined?piped:rEval(args[0]||''); if(!Array.isArray(x)) throw new Error('hist requires a numeric vector'); return {__action:true,action:'hist',x,output:'Histogram created.'}; }

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
    if(r.action==='markdown'){el.resultPanel.classList.remove('hidden');el.resultPanel.innerHTML='<strong class="small">Preview</strong><div class="reading-pane" style="margin-top:8px">'+r.html+'</div>';}
  }
  function renderTable(rows,target){ if(!rows.length){target.textContent='0 rows';return;}const cols=Object.keys(rows[0]);target.innerHTML=`<table><thead><tr>${cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${cols.map(c=>`<td>${esc(r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }
  function scatterSvg(x,y){const W=420,H=240,p=32,xmin=Math.min(...x),xmax=Math.max(...x),ymin=Math.min(...y),ymax=Math.max(...y),sx=v=>p+(v-xmin)/(xmax-xmin||1)*(W-2*p),sy=v=>H-p-(v-ymin)/(ymax-ymin||1)*(H-2*p);return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;margin-top:8px" role="img" aria-label="Scatter plot"><line x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}" stroke="#9ca3af"/><line x1="${p}" y1="${p}" x2="${p}" y2="${H-p}" stroke="#9ca3af"/>${x.map((v,i)=>`<circle cx="${sx(v)}" cy="${sy(y[i])}" r="5" fill="#2563eb"/>`).join('')}<text x="${W/2}" y="${H-5}" text-anchor="middle" font-size="12">price</text><text x="12" y="${H/2}" text-anchor="middle" font-size="12" transform="rotate(-90 12 ${H/2})">sales</text></svg>`;}
  function histSvg(x){const min=Math.min(...x),max=Math.max(...x),bins=4,width=(max-min)/bins||1,counts=Array(bins).fill(0);x.forEach(v=>counts[Math.min(bins-1,Math.floor((v-min)/width))]++);const W=420,H=220,p=30,bw=(W-2*p)/bins,mx=Math.max(...counts);return`<svg viewBox="0 0 ${W} ${H}" style="width:100%;margin-top:8px" role="img" aria-label="Histogram">${counts.map((c,i)=>{const h=c/mx*(H-2*p);return`<rect x="${p+i*bw+2}" y="${H-p-h}" width="${bw-4}" height="${h}" fill="#2563eb" opacity=".8"/>`}).join('')}<line x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}" stroke="#9ca3af"/><text x="${W/2}" y="${H-5}" text-anchor="middle" font-size="12">sales</text></svg>`;}

  function renderState(){
    const t=currentPack().type;
    if(t==='r'){const entries=Object.entries(state.env);el.statePanel.innerHTML=entries.length?entries.map(([k,v])=>`<div class="state-row"><div class="mono"><strong>${esc(k)}</strong></div><div class="small muted">${Array.isArray(v)?`num [1:${v.length}] ${v.join(' ')}`:v?.type==='data.frame'?`data.frame ${v.rows.length} × ${Object.keys(v.rows[0]).length}`:typeof v==='number'?`num ${v}`:esc(typeof v)}</div></div>`).join(''):'<div class="state-row small muted">No objects yet.</div>';}
    if(t==='shell'){el.prompt.textContent=shellPrompt();el.stateSubtitle.textContent=shellPathText();el.statePanel.innerHTML=`<pre class="state-row mono small">HOME\n├── Desktop\n├── Documents\n├── Downloads\n└── terminal-quest\n    ├── data\n    │   ├── survey.csv\n    │   └── products.csv\n    ├── notes\n    └── README.txt${state.shellRepos?`\n    └── repos${state.shellCloned?'\n        └── Hello-World':''}`:''}</pre>`;}
    if(t==='git'){el.workspaceSubtitle.textContent=`branch: ${state.git.branch}`;el.stateSubtitle.textContent=state.git.branch;el.statePanel.innerHTML=`<div class="state-row small"><strong>Current branch</strong><div class="mono">${state.git.branch}</div></div><div class="state-row small"><strong>Branches</strong><div class="mono">${state.git.branches.map(b=>b===state.git.branch?'* '+b:'  '+b).join('<br>')}</div></div><div class="state-row small"><strong>Staged</strong><div>${state.git.staged.join(', ')||'—'}</div></div><div class="state-row small"><strong>Modified</strong><div>${state.git.modified.join(', ')||'—'}</div></div><div class="state-row small"><strong>Remote</strong><div>${state.git.remote} (${state.git.remoteBehind?'behind':'up to date'})</div></div><div class="state-row small"><strong>Commits</strong><div>${state.git.commits.length}</div></div><div class="state-row small"><strong>Merged feature?</strong><div>${state.git.merged?'✓ yes':'not yet'}</div></div><div class="state-row small"><strong>Pushed to remote?</strong><div>${state.git.pushed?'✓ yes':'not yet'}</div></div>`;}
    if(t==='sql'){el.statePanel.innerHTML='<div class="state-row"><div class="mono"><strong>products</strong></div><div class="small muted">6 rows × 4 columns</div></div>'+['product TEXT','category TEXT','price NUMERIC','sales INTEGER'].map(x=>`<div class="state-row mono small">${x}</div>`).join('');}
    if(t==='markdown'){const lines=state.markdownDoc?state.markdownDoc.split(/\r\n?|\n/).length:0;const chars=state.markdownDoc.length;el.statePanel.innerHTML=`<div class="state-row small"><strong>File</strong><div class="mono">README.md</div></div><div class="state-row small"><strong>Lines</strong><div>${lines}</div></div><div class="state-row small"><strong>Characters</strong><div>${chars}</div></div>`;}
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
