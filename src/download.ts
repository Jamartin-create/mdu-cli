import downloadRepo from "download-git-repo";
import utils from "util";
import { doLoading } from "./loading";

// 保证对象每个属性的唯一
type T_UnionValues<T> = { [P in keyof T]: T[P] }[keyof T];
// 仓库地址
type T_RepoURL<T extends string> =
  `https://github.com/jamartin-create/${T}.git`;
// 模板对应的仓库名称
interface I_RepoURLTag {
  express: "LilMartinMusicV3ts";
}
// 模板对应的仓库地址
type T_RepoURLTag = T_UnionValues<I_RepoURLTag>;
// 模板名称
export type T_ProjectType = "express";
// 模板下载方法列表
type T_Project_template_Handler = {
  [P in T_ProjectType]: (projectName: string, targetDirectory: string) => any;
};

// 项目下载类型
export type T_DownloadRepoParams = {
  repoURL: T_RepoURL<T_RepoURLTag>;
  projectName: string;
  targetDirectory: string;
};

// 获取地址
export function getRepoUrl(tag: T_RepoURLTag): T_RepoURL<T_RepoURLTag> {
  return `https://github.com/jamartin-create/${tag}.git`;
}

export const repoURLTag: I_RepoURLTag = {
  express: "LilMartinMusicV3ts",
};

const download = utils.promisify(downloadRepo);

// 下载的核心方法
async function doDownload({
  repoURL,
  projectName,
  targetDirectory,
}: T_DownloadRepoParams) {
  await doLoading(
    "在下，在下，别急……",
    () => download(`direct:${repoURL}`, targetDirectory, { clone: true }),
    { projectName }
  );
}

export const downloadTmp: T_Project_template_Handler = {
  express: async (projectName: string, targetDirectory: string) => {
    const repoURL = getRepoUrl(repoURLTag.express);
    await doDownload({
      repoURL: repoURL as T_RepoURL<T_RepoURLTag>,
      projectName,
      targetDirectory,
    });
  },
};
