import path from "path";
import fs from "fs-extra";
import { program } from "commander";
import { asks } from "../utils/ask";
import Log, { log } from "../plugin/log";
import { T_ProjectType, downloadTmp } from "../plugin/download";

// 创建
async function create(projectName: string, options: any) {
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
        if (!isOverwrite) throw new Error();
      }
      fs.remove(targetDirectory);
    }
    log(Log.DOWNLOAD_BEGAIN); // 开始
    const projectType: T_ProjectType = await asks.askCreateType();
    await downloadTmp[projectType](projectName, targetDirectory);
  } catch (e) {
    return;
  }
}

export default function () {
  program
    .command("create <project-name>")
    .description(Log.CREATE_DESC)
    .option("-f, --force", Log.CREATE_OPT_F)
    .action(create);
}
