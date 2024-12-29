export function debounce(callback: (...args: any) => void, wait = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, args), wait);
  };
}

export function getSlugFromName(name: string) {
  return name.split(" ").join("-").toLowerCase();
}

// A basic URL validation regex

// Function to validate a URL
export function validateURL(url: string): boolean {
  const urlRegex =
    /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d-._~:?#%&=]*)*$/;

  return urlRegex.test(url);
}
