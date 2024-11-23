export const getLocalStorage = <T>(key: string) => {
  const data = localStorage.getItem(key)
  return data ? (JSON.parse(data) as T) : null
}

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}
