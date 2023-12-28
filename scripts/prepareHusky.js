import { rimraf } from 'rimraf'
import packageMeta from '../package.json' assert { type: 'json' }

const prepareHusky = async () => {
  await cleanupHusky()
}

const cleanupHusky = async () => {
  const { husky: { root, rewrite } } = packageMeta

  if (!rewrite) return

  await rimraf(root)
}

await prepareHusky()