window.CODE_QUEST.registerPack({
  id: 'sql-week5',
  type: 'sql',
  title: 'Week 5: SQL Quest — SQLite Retrieval Preview',
  description: 'Practice retrieving selected rows from a small mock database table.',
  setup: s => {
    s.sqlTables = {
      watch_logs: [
        { user_id: 101, video_id: 'v1', watch_seconds: 30 },
        { user_id: 101, video_id: 'v2', watch_seconds: 22 },
        { user_id: 102, video_id: 'v3', watch_seconds: 0 },
        { user_id: 103, video_id: 'v4', watch_seconds: 27 },
        { user_id: 101, video_id: 'v5', watch_seconds: 0 }
      ]
    };
  },
  missions: [
    {
      mode: 'reading',
      title: 'Reading: SQL can retrieve data for R',
      difficulty: 'Prep',
      intro: 'SQL can select a useful subset before the rest of an R workflow.',
      readingTitle: 'Connect, query, export',
      readingBody: () => '<p>An R workflow can connect to a SQLite database, send a SQL query with <code>dbGetQuery()</code>, then save the result with <code>write_csv()</code>.</p><p>The SQL still follows the familiar pattern: select columns from a table and use <code>WHERE</code> to choose rows.</p>',
      xp: 35,
      unlock: () => ['SQLite retrieval']
    },
    {
      title: 'Retrieve one user’s rows',
      difficulty: 'Warm-up',
      intro: 'Select all watch log columns for user 101.',
      task: () => 'Query <code>watch_logs</code> with a <code>WHERE</code> condition for <code>user_id = 101</code>.',
      hints: () => ['Use <code>SELECT * FROM watch_logs WHERE user_id = 101;</code>.'],
      solution: () => 'SELECT * FROM watch_logs WHERE user_id = 101;',
      check: (s, r) => r.rows?.length === 3 && r.rows.every(row => row.user_id === 101),
      xp: 100,
      unlock: () => ['SQLite SELECT', 'WHERE']
    }
  ]
});
