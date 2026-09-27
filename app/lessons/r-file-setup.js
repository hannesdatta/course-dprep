window.CODE_QUEST.registerPack({
  id: 'r-file-setup',
  type: 'r',
  title: 'Week 1: R Quest — Project Setup',
  description: 'Check where R is looking, list files, and move into the tutorial folder.',
  setup: s => {
    s.rWorkingDirectory = '/home/student/Downloads';
    s.rDirectories = {
      '/home/student': ['Downloads', 'dprep-tutorial'],
      '/home/student/Downloads': ['notes.txt'],
      '/home/student/dprep-tutorial': ['script.R', 'video_view.csv']
    };
  },
  missions: [
    {
      title: 'Where is R looking?',
      difficulty: 'Warm-up',
      intro: 'R reads and writes files relative to its working directory.',
      task: () => 'Run <code>getwd()</code> to see R’s current folder.',
      hints: () => ['Use <code>getwd()</code>.'],
      solution: () => 'getwd()',
      check: (s, r) => r.value === '/home/student/Downloads',
      xp: 80,
      unlock: () => ['getwd()']
    },
    {
      title: 'List the files here',
      difficulty: 'Warm-up',
      intro: 'Before loading a file, check whether it is in the current folder.',
      task: () => 'Run <code>list.files()</code> and inspect the result.',
      hints: () => ['Use <code>list.files()</code>.'],
      solution: () => 'list.files()',
      check: (s, r) => r.action === 'list.files' && r.files.includes('notes.txt'),
      xp: 80,
      unlock: () => ['list.files()']
    },
    {
      title: 'Move to the tutorial folder',
      difficulty: 'Rookie',
      intro: 'Use setwd() to change the folder R works in.',
      task: () => 'Change the working directory to <code>dprep-tutorial</code>.',
      concept: 'A relative path such as ../dprep-tutorial is resolved from the current folder.',
      hints: () => ['Use <code>setwd("../dprep-tutorial")</code>.'],
      solution: () => 'setwd("../dprep-tutorial")',
      check: (s, r) => r.action === 'setwd' && s.rWorkingDirectory === '/home/student/dprep-tutorial',
      xp: 100,
      unlock: () => ['setwd()']
    },
    {
      title: 'Confirm the data file is here',
      difficulty: 'Explorer',
      intro: 'Check your location and files before trying to load the data.',
      task: () => 'Run <code>list.files()</code> and confirm you can see <code>video_view.csv</code>.',
      hints: () => ['Run <code>list.files()</code> again after changing folders.'],
      solution: () => 'list.files()',
      check: (s, r) => r.action === 'list.files' && r.files.includes('video_view.csv'),
      xp: 100,
      unlock: () => ['working-directory check']
    }
  ]
});
