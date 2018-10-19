import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/checkbox.scss'

class Checkbox extends Component {
  icon = () => {
    if(this.props.isChecked){
      return(
        <FontAwesomeIcon
          icon={['fas', 'check-square']}
          color="green"
          size="lg"
        />
      )
    } else {
      return(
        <FontAwesomeIcon
          icon={['far', 'square']}
          color="#c5c5c5"
          size="lg"
        />
      )
    }
  }

  clickOverride = () => {
    if(this.props.isDisabled) return
    this.props.handleClick()
  }

  render() {
    const { isDisabled, label } = this.props

    return(
      <div className={`button email-checkbox ${isDisabled ? 'disabled' : ''}`} onClick={this.clickOverride}>
        { this.icon() }
        <span className="email-checkbox-address">{label}</span>
      </div>
    )
  }

}

export default Checkbox
