window.CODE_QUEST.registerPack({
  id: 'make-week5',
  type: 'make',
  title: 'Week 5: Make Quest — Follow Dependencies',
  description: 'Connect two outputs with an all target, inspect a missing prerequisite, and fix it.',
  setup: s => {
    s.make.files = ['summary.R', 'data.csv', 'report.qmd'];
  },
  missions: [
    {
      mode: 'reading',
      title: 'Reading: One target can depend on another',
      difficulty: 'Prep',
      intro: 'Make follows prerequisites to build outputs in the right order.',
      readingTitle: 'A small dependency chain',
      readingBody: () => '<p><code>all</code> can list the outputs for the whole project. A report can depend on a summary file, and the summary can depend on a script and source data.</p><p><code>make -n</code> shows the planned commands. If a prerequisite has no file and no rule, Make reports that it does not know how to create it.</p>',
      xp: 35,
      unlock: () => ['multiple targets', 'dependency errors']
    },
    {
      title: 'Write a two-output Makefile',
      difficulty: 'Rookie',
      intro: 'Build a summary CSV and an HTML report from small project inputs.',
      task: () => 'Enter these rules. Start each recipe with either a tab or three spaces:<pre>all: summary.csv report.html\nsummary.csv: summary.R data.csv\n   Rscript summary.R\nreport.html: report.qmd summary.csv\n   quarto render report.qmd</pre>',
      concept: 'The report depends on the summary, so Make plans the summary step first.',
      hints: () => ['The first target, <code>all</code>, is the default.', 'This simulator accepts a tab or three spaces before each recipe.'],
      solution: () => 'all: summary.csv report.html\nsummary.csv: summary.R data.csv\n   Rscript summary.R\nreport.html: report.qmd summary.csv\n   quarto render report.qmd',
      check: s => s.make.rules.all?.prerequisites.includes('report.html') && s.make.rules['summary.csv']?.recipe.includes('Rscript summary.R') && s.make.rules['report.html']?.prerequisites.includes('summary.csv'),
      xp: 120,
      unlock: () => ['all target']
    },
    {
      title: 'Preview the dependency order',
      difficulty: 'Explorer',
      intro: 'Use a dry run to see the plan before building anything.',
      task: () => 'Run <code>make -n</code>. The summary command should appear before the report command.',
      hints: () => ['Use <code>make -n</code> to preview the default target.'],
      solution: () => 'make -n',
      check: (s, r) => r.action === 'make-plan' && r.commands.indexOf('Rscript summary.R') >= 0 && r.commands.indexOf('Rscript summary.R') < r.commands.indexOf('quarto render report.qmd'),
      xp: 100,
      unlock: () => ['dependency order']
    },
    {
      title: 'Introduce a missing prerequisite',
      difficulty: 'Debugging',
      intro: 'A small spelling mistake can break a dependency chain.',
      task: () => 'Enter the same rules again, but misspell the report prerequisite as <code>summmary.csv</code> (three m’s).',
      hints: () => ['A prerequisite must either exist as a file or have a rule that creates it.'],
      solution: () => 'all: summary.csv report.html\nsummary.csv: summary.R data.csv\n   Rscript summary.R\nreport.html: report.qmd summmary.csv\n   quarto render report.qmd',
      check: s => s.make.rules['report.html']?.prerequisites.includes('summmary.csv'),
      xp: 90,
      unlock: () => ['broken dependency example']
    },
    {
      title: 'Read the Make error',
      difficulty: 'Debugging',
      intro: 'Use the dry run to see which dependency Make cannot build.',
      task: () => 'Run <code>make -n</code> and inspect the missing-prerequisite message.',
      hints: () => ['The misspelled file is not in the project and has no rule of its own.'],
      solution: () => 'make -n',
      check: (s, r) => r.action === 'make-error' && r.output.includes("No rule to make target 'summmary.csv'"),
      xp: 100,
      unlock: () => ['missing prerequisite diagnosis']
    },
    {
      title: 'Repair the dependency',
      difficulty: 'Builder',
      intro: 'Correct the prerequisite spelling in the Makefile.',
      task: () => 'Enter the rules again with the report depending on the correctly spelled <code>summary.csv</code>.',
      hints: () => ['Change <code>summmary.csv</code> back to <code>summary.csv</code>.'],
      solution: () => 'all: summary.csv report.html\nsummary.csv: summary.R data.csv\n   Rscript summary.R\nreport.html: report.qmd summary.csv\n   quarto render report.qmd',
      check: s => s.make.rules['report.html']?.prerequisites.includes('summary.csv') && !s.make.rules['report.html'].prerequisites.includes('summmary.csv'),
      xp: 90,
      unlock: () => ['Make dependency debugging']
    },
    {
      title: 'Preview the repaired build',
      difficulty: 'Builder',
      intro: 'Confirm the corrected graph now has a valid build plan.',
      task: () => 'Run <code>make -n</code> again and confirm both commands appear in dependency order.',
      hints: () => ['The summary should be prepared before the report is rendered.'],
      solution: () => 'make -n',
      check: (s, r) => r.action === 'make-plan' && r.commands.indexOf('Rscript summary.R') >= 0 && r.commands.indexOf('Rscript summary.R') < r.commands.indexOf('quarto render report.qmd'),
      xp: 100,
      unlock: () => ['verified dependency graph']
    }
  ]
});
