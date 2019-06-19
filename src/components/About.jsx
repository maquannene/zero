import React from 'react'
import Control from './control'

export default class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 2
        }
    }
    render() {
        return (
            <div className="about">
                About Page
                <input
                    value={this.state.value}
                    onChange={value => {
                        this.setState({
                            value: parseInt(value.target.value, 10)
                        })
                    }}
                />
                <Control
                    value={this.state.value}
                    onClick={value => {
                        this.setState({
                            value
                        })
                    }}
                />
                <Control
                    value={this.state.value}
                    onChange={value => {
                        this.setState({
                            value
                        })
                    }}
                />
            </div>
        )
    }
}
