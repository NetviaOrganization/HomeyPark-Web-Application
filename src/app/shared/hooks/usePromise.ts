import { useState, useEffect, useRef } from 'react'

interface PromiseState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

type PromiseOrFn<T> = Promise<T> | (() => Promise<T>)

export function usePromise<T>(promiseOrFn: PromiseOrFn<T>) {
  const promiseRef = useRef(promiseOrFn)
  const [state, setState] = useState<PromiseState<T>>({
    data: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await (typeof promiseRef.current === 'function'
          ? promiseRef.current()
          : promiseRef.current)

        setState({ data: result, error: null, loading: false })
      } catch (error) {
        setState({ data: null, error: error as Error, loading: false })
      }
    }

    fetchData()
  }, []) // Empty dependency array since we're using ref

  return state
}
