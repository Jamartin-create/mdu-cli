import ora from "ora";
import chalk from "chalk";

export type LoadingTypeOptions = {
  projectName: string;
};

// 睡眠
function sleep(delay: number): Promise<boolean> {
  return new Promise((reso) => {
    setTimeout(() => {
      reso(false);
    }, delay);
  });
}

// 执行 loading 动画
export async function doLoading(
  message: string,
  cb: () => any,
  options: LoadingTypeOptions
): Promise<any> {
  const loading = ora(message);
  loading.start();
  try {
    const cbRet = await cb();
    loading.succeed(
      `
      ${chalk.black.bold("下载成功！执行以下命令打开并运行项目:")}
      \r\n  ${chalk.gray.bold(`cd ${options?.projectName}`)}
      \r\n  ${chalk.gray.bold("npm install")}
      \r\n  ${chalk.gray.bold("npm run dev")}
      \r\n  ${chalk.gray.bold("问题、意见、建议请反馈至：")}
      `
    );
    return cbRet;
  } catch (e) {
    loading.fail("下载失败了，先别走，等我重来一次...");
    await sleep(1000);
    return doLoading(message, cb, options);
  }
}
