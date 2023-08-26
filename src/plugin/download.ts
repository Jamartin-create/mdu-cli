import downloadRepo from "download-git-repo";
import utils from "util";
import { doLoading } from "./loading";
import Log, { log } from "./log";
const download = utils.promisify(downloadRepo);

// 模板对应的仓库名称
interface I_RepoURLTag {
  express: string;
}
type T_UnionValues<T> = { [P in keyof T]: T[P] }[keyof T];
type T_RepoURLTag = T_UnionValues<I_RepoURLTag>;

// 获取地址
function getRepoUrl(tag: T_RepoURLTag): string {
  return `git@github.com:Jamartin-create/${tag}.git`; // git 比 http 快很多
}
// 获取 issue 地址
function getIssueUrl(tag: T_RepoURLTag): string {
  return `https://github.com/jamartin-create/${tag}/issues`;
}

// 仓库名称标签
const repoURLTag: I_RepoURLTag = {
  express: "template-express",
};

// 项目下载类型
type T_DownloadRepoParams = {
  repoTag: T_RepoURLTag;
  projectName: string;
  targetDirectory: string;
};

// 下载的核心方法
async function doDownload({
  repoTag,
  projectName,
  targetDirectory,
}: T_DownloadRepoParams) {
  const res = await doLoading({
    successTxt: Log.DOWNLOAD_SUCC,
    errorTxt: Log.DOWNLOAD_AGAIN,
    loadingTxt: "在下了，别着急……",
    loadingFuc: () =>
      download(`direct:${getRepoUrl(repoTag)}`, targetDirectory, {
        clone: true,
      }),
  });
  if (!res) {
    return log(Log.DOWNLOAD_FAIL);
  }
  log(Log.DOWNLOAD_DESCRIPTION(projectName));
  log(Log.ISSUE_TEMPLATE(getIssueUrl(repoTag)));
  log(Log.ISSUE_CLI);
}

// 模板名称
export type T_ProjectType = "express";
// 模板下载方法列表
type T_Project_template_Handler = {
  [P in T_ProjectType]: (projectName: string, targetDirectory: string) => any;
};

export const downloadTmp: T_Project_template_Handler = {
  express: async (projectName: string, targetDirectory: string) => {
    await doDownload({
      repoTag: repoURLTag.express,
      projectName,
      targetDirectory,
    });
  },
};
