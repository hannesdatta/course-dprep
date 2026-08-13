window.CODE_QUEST.registerPack({
  id:'r-basics', type:'r', title:'Week 1: R Quest — Basics',
  description:'Calculator, objects, vectors, mean, and indexing.',
  missions:[
    {title:'Talk to R',difficulty:'Warm-up',intro:'R can work like a calculator.',task:()=>`Ask R to calculate <strong>7 + 5</strong>.`,hints:()=>['Type the arithmetic expression.','Try <code>7 + 5</code>.'],solution:()=> '7 + 5',check:(s,r)=>r.value===12,xp:100,unlock:()=>['arithmetic']},
    {title:'Create your first object',difficulty:'Rookie',intro:'Objects store values for later use.',task:()=>`Create <strong>price</strong> and give it the value <strong>25</strong>.`,concept:'In R, <- is the conventional assignment operator.',hints:()=>['Use <code>&lt;-</code>.','Try <code>price &lt;- 25</code>.'],solution:()=> 'price <- 25',check:s=>s.env.price===25,xp:100,unlock:()=>['<- assignment']},
    {title:'Use an object',difficulty:'Rookie',intro:'Object names can be used inside later expressions.',task:()=>`Calculate <strong>price * 3</strong>.`,hints:()=>['Use the object name directly.'],solution:()=> 'price * 3',check:(s,r)=>r.value===75,xp:100,unlock:()=>['object names']},
    {title:'Build a vector',difficulty:'Explorer',intro:'c() combines values into a vector.',task:()=>`Create <strong>sales</strong> containing <strong>10, 20, 30, 40</strong>.`,hints:()=>['Use <code>c()</code>.','Try <code>sales &lt;- c(10,20,30,40)</code>.'],solution:()=> 'sales <- c(10, 20, 30, 40)',check:s=>JSON.stringify(s.env.sales)==='[10,20,30,40]',xp:100,unlock:()=>['c()']},
    {title:'Summarise a vector',difficulty:'Explorer',intro:'mean() computes an arithmetic mean.',task:()=>`Calculate the mean of <strong>sales</strong> and save it as <strong>avg_sales</strong>.`,hints:()=>['Use <code>mean(sales)</code>.'],solution:()=> 'avg_sales <- mean(sales)',check:s=>s.env.avg_sales===25,xp:100,unlock:()=>['mean()']},
    {title:'Index a vector',difficulty:'Boss',intro:'R starts indexing at 1.',task:()=>`Retrieve the <strong>third</strong> value of sales.`,hints:()=>['Use square brackets.','Try <code>sales[3]</code>.'],solution:()=> 'sales[3]',check:(s,r)=>r.value===30,xp:100,unlock:()=>['[ ] indexing']}
  ]
});
