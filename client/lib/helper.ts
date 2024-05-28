export class LocalStorage {
  static get(key: string) {
    if (typeof window !== 'undefined') {
      const value = window.localStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch (error) {
          console.error("Error parsing localStorage value:", error);
          return null;
        }
      }
    }
    return null;
  }

  static set(key: string, value: any) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error("localStorage is not available. Unable to set item:", key);
    }
  }

  static remove(key: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    } else {
      console.error("localStorage is not available. Unable to remove item:", key);
    }
  }

  static clear() {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    } else {
      console.error("localStorage is not available. Unable to clear storage.");
    }
  }
}
