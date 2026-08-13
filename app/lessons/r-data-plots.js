window.CODE_QUEST.registerPack({
  id:'r-data', type:'r', title:'Week 3: R Quest — Data & Plots',
  description:'Inspect a data frame, summarize columns, and create simple plots.',
  setup:(s,h)=>{s.env.products={type:'data.frame',rows:h.products()};},
  missions:[
    {title:'Inspect a data frame',difficulty:'Warm-up',intro:'The products data frame is already loaded.',task:()=>`Run <strong>head(products)</strong>.`,hints:()=>['Use <code>head()</code>.'],solution:()=> 'head(products)',check:(s,r)=>r.action==='head',xp:100,unlock:()=>['head()']},
    {title:'How many rows?',difficulty:'Explorer',intro:'nrow() returns the number of observations.',task:()=>`Find the number of rows in products.`,hints:()=>['Use <code>nrow(products)</code>.'],solution:()=> 'nrow(products)',check:(s,r)=>r.value===6,xp:100,unlock:()=>['nrow()']},
    {title:'Extract a column',difficulty:'Explorer',intro:'The $ operator selects a column from a data frame.',task:()=>`Retrieve the <strong>price</strong> column.`,hints:()=>['Use <code>products$price</code>.'],solution:()=> 'products$price',check:(s,r)=>Array.isArray(r.value)&&r.value.join(',')==='4,3,6,8,5,2',xp:100,unlock:()=>['$ column']},
    {title:'Average price',difficulty:'Analyst',intro:'Functions can operate directly on selected columns.',task:()=>`Calculate the mean product price and store it as <strong>avg_price</strong>.`,hints:()=>['Combine <code>mean()</code> with <code>products$price</code>.'],solution:()=> 'avg_price <- mean(products$price)',check:s=>Math.abs(s.env.avg_price-4.6666667)<.001,xp:100,unlock:()=>['mean()']},
    {title:'Make your first plot',difficulty:'Visualizer',intro:'plot() creates a quick graph of two variables.',task:()=>`Plot <strong>price</strong> against <strong>sales</strong> using <code>plot(products$price, products$sales)</code>.`,concept:'This prototype draws plots in the browser. The engine can later be upgraded to webR for genuine R graphics.',hints:()=>['Use <code>plot(x, y)</code>.'],solution:()=> 'plot(products$price, products$sales)',check:(s,r)=>r.action==='plot',xp:120,unlock:()=>['plot()']},
    {title:'Histogram Boss',difficulty:'Boss',intro:'hist() shows the distribution of one numeric variable.',task:()=>`Create a histogram of <strong>sales</strong>.`,hints:()=>['Use <code>hist(products$sales)</code>.'],solution:()=> 'hist(products$sales)',check:(s,r)=>r.action==='hist',xp:120,unlock:()=>['hist()']}
  ]
});
