/**
 * 创建一个不会 crash 的 saga，使用 while 循环，保活 sagas 数组中的每一个 saga
 * 不会因为一个 saga 抛出异常而导致整个 saga 全部崩溃
 * 使用方式：
 * yield *sagaStart([...sagaFunctions])
 */

import { spawn, call } from 'redux-saga/effects'

function* sagaStarter(effects) {
    //  单独给每个 saga 进行 try catch
    yield* effects.map(effect =>
        spawn(function*() {
            while (true) {
                try {
                    yield call(effect)
                    break
                } catch (e) {
                    console.log('Saga 事件处理异常，如下:')
                    console.log(e)
                }
            }
        }))
}

export default effects => {
    function* sagas() {
        yield sagaStarter(effects)
    }
    return sagas
}
