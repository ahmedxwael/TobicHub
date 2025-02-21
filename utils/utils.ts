import axios from "axios";

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

// Function to validate a URL
export function validateURL(url: string): boolean {
  const rfcRegex =
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|\[(?:[a-fA-F0-9:]+)\]|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  return rfcRegex.test(url);
}

export function validString(value: string) {
  if (!value || !value.trim()) return false;

  return true;
}

// Function to shorten urls using TinyURL API
export async function getShortenURL(url: string): Promise<string> {
  const validUrl = validateURL(url);

  if (!validUrl) return "";

  try {
    const response = await axios.get(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to shorten URL");
    }
    return response.data;
  } catch (error) {
    return url; // Return original URL if shortening fails
  }
}
