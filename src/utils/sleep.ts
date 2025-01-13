export async function sleep(ms: number = 1000) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
