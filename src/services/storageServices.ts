export const storageServices = {
  getItem: (key: string) => {
    if (!key) throw new Error('Key is required');
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (!key) throw new Error('Key is required');
    localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (!key) throw new Error('Key is required');
    localStorage.removeItem(key);
  },
};