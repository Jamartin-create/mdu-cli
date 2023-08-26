import ora from "ora";

// 睡眠
function sleep(delay: number): Promise<boolean> {
  return new Promise((reso) => {
    setTimeout(() => {
      reso(false);
    }, delay);
  });
}

export type T_Loading_Options = {
  loadingTxt: string;
  successTxt: string;
  errorTxt: string;
  loadingFuc: () => void;
};

export function doLoading(
  options: T_Loading_Options,
  count: number = 0
): Promise<boolean> {
  if (count >= 5) return Promise.resolve(false);
  return new Promise(async (resolve) => {
    const loading = ora(options.loadingTxt);
    loading.start();
    try {
      await options.loadingFuc();
      loading.succeed(options.successTxt);
      resolve(true);
    } catch (e) {
      loading.fail(options.errorTxt);
      await sleep(1000);
      resolve(await doLoading(options, count + 1));
    }
  });
}
