import { customRef } from 'vue'

export function useDebouncedRef(value: string | number, delay = 200) {
  let timeout: string | number | NodeJS.Timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
