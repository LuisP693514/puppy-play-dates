import './OptionsBar.css'
import { Link } from 'react-router-dom'
import { logout } from '../../store/session'

export default function OptionsBar() {
  return (
    <div className="options-bar-div">
        <div className="options-icons">
            <Link><div className="double-spacer"><i class="fa-solid fa-gear white-text"></i></div></Link>
            <Link to="/profile"><div className="double-spacer"><i class="fa-solid fa-paw white-text"></i></div></Link>
            <Link><div className="double-spacer"><i class="fa-solid fa-bone white-text"></i></div></Link>
            <Link><div className="double-spacer"><i class="fa-solid fa-comments white-text"></i></div></Link>
            <Link><div className="double-spacer"><i className="fa-regular fa-circle-question white-text"></i></div></Link>
        </div>
        <div className="options-icons">
            <Link to="/login" onClick={logout}><div className="double-spacer"><i class="fa-solid fa-right-from-bracket white-text"></i></div></Link>          
        </div>
    </div>
  )
}
