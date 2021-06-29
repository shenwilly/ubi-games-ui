export function loadPreference(key: string, defaultValue: string): string {
    return localStorage.getItem(key) || defaultValue
}
  
export function storePreference(key: string, value: string): void {
    localStorage.setItem(key, value)
}