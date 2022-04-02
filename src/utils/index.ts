import {useEffect, useState} from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = <T extends object, U extends keyof T>(object: T) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key as U]
        if (isFalsy(value)) {
            delete result[key as U]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {callback()}, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}