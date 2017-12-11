export interface Target {
  demo: string
  real: string
  [key: string]: any
}
export interface Config {
  source: string,
  target: Target,
  include: string[],
  exclude: string[]
}