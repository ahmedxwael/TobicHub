export function debounce<T extends Function>(callback: T, wait = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, args), wait);
  };
}
