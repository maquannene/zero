/**
 * 快速创建一个 action
 * 使用方式:
 * setName: actionCreator(setName, 'name')
 */

export const actionCreatorWithExtra = extraParams => (type, ...argNames) => {
    return (...args) => {
        const action = { type, payload: {} }
        argNames.forEach((arg, index) => {
            action.payload[argNames[index]] = args[index]
        })
        if (extraParams != null) {
            action.payload = {
                ...action.payload,
                ...extraParams
            }
        }
        return action
    }
}

export default (type, ...argNames) => {
    return actionCreatorWithExtra(null)(type, ...argNames)
}
