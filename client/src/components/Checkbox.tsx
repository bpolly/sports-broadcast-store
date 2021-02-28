import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/checkbox.scss'

interface Props {
  handleClick: () => void,
  isChecked: boolean,
  isDisabled: boolean,
  label: string
}

function Checkbox(props: Props) {
  const icon = () => {
    if(props.isChecked){
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

  const clickOverride = () => {
    if(props.isDisabled) return
    props.handleClick()
  }

  return(
    <div className={`button email-checkbox ${props.isDisabled ? 'disabled' : ''}`} onClick={clickOverride}>
      { icon() }
      <span className="email-checkbox-address">{props.label}</span>
    </div>
  )
}

export default Checkbox
