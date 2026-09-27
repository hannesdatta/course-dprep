window.CODE_QUEST.registerPack({
  id: 'r-csv-inspection',
  type: 'r',
  title: 'Week 1: R Quest — Load and Inspect a CSV',
  description: 'Load a familiar CSV file and take a first look at its rows and columns.',
  setup: (s, h) => {
    s.rWorkingDirectory = '/home/student/dprep-tutorial';
    s.rDirectories = { '/home/student/dprep-tutorial': ['script.R', 'video_view.csv'] };
    s.rCsvFiles = { '/home/student/dprep-tutorial/video_view.csv': h.videoView() };
  },
  missions: [
    {
      mode: 'reading',
      title: 'Reading: Load, then inspect',
      difficulty: 'Prep',
      intro: 'A small, repeatable first look at a data file.',
      readingTitle: 'Three familiar commands',
      readingBody: () => '<p><code>read_csv("video_view.csv")</code> reads the CSV into an R data frame.</p><p><code>head(videos)</code> previews the first rows. <code>glimpse(videos)</code> gives a compact view of the column names and types.</p>',
      xp: 35,
      unlock: () => ['CSV inspection']
    },
    {
      title: 'Load the CSV',
      difficulty: 'Rookie',
      intro: 'Create an R object named videos from the tutorial CSV.',
      task: () => 'Run <code>videos &lt;- read_csv("video_view.csv")</code>.',
      hints: () => ['Use <code>read_csv()</code> on the file name, then assign the result to <code>videos</code>.'],
      solution: () => 'videos <- read_csv("video_view.csv")',
      check: s => s.env.videos?.type === 'data.frame' && s.env.videos.rows.length === 6,
      xp: 100,
      unlock: () => ['read_csv()']
    },
    {
      title: 'Preview the first rows',
      difficulty: 'Warm-up',
      intro: 'head() is a quick first look at a table.',
      task: () => 'Run <code>head(videos)</code>.',
      hints: () => ['Type <code>head(videos)</code>.'],
      solution: () => 'head(videos)',
      check: (s, r) => r.action === 'head' && r.rows.length > 0,
      xp: 90,
      unlock: () => ['head()']
    },
    {
      title: 'Check columns and types',
      difficulty: 'Explorer',
      intro: 'glimpse() gives a compact overview of the table structure.',
      task: () => 'Run <code>glimpse(videos)</code>.',
      hints: () => ['Use <code>glimpse()</code> with the data frame name.'],
      solution: () => 'glimpse(videos)',
      check: (s, r) => r.action === 'glimpse' && r.output.includes('watch_rate'),
      xp: 100,
      unlock: () => ['glimpse()']
    }
  ]
});
