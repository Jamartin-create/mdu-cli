import Inquirer from "inquirer";

export type T_PromptType =
  | "input"
  | "number"
  | "confirm"
  | "list"
  | "rawlist"
  | "expand"
  | "checkbox"
  | "password"
  | "editor";

export type T_PromptList = {
  type: T_PromptType;
  name: string;
  message: string;
  choices: { name: string; value: string | number | boolean }[];
  prefix?: string;
  suffix?: string;
  pageSize?: number;
  loop?: boolean;
  askAnswered?: boolean;
  waitUserInput?: boolean;
};

// 询问
async function askPrompts(prompts: T_PromptList[]) {
  return await new Inquirer.prompt(prompts);
}

// 询问是否覆盖
export const asks = {
  async askOverwrite() {
    const { isOverwrite } = await askPrompts([
      {
        type: "list",
        name: "isOverwrite",
        message: "原目录已存在，要覆盖吗？yes/no？",
        choices: [
          { name: "yes", value: true },
          { name: "no", value: false },
        ],
      },
    ]);
    return isOverwrite;
  },
  async askCreateType() {
    const { projectType } = await askPrompts([
      {
        type: "list",
        name: "projectType",
        message: "选择一个模板吧（虽然现在只有一个，但还是让你选一下）",
        choices: [{ name: "express", value: "express" }],
      },
    ]);
    return projectType;
  },
};
