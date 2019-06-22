import React from 'react'
import './home.scss'
import styleModule from './home.module.css'
import './home.css'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <div className={'home'}>
                    <div className={'color'}>Home Page</div>
                </div>
                <div className={styleModule.home}>
                    <div className={styleModule.color}>Home Module Page</div>
                </div>
                <div className={'test-home'}>
                    <div className={'test-color'}>Home Module Page</div>
                </div>
            </div>
        )
    }
}
