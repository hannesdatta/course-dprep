window.CODE_QUEST.registerPack({
  id: 'r-joins',
  type: 'r',
  title: 'Week 4: R Quest — Join Two Tables',
  description: 'Match rows on a key and compare left_join() with inner_join().',
  setup: (s, h) => {
    s.env.impressions = { type: 'data.frame', rows: h.impressions() };
    s.env.watch_events = { type: 'data.frame', rows: h.watchEvents() };
  },
  missions: [
    {
      mode: 'reading',
      title: 'Reading: Keys connect tables',
      difficulty: 'Prep',
      intro: 'A join adds information from another table using matching key values.',
      readingTitle: 'Left join keeps the left table',
      readingBody: () => '<p>Here, <code>impression_id</code> is the key in both tables.</p><p><code>left_join(x, y, by = "impression_id")</code> keeps every row in <code>x</code> and adds matching columns from <code>y</code>. Rows without a match get missing values for the added columns.</p><p><code>inner_join()</code> keeps only rows that match in both tables. Comparing row counts is a useful check.</p>',
      xp: 35,
      unlock: () => ['join key', 'left_join()']
    },
    {
      title: 'Keep every impression',
      difficulty: 'Warm-up',
      intro: 'Add watch-event details while keeping all impressions.',
      task: () => 'Join <code>impressions</code> to <code>watch_events</code> by <code>impression_id</code> using <code>left_join()</code>.',
      hints: () => ['Start with <code>impressions %&gt;%</code>.', 'Use <code>left_join(watch_events, by = "impression_id")</code>.'],
      solution: () => 'impressions %>% left_join(watch_events, by = "impression_id")',
      check: (s, r) => r.value?.type === 'data.frame' && r.value.rows.length === 8 && r.value.rows.every(row => Object.hasOwn(row, 'action')),
      xp: 110,
      unlock: () => ['left_join()']
    },
    {
      title: 'Keep only matched impressions',
      difficulty: 'Explorer',
      intro: 'Now keep only impressions that have a matching watch event.',
      task: () => 'Repeat the join with <code>inner_join()</code>. Compare its row count with the left join.',
      hints: () => ['Change only the join verb to <code>inner_join()</code>.'],
      solution: () => 'impressions %>% inner_join(watch_events, by = "impression_id")',
      check: (s, r) => r.value?.type === 'data.frame' && r.value.rows.length === 5,
      xp: 110,
      unlock: () => ['inner_join()']
    }
  ]
});
