
import chalk from 'chalk'
import { execa } from 'execa'
import dedent from 'dedent'

const COMMITLINT_CONFIG_PATH = 'commitlint.config.cjs'

const parseCommitlintResult = (rawResult) => {
  const {
    groups: {
      input,
      issues: issuesRaw,
      problemCount: problemCountRaw,
      warningCount: warningCountRaw
    }
  } = rawResult.match(/⧗\s{3}input:\s(?<input>[\S\s]+?(?=\n✖))\n(?<issues>(?:✖\s{3}.+\n)+)\n.+?(?<problemCount>\d+).+?(?<warningCount>\d+)/)

  const issues = issuesRaw.split('\n').filter(Boolean)
  const problemCount = Number(problemCountRaw)
  const warningCount = Number(warningCountRaw)

  return {
    input,
    issues,
    problemCount,
    warningCount
  }
}

const onBadCommit = ({ stdout }) => {
  const { input, issues, problemCount, warningCount } = parseCommitlintResult(stdout)

  process.stdout.write(
    dedent`
      ${chalk.red('COMMIT ERROR: please, consider using the defined commit notation.')}

      To make all commits be up to par, you must stick to the Angular Commits Convention: ${chalk.blueBright('https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines')}.

      Just read it once. There is nothing hard about it, and your commits will be consistent and much better.

      Issues (${problemCount + warningCount}):
    `
  )

  for (const issue of issues) {
    process.stdout.write(`\n${issue}`)
  }

  process.stdout.write('\n\n')

  process.stdout.write(
    dedent`
      ### Commit start
      ${input}
      ### Commit end
    `
  )

  process.stdout.write('\n\n')

  // rejects the commit
  process.exit(1)
}

// take and check the latest commit message
await execa('pnpm', ['exec', 'commitlint', '--edit', '--config', COMMITLINT_CONFIG_PATH]).catch(onBadCommit)