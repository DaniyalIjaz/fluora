// Helper functions for local storage

export function setItem(key: string, value: any): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getItem<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        return JSON.parse(item) as T
      } catch (e) {
        console.error("Error parsing item from localStorage:", e)
        return null
      }
    }
  }
  return null
}

export function setLocalStorage(key: string, value: any): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getLocalStorage(key: string): any {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        return JSON.parse(item)
      } catch (e) {
        // If parsing fails, return the raw string
        return item
      }
    }
  }
  return null
}

export function setAuthenticated(role: string, isAuthenticated: boolean): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated))
    localStorage.setItem("userRole", JSON.stringify(role))
  }
}
