import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { program } from "commander";
import { asks } from "./ask";
import { T_ProjectType, downloadTmp } from "./download";
import { LOGO } from "./config";

function main() {
  program
    .name(chalk.cyan("mdu"))
    .usage(`${chalk.yellow("<command>")} [options]`);
  program.version(
    `\r\n ${chalk.cyan.bold("0.0.1")}
        ${chalk.cyan.bold(LOGO)}`
  );
  runStart();

  program.on("--help", function () {
    console.log(
      `\r\n终端执行 ${chalk.cyan.bold(
        "mdu <command> --help"
      )} 获取更多命令详情\r\n`
    );
  });

  program.parse(process.argv);
}

function runStart() {
  program
    .command("create <project-name>")
    .description(chalk.cyan("搞个新项目"))
    .option(
      "-f, --force",
      chalk.red("哥们，选这个的意思就是遇到同名目录就强制删除了嗷！")
    )
    .action(async (projectName: string, options: any) => {
      // 获取当前工作目录
      const cwd = process.cwd();
      const targetDirectory = path.join(cwd, projectName);
      try {
        // 如果创建的新目录已存在，且不为空
        if (fs.existsSync(targetDirectory)) {
          // 还没设置强制覆盖
          if (!options.force) {
            const isOverwrite = await asks.askOverwrite();
            // 还不同意覆盖
            if (!isOverwrite) throw new Error(); // 那我还给你下个锤子
          }
          fs.remove(targetDirectory);
        }
        await cmdDownloadRepo(projectName, targetDirectory);
      } catch (e) {
        return;
      }
    });
}

// 下载
async function cmdDownloadRepo(projectName: string, targetDirectory: string) {
  console.log(chalk.red.bold(`\r\n 要开始了`));
  const projectType: T_ProjectType = await asks.askCreateType();
  await downloadTmp[projectType](projectName, targetDirectory);
}

export default main;
