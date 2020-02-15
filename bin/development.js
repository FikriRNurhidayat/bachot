const runAll = require('npm-run-all')

runAll(
  [
    'serve',
    'server',
  ],
  {
    parallel: true,
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    silent: true,
  }
)
