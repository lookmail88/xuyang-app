import { getConfig } from './config'

export const API = {
  get health() { return `${getConfig().API_BASE_URL}/health` },
  get argoApps() { return `${getConfig().API_BASE_URL}/argo/apps` },
  get version() { return `${getConfig().API_BASE_URL}/version` },
}
