window.CODE_QUEST.registerPack({
  id: 'r-week5-wrangling',
  type: 'r',
  title: 'Week 5: R Quest — Text and Table Shapes',
  description: 'Preview text matching, text replacement, and long-to-wide data.',
  setup: (s, h) => {
    s.env.creators = { type: 'data.frame', rows: h.creators() };
    s.env.socials = { type: 'data.frame', rows: h.socialsLong() };
  },
  missions: [
    {
      mode: 'reading',
      title: 'Reading: Find and replace text',
      difficulty: 'Prep',
      intro: 'These functions help select and clean text values.',
      readingTitle: 'grepl() finds; gsub() replaces',
      readingBody: () => '<p><code>grepl("Emma", creator_name)</code> returns TRUE/FALSE values showing which names contain “Emma”.</p><p><code>gsub(" ", "_", creator_name)</code> replaces spaces with underscores. Start with a simple pattern; regular expressions can express more specific patterns later.</p>',
      xp: 35,
      unlock: () => ['grepl()', 'gsub()']
    },
    {
      title: 'Find a creator name',
      difficulty: 'Warm-up',
      intro: 'Check which creator names contain “Emma”.',
      task: () => 'Run <code>grepl("Emma", creators$creator_name)</code>.',
      hints: () => ['Give grepl() a pattern and the character vector to search.'],
      solution: () => 'grepl("Emma", creators$creator_name)',
      check: (s, r) => Array.isArray(r.value) && r.value.filter(Boolean).length === 1 && r.value[0] === true,
      xp: 90,
      unlock: () => ['text matching']
    },
    {
      title: 'Replace spaces in names',
      difficulty: 'Rookie',
      intro: 'Use gsub() to make creator names easier to use in file names.',
      task: () => 'Replace spaces in <code>creators$creator_name</code> with underscores.',
      hints: () => ['Use <code>gsub(" ", "_", creators$creator_name)</code>.'],
      solution: () => 'gsub(" ", "_", creators$creator_name)',
      check: (s, r) => Array.isArray(r.value) && r.value[0] === 'Emma_Live' && r.value.every(x => !x.includes(' ')),
      xp: 100,
      unlock: () => ['text replacement']
    },
    {
      mode: 'reading',
      title: 'Reading: Long and wide data',
      difficulty: 'Prep',
      intro: 'A table can represent the same information in different shapes.',
      readingTitle: 'Rows versus columns',
      readingBody: () => '<p>In long data, a category such as platform appears in rows. In wide data, each platform can become its own column.</p><p><code>pivot_wider()</code> changes long data to wide data; <code>pivot_longer()</code> changes wide data to long data. Pick the shape that makes the next comparison or transformation easier.</p>',
      xp: 35,
      unlock: () => ['long and wide data']
    },
    {
      title: 'Make a wide table',
      difficulty: 'Explorer',
      intro: 'Create one row per creator, with a column for each platform.',
      task: () => 'Use <code>pivot_wider()</code> with <code>platform</code> as the new column names and <code>value</code> as their values.',
      hints: () => ['Try <code>socials %&gt;% pivot_wider(names_from = platform, values_from = value)</code>.'],
      solution: () => 'socials %>% pivot_wider(names_from = platform, values_from = value)',
      check: (s, r) => r.value?.type === 'data.frame' && r.value.rows.length === 2 && Object.hasOwn(r.value.rows[0], 'TikTok') && Object.hasOwn(r.value.rows[0], 'Instagram'),
      xp: 110,
      unlock: () => ['pivot_wider()']
    },
    {
      mode: 'reading',
      title: 'Reading: Previous and next values',
      difficulty: 'Prep',
      intro: 'One last preview of the time-series functions in this tutorial.',
      readingTitle: 'lag(), lead(), and missing values',
      readingBody: () => '<p>After sorting observations in time order, <code>lag(x)</code> looks at the previous value and <code>lead(x)</code> at the next one.</p><p>The first lag and last lead are missing because no earlier or later observation exists. Missing values need interpretation; they are not automatically zero.</p>',
      xp: 35,
      unlock: () => ['lag() and lead()']
    }
  ]
});
