import React from 'react'
import PropTypes from 'prop-types'

export default class Control extends React.Component {
    static propTypes = {
        value: PropTypes.number,
        onChange: PropTypes.func,
        onClick: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            defaultValue: props.value,
            _value: props.value
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const value = nextProps.value
        if (value != null && value !== prevState.defaultValue) {
            return {
                defaultValue: value,
                _value: value
            }
        }
        return null
    }

    render() {
        return (
            <div style={{ borderColor: 'black', borderWidth: '2px', borderStyle: 'solid' }}>
                <p> ========= {this.state._value} =========== </p>
                <div
                    onClick={() => {
                        const value = this.state._value + 1
                        this.setState({
                            _value: value
                        })
                        this.props.onChange && this.props.onChange(value)
                    }}
                >
                    add
                </div>
                <div
                    onClick={() => {
                        const value = this.state._value - 1
                        this.setState({
                            _value: value
                        })
                        this.props.onChange && this.props.onChange(value)
                    }}
                >
                    substract
                </div>
                <div
                    onClick={() => {
                        this.props.onClick && this.props.onClick(this.state._value)
                    }}
                >
                    确定
                </div>
            </div>
        )
    }
}
