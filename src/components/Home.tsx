import * as React from 'react'
import './home.scss'
import './home.css'
import * as cssModule from './home.module.css'
import * as scssModule from './home.module.scss'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div className={'home'}>
                    <div className={'color'}>Home Page</div>
                </div>
                <div className={scssModule.home}>
                    <div className={scssModule.red}>Home Module Page</div>
                </div>
                <div className={'test-home'}>
                    <div className={'test-color'}>Home Module Page</div>
                </div>
            </div>
        )
    }
}
