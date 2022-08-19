import {useCounter} from '../src/views/layout/Home.vue'
import {describe, expect, test} from 'vitest'

test('useCounter', () => {
    const {count, increment} = useCounter()
    expect(count.value).toBe(0)

    increment()
    expect(count.value).toBe(1)
})
