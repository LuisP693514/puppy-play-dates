import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfilePage from './ProfilePage/ProfilePage'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session';
import Friends from './Friends/Friends'
import Messages from './Messages/Messages'
import Info from './Info/Info'
import Settings from './Settings/Settings'
import './OptionsBar.css'

export default function OptionsBar() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [profilePageOpen, setProfilePageOpen] = useState(false)
  const [friendsOpen, setFriendsOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleLogout = () => {
    dispatch(sessionActions.logout());
    history.push('/login');
  }

  const closeAllModals = () => {
    setSettingsOpen(false)
    setProfilePageOpen(false);
    setFriendsOpen(false)
    setMessagesOpen(false)
    setInfoOpen(false)

  }

  return (
    <div className="options-bar-div">
        <div className="options-icons">
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setSettingsOpen(true)}}><i className="fa-solid fa-gear white-text"></i></button>
            <Settings open={settingsOpen} settingsClose={() => setSettingsOpen(false)} closeAllModals={closeAllModals}></Settings>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setProfilePageOpen(true)}}><i className="fa-solid fa-paw white-text"></i></button>
            <ProfilePage open={profilePageOpen} profileClose={()=> setProfilePageOpen(false)} closeAllModals={closeAllModals}></ProfilePage>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setFriendsOpen(true)}}><i className="fa-solid fa-bone white-text"></i></button>
            <Friends open={friendsOpen} friendsClose={() => setFriendsOpen(false)} closeAllModals={closeAllModals}></Friends>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setMessagesOpen(true)}}><i className="fa-solid fa-comments white-text"></i></button>
            <Messages open={messagesOpen} messagesClose={() => setMessagesOpen(false)} closeAllModals={closeAllModals}></Messages>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setInfoOpen(true)}}><i className="fa-regular fa-circle-question white-text"></i></button>
            <Info open={infoOpen} infoClose={() => setInfoOpen(false)}></Info>
        </div>
        <div className="options-icons">
            <Link to="/login" onClick={handleLogout}><div className="double-spacer"><i className="fa-solid fa-right-from-bracket white-text"></i></div></Link>          
        </div>
    </div>
  )
}
