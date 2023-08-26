import chalk from "chalk";
import { LOGO, version } from "../config";

// 脚手架信息
const VERSION: string = `
\r\n ${chalk.bgMagenta(` ${version} `)}
${chalk.magenta(LOGO)}
`;

// 脚手架相关提示
const PROJECT_NAME: string = `mdu`;
const PROJECT_TIPS: string = `<command> [options]`;
const HELP: string = `
\r\n终端执行 ${chalk.cyan.magentaBright(
  "mdu <command> --help"
)} 获取更多命令详情\r\n
`;

// 创建命令
const CREATE_DESC: string = chalk.magenta("创建新项目");
const CREATE_OPT_F: string = chalk.red("如有重名，直接覆盖！");

// 下载
const DOWNLOAD_BEGAIN: string = chalk.magenta.bold(`\r\n 要开始了`);
const DOWNLOAD_AGAIN: string = chalk.gray.bold(`网有点差啊，等我再来一次`);
const DOWNLOAD_FAIL: string = chalk.gray.bold(`\r\n网太差了，、待会再试试吧`);
const DOWNLOAD_SUCC: string = chalk.black.bold("下完了，快去试试，嘎嘎板正！");
const DOWNLOAD_DESCRIPTION: (name: string) => string = (name: string) => `
\r\n进入项目：${chalk.magenta("cd" + " " + name)}
\r\n${chalk.gray(
  `npm 不是很好用，建议用 ${chalk.blue("yarn")} or ${chalk.blue("pnpm：")}`
)}
\r\n${chalk.magenta("yarn")} & ${chalk.magenta("yarn dev / npm run dev")}
`;

// issue
const ISSUE_CLI: string = `脚手架有问题到这里提：${chalk.blue(
  "https://github.com/Jamartin-create/mdu-cli/issues"
)}`;
const ISSUE_TEMPLATE: (url: string) => string = (url: string) =>
  `如果模板有问题到这里提：${chalk.blue(url)}`;

type T_LOG_TYPES =
  | "VERSION"
  | "PROJECT_NAME"
  | "PROJECT_TIPS"
  | "HELP"
  | "CREATE_DESC"
  | "CREATE_OPT_F"
  | "DOWNLOAD_BEGAIN"
  | "DOWNLOAD_AGAIN"
  | "DOWNLOAD_FAIL"
  | "DOWNLOAD_SUCC"
  | "ISSUE_CLI";

type T_LOG_METHODS = "DOWNLOAD_DESCRIPTION" | "ISSUE_TEMPLATE";

type T_Log_Str = {
  [k in T_LOG_TYPES]: string;
};
type T_Log_Method = {
  [k in T_LOG_METHODS]: (str: string) => string;
};

const LogStr: T_Log_Str = {
  VERSION,
  PROJECT_NAME,
  PROJECT_TIPS,
  HELP,
  CREATE_DESC,
  CREATE_OPT_F,
  DOWNLOAD_BEGAIN,
  DOWNLOAD_AGAIN,
  DOWNLOAD_FAIL,
  DOWNLOAD_SUCC,
  ISSUE_CLI,
};

const LogMethod: T_Log_Method = {
  DOWNLOAD_DESCRIPTION,
  ISSUE_TEMPLATE,
};

// 打印日志的方法
export function log(message: string) {
  console.log(message);
}

export default {
  ...LogStr,
  ...LogMethod,
};
