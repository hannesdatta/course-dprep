window.CODE_QUEST.registerPack({
  id: 'r-ggplot',
  type: 'r',
  title: 'Week 3: R Quest — First ggplot',
  description: 'Meet the ggplot recipe: data, aesthetic mapping, and a chart type.',
  setup: (s, h) => { s.env.videos = { type: 'data.frame', rows: h.videoView() }; },
  missions: [
    {
      mode: 'reading',
      title: 'Reading: The ggplot recipe',
      difficulty: 'Prep',
      intro: 'A consistent recipe makes new plot types easier to learn.',
      readingTitle: 'Data + aes() + geom',
      readingBody: () => '<p><code>ggplot(data, aes(x, y))</code> identifies the data and maps variables to visual positions.</p><p>Add a <code>geom_*</code> layer to choose how to display the data. For example, <code>geom_point()</code> makes a scatterplot.</p>',
      xp: 35,
      unlock: () => ['ggplot recipe']
    },
    {
      title: 'Make a scatterplot',
      difficulty: 'Warm-up',
      intro: 'Compare video reach with its watch rate.',
      task: () => 'Create a scatterplot with <code>impressions_n</code> on x and <code>watch_rate</code> on y.',
      concept: 'The variables inside aes() are mapped to the axes. geom_point() chooses points as the mark.',
      hints: () => ['Start with <code>ggplot(videos, aes(impressions_n, watch_rate))</code>.', 'Add <code>+ geom_point()</code>.'],
      solution: () => 'ggplot(videos, aes(impressions_n, watch_rate)) + geom_point()',
      check: (s, r) => r.action === 'ggplot' && r.kind === 'scatter',
      xp: 110,
      unlock: () => ['ggplot()', 'aes()', 'geom_point()']
    },
    {
      title: 'Label the plot',
      difficulty: 'Rookie',
      intro: 'A clear title and axis labels help readers understand a figure.',
      task: () => 'Add <code>labs()</code> and a theme to your scatterplot.',
      hints: () => ['Keep the same data and mappings.', 'Add <code>labs(title = "Reach and watch rate", x = "Impressions", y = "Watch rate")</code> and <code>theme_minimal()</code>.'],
      solution: () => 'ggplot(videos, aes(impressions_n, watch_rate)) + geom_point() + labs(title = "Reach and watch rate", x = "Impressions", y = "Watch rate") + theme_minimal()',
      check: (s, r) => r.action === 'ggplot' && r.kind === 'scatter' && r.meta.labels && r.meta.theme,
      xp: 110,
      unlock: () => ['labs()', 'theme_minimal()']
    }
  ]
});
