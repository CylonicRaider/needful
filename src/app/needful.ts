export default async function (): Promise<boolean> {
  await new Promise(resolve =>
    setTimeout(resolve, 1000 + 2000 * Math.random()),
  );
  return true;
}
