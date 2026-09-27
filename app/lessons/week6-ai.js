function week6Choice(title, intro, question, choices, scenario = '') {
  return {
    mode: 'choice',
    title,
    difficulty: 'Choose and reflect',
    intro,
    question,
    scenario,
    choices,
    xp: 80,
    unlock: () => ['Week 6 review']
  };
}

window.CODE_QUEST.registerPack({
  id: 'week6-prompting',
  type: 'markdown',
  title: 'Week 6: Prompting Quest',
  description: 'Practice prompting decisions with a small video-analysis case and plausible AI responses.',
  workspace: { title: 'Prompting Case', subtitle: 'Read the scenario and choose an option', stateTitle: 'Case review', stateSubtitle: 'Prompting' },
  welcomeText: 'Prompting case ready. Read the scenario and click the best option.',
  missions: [
    {
      mode: 'reading',
      title: 'Case file: Video performance',
      difficulty: 'Prep',
      intro: 'Use the same small analysis case throughout this quest.',
      readingTitle: 'What the analyst knows',
      readingBody: () => '<p>The file is <code>video_view.csv</code>. Each row represents one video. The data includes <code>creator_id</code>, <code>impressions_n</code> (reach), and <code>watch_rate</code> (the share of impressions watched).</p><p>A teammate asks an LLM: “Make a useful plot.” The model cannot infer your question or analysis choices from that sentence alone.</p>',
      xp: 35,
      unlock: () => ['prompting case']
    },
    week6Choice(
      'Choose what to add to the prompt',
      'A useful prompt makes the task and data context concrete.',
      'Before asking for plot code, which addition would most improve the request?',
      [
        { text: 'Ask for a polished chart with clear labels, while leaving the variables and comparison up to the model.', feedback: 'Polish helps later, but the request still leaves the analysis question and variables unspecified.' },
        { text: 'State that each row is a video, define reach and watch_rate, and request a scatterplot of those measures.', correct: true, feedback: 'This supplies the unit of analysis, variable meanings, and intended comparison so the model can use the right data.' },
        { text: 'Request a creator summary of average watch rate, without explaining how that relates to the question.', feedback: 'This names an operation, but does not establish that a creator summary answers the plotting question.' },
        { text: 'List the available columns, but let the model decide which variables and chart answer the question.', feedback: 'The model needs context and a research goal; a column list alone still delegates those decisions.' }
      ],
      'Teammate prompt: “Make a useful plot.”\nAvailable columns: creator_id, impressions_n, watch_rate'
    ),
    week6Choice(
      'Decide what “best creator” means',
      'A model should not silently choose the success metric.',
      'The analysis goal is engagement, but a draft response ranks creators by total impressions. What should the analyst do?',
      [
        { text: 'Rank creators by total impressions because it is a clear, available measure of success across videos.', feedback: 'Total impressions measure reach, not necessarily engagement; the measure should match the stated goal.' },
        { text: 'Ask the model to compare reach and engagement, then choose whichever ranking looks strongest.', feedback: 'This still asks the model to choose the success criterion; the analyst should define it.' },
        { text: 'Use average watch_rate for engagement, without considering missing data or low impression counts.', feedback: 'Average watch_rate may be relevant, but the data rules and any low-reach concern remain unspecified.' },
        { text: 'Define engagement and its data rules yourself, then ask the model to implement the chosen measure.', correct: true, feedback: 'The analyst defines the operational measure and relevant data rules; the model can help implement them.' }
      ],
      'Analysis goal: compare creator engagement.\nAI draft: “Creator 17 is best because it has the most total impressions.”'
    ),
    week6Choice(
      'Respond to an invented variable',
      'A fluent answer can still make assumptions that do not fit the data.',
      'The model returns code using engagement_score, but that column is not in the case file. What is the best next step?',
      [
        { text: 'Share the column names and meanings, request a correction, then run and inspect the revised code.', correct: true, feedback: 'Give the model relevant evidence, request a focused revision, and verify the result yourself.' },
        { text: 'Ask the model to check whether engagement_score is plausible before reusing its current code.', feedback: 'A model’s confirmation does not establish that the variable exists in the dataset.' },
        { text: 'Replace engagement_score with watch_rate without checking that it fits the analysis goal.', feedback: 'A real column is not automatically an appropriate measure for the question.' },
        { text: 'Regenerate the code with the same prompt and hope it chooses a column from the file this time.', feedback: 'Repeating the vague request does not give the model evidence about the actual schema.' }
      ],
      'AI draft:\ncreator_summary <- videos %>%\n  group_by(creator_id) %>%\n  summarize(avg_engagement = mean(engagement_score))'
    ),
    week6Choice(
      'Specify a missing-value rule',
      'Data-handling decisions affect what a result means.',
      'Some rows have missing watch_rate values. What belongs in the prompt?',
      [
        { text: 'Drop rows with missing rates and leave that choice out of the prompt and final report.', feedback: 'Dropping rows may be reasonable in some cases, but the rule and its effect should be explicit.' },
        { text: 'Replace missing watch_rate values with zero and briefly describe that choice in the output.', feedback: 'Zero means no watch rate; a missing value may mean something else, so this needs justification.' },
        { text: 'State a missing-value rule and ask to inspect how that choice affects the final output.', correct: true, feedback: 'The analyst specifies the data rule; checking the resulting rows or plot helps confirm what the code did.' },
        { text: 'Leave missing rates untouched and ask the model to explain the plot without checking them.', feedback: 'Unexamined missingness can affect which observations appear in the plot and how it is interpreted.' }
      ],
      'Sample watch_rate values: 0.61, NA, 0.42, NA'
    ),
    {
      mode: 'reading',
      title: 'Prompting takeaway',
      difficulty: 'Recap',
      intro: 'Carry a checkable prompt into the tutorial.',
      readingTitle: 'Specify, then verify',
      readingBody: () => '<p>State the goal, data context, constraints, requested output, and checks. Keep metric and data-handling decisions with the analyst. When a response misses the mark, give the model actual evidence and verify the revision.</p>',
      xp: 35,
      unlock: () => ['prompt and verify']
    }
  ]
});

window.CODE_QUEST.registerPack({
  id: 'week6-agents',
  type: 'markdown',
  title: 'Week 6: Agent Quest',
  description: 'Practice agent-workflow decisions with a scoped project case and simulated tool plans.',
  workspace: { title: 'Agent Case', subtitle: 'Read the scenario and choose an option', stateTitle: 'Case review', stateSubtitle: 'Agent workflow' },
  welcomeText: 'Agent case ready. Read the scenario and click the best option.',
  missions: [
    {
      mode: 'reading',
      title: 'Case file: Export two database views',
      difficulty: 'Prep',
      intro: 'An agent is asked to create a small R script for a starter project.',
      readingTitle: 'What the task requires',
      readingBody: () => '<p>The project contains <code>data/tiktok_students.sqlite</code>. Create <code>src/export_table.R</code> to export specified columns from <code>video_view</code> and <code>creators</code>.</p><p>The agent may inspect the schema and run the script. It should not change the database, edit unrelated files, or install packages. The analyst will check output columns, row counts, and identifier uniqueness.</p>',
      xp: 35,
      unlock: () => ['agent case']
    },
    week6Choice(
      'Choose the right helper',
      'Choose a tool based on whether the next step is already known.',
      'The helper needs to inspect project files, run an R script, and revise it after seeing the output. Which fits best?',
      [
        { text: 'Use chat to discuss the task, then paste file contents and errors into each follow-up.', feedback: 'Chat can help explain code, but this task depends on repeated file inspection and test results.' },
        { text: 'Use a fixed pipeline even though the schema and exact processing steps are not yet known.', feedback: 'A pipeline fits known steps that need repeatable execution, not an exploratory task.' },
        { text: 'Use a coding agent limited to project files and commands needed to inspect, test, and revise.', correct: true, feedback: 'An agent fits a task whose next step depends on what it discovers in files or from a test run.' },
        { text: 'Write one shell command to export the tables, assuming their schema and fields are already known.', feedback: 'This skips the required inspection and cannot adapt to findings from the project or test run.' }
      ]
    ),
    week6Choice(
      'Narrow an over-scoped plan',
      'A plan should match the task and the boundaries you set.',
      'The agent proposes Docker, CI, new packages, and a rewritten project to export two tables. What is the best response?',
      [
        { text: 'Restate both exports, limit edits to the named script, and ask for a smaller plan with existing tools.', correct: true, feedback: 'A bounded task keeps the agent focused on the requested work and makes its changes reviewable.' },
        { text: 'Approve the plan because containers and CI should make this small export workflow more reliable.', feedback: 'Those additions are not required for the stated task and make the result harder to review.' },
        { text: 'Give the agent access to all project files and tools so it can address any issue it discovers.', feedback: 'This expands permissions instead of narrowing the plan to the requested exports.' },
        { text: 'Replace the existing database and scripts with a CSV workflow before deciding what to change.', feedback: 'That changes the data source and project rather than implementing the specified task.' }
      ],
      'Agent plan:\n1. Add Docker and CI.\n2. Install a new database package.\n3. Rewrite the project scripts.\n4. Export two requested tables.'
    ),
    week6Choice(
      'Decide what the agent should do first',
      'A plan gives you a chance to catch assumptions before edits happen.',
      'The agent has not yet checked whether the requested tables and columns exist. What should happen before it writes code?',
      [
        { text: 'Start the script with likely column names, then correct them if the first run fails.', feedback: 'This builds on guesses about the schema that could be checked before editing.' },
        { text: 'Install another database browser, then explore the schema before making any plan.', feedback: 'Schema inspection matters, but adding software is not needed for this bounded first step.' },
        { text: 'Ask the agent to write and run the export script immediately, then review its output.', feedback: 'This skips schema verification and approval of the proposed changes.' },
        { text: 'Have it inspect the schema, propose a bounded plan, and wait for approval before editing.', correct: true, feedback: 'Inspecting first surfaces missing tables or columns; reviewing the plan keeps the task within scope.' }
      ]
    ),
    week6Choice(
      'Verify the export',
      'A successful run does not prove that the script exported the right data.',
      'The script created both CSV files without an error. What is the strongest next check?',
      [
        { text: 'Check that the files exist and the script exited successfully, then accept the agent’s report.', feedback: 'A clean run and created files do not confirm the required contents.' },
        { text: 'Compare exported columns and row counts with the specification, and verify identifier uniqueness.', correct: true, feedback: 'These checks compare the actual outputs with the requirements rather than relying only on a successful run.' },
        { text: 'Ask the agent to confirm the requested tables and fields appear in the exports before accepting them.', feedback: 'The agent’s report is not independent evidence that the files meet the specification.' },
        { text: 'Rerun the export and treat a second successful run as evidence that the files are correct.', feedback: 'Repeating a successful run still does not check whether the output contents are correct.' }
      ],
      'Agent report: “Export completed successfully.”\nRequested video_view columns: video_id, creator_id, impressions_n, watch_rate\nExpected rows: 50,000'
    ),
    {
      mode: 'reading',
      title: 'Agent takeaway',
      difficulty: 'Recap',
      intro: 'Treat agent output as a draft supported by actions and evidence.',
      readingTitle: 'Plan, bound, observe, verify',
      readingBody: () => '<p>Choose an agent when the task depends on file inspection or test results. Set file and command boundaries, review its plan and edits, and independently check outputs against the task specification.</p>',
      xp: 35,
      unlock: () => ['agent verification']
    }
  ]
});
