window.CODE_QUEST.registerPack({
  id: 'make-week3',
  type: 'make',
  title: 'Week 3: Make Quest — One Rule',
  description: 'Write one simple Make rule and preview its command with make -n.',
  setup: s => {
    s.make.files = ['build_plot.R', 'video_view.csv'];
  },
  missions: [
    {
      mode: 'reading',
      title: 'Reading: Three parts of a rule',
      difficulty: 'Prep',
      intro: 'A Make rule describes how an output is built.',
      readingTitle: 'Target, prerequisites, recipe',
      readingBody: () => '<p>A rule looks like <code>target: prerequisites</code>, followed by a recipe command on the next line. This practice workspace accepts a tab or three spaces before the recipe so it is easy to enter. Real Makefiles traditionally use a tab.</p><p><code>make -n</code> previews which commands would run without running them.</p>',
      xp: 35,
      unlock: () => ['Make rule shape', 'make -n']
    },
    {
      title: 'Write a plot rule',
      difficulty: 'Warm-up',
      intro: 'Describe how build_plot.R and the data file produce a plot.',
      task: () => 'Enter this rule structure. Start the recipe with either a tab or three spaces: <pre>plot_week3.png: build_plot.R video_view.csv\n   Rscript build_plot.R</pre>',
      concept: 'The target is the output file. The prerequisites are the inputs needed to build it.',
      hints: () => ['Put the target before the colon.', 'This simulator accepts either a tab or three spaces before the recipe.'],
      solution: () => 'plot_week3.png: build_plot.R video_view.csv\n   Rscript build_plot.R',
      check: s => Boolean(s.make.rules['plot_week3.png']?.recipe?.includes('Rscript build_plot.R')) && s.make.rules['plot_week3.png'].prerequisites.includes('video_view.csv'),
      xp: 110,
      unlock: () => ['target', 'prerequisites', 'recipe']
    },
    {
      title: 'Preview the build',
      difficulty: 'Explorer',
      intro: 'Check the planned command before asking Make to run it.',
      task: () => 'Run <code>make -n</code>. What command would Make run?',
      hints: () => ['Use <code>make -n</code>.'],
      solution: () => 'make -n',
      check: (s, r) => r.action === 'make-plan' && r.output.includes('Rscript build_plot.R'),
      xp: 100,
      unlock: () => ['dry run']
    }
  ]
});
