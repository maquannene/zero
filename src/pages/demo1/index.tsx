import * as React from 'react'
import * as ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './App'

ReactDom.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('container')
)
