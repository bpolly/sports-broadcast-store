import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/checkbox.scss'

interface Props {
  handleClick: () => void
  isChecked: boolean
  isDisabled: boolean
  label: string
}

class Checkbox extends Component<Props> {
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
