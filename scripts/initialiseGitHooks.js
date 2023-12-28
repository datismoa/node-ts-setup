import path from 'node:path'
import { execa } from 'execa'
import packageMeta from '../package.json' assert { type: 'json' }

const initialiseHooks = async () => {
  const { husky: { hooks } } = packageMeta

  const hookInitialisers = []
  
  for (const [hookName, hookAction] of Object.entries(hooks)) {
    hookInitialisers.push(initialiseHook(hookName, hookAction))
  }

  await Promise.all(hookInitialisers)
}

const initialiseHook = async (hookName, hookAction) => {
  await execa(
    'pnpm',
    [
      'exec',
      'husky',
      'add',
      getHookPath(hookName),
      hookAction
    ]
  )
}

const getHookPath = hookName => {
  return path.join(packageMeta.husky.root, hookName)
}

await initialiseHooks()