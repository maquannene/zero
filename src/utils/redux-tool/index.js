import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import sagaCreator from 'utils/redux-tool/saga-creator'

const reduxCreator = ({ modules = [], middlewares = [], history }) => {
    //  合并 modules 中的
    const reducers = combineReducers(
        modules.reduce(
            (result, { reducers, name }) => {
                return {
                    ...result,
                    [name]: reducers
                }
            },
            history ? { router: connectRouter(history) } : {}
        )
    )
    //  saga
    const saga = sagaCreator(
        modules.flatMap(({ effects }) => {
            return effects
        })
    )
    //  middleware
    const sagaMiddleware = createSagaMiddleware()
    let middleWares = [...middlewares, sagaMiddleware]

    if (history) {
        middleWares = [...middleWares, routerMiddleware(history)]
    }

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(reducers, composeEnhancer(applyMiddleware(...middleWares)))

    sagaMiddleware.run(saga)

    store.reducers = {
        ...reducers
    }
    store.injectModule = module => {
        // const { name, reducer,  }
        const key = {
            body: reducer
        }
    }

    return store
}

export default reduxCreator
