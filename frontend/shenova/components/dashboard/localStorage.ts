export const STORAGE_KEYS = {
  analyses: "shenova_analyses",
  reports: "shenova_reports",
};

export function getLocalData<T>(
  key: string,
  fallback: T
): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return fallback;
    }

    return JSON.parse(data);
  } catch {
    return fallback;
  }
}

export function setLocalData<T>(
  key: string,
  data: T
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalData(key: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(key);
}