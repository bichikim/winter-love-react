/**
 *
 * @author Bichi Kim <bichi@live.co.kr>
 */
declare namespace NodeJS {

  interface ProcessEnv {
    NODE_ENV: string
    DEV: boolean

    // project version
    VERSION: string
  }
}

