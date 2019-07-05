import { Route, Switch, Link } from 'react-router-dom'
import * as routes from './routes'
import * as React from 'react'

export default function App() {
    return (
        <div>
            <h1> 非动态加载 APP </h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to={'/'}>root</Link>
                <Link to={'/about'}>about</Link>
                <Link to={'/news'}> 动态加载 news</Link>
            </div>
            <Switch>
                <Route exact path="/" component={routes.Home} />
                <Route exact path="/about" component={routes.About} />
                <Route exact path="/news" component={routes.DynamicNews} />
            </Switch>
        </div>
    )
}
