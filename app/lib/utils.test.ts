import {describe,expect,test} from '@jest/globals'
import { getMonthName } from './utils'

describe('getMonths fxn',()=>{
    test('0 is Jan',()=>{
        expect(getMonthName(0)).toBe('January')
    })
})