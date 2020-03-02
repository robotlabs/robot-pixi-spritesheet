import { pixiPreload } from './loaders-functions'
import { onLoaderProgress } from './../utils/signals'

// import manifest from './loader-manifest'
export const loadStuff = async (manifest) => {
  //* preload pixi assets */
  await pixiPreload(window.PIXI.Loader.shared, manifest, getPartialProgress, true)
}
const getPartialProgress = (e) => {
  onLoaderProgress.dispatch(e.progress)
}
