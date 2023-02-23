import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ProfilePage from './ProfilePage/ProfilePage'
import * as sessionActions from '../../store/session';
import Friends from './Friends/Friends'
import Messages from './Messages/Messages'
import Info from './Info/Info'
import Settings from './Settings/Settings'
import Logout from './Logout/Logout'
import Dates from './Dates/Dates';
import './OptionsBar.css'

export default function OptionsBar() {
  const dispatch = useDispatch()
  const history = useHistory();
  const [profilePageOpen, setProfilePageOpen] = useState(false)
  const [friendsOpen, setFriendsOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [datesOpen, setDatesOpen] = useState(false)

  // useEffect(() => {

  //   if (history.location.state && history.location.state.from === 'signup') {
  //     setProfilePageOpen(true);
  //   }
  // }, [history]);

  const handleLogout = () => {
    dispatch(sessionActions.logout());
    history.push('/login');
  }

  const closeAllModals = () => {
    setProfilePageOpen(false);
    setFriendsOpen(false)
    setMessagesOpen(false)
    setInfoOpen(false)
    setDatesOpen(false)
  }

  const hideModals = () => {
    setSettingsOpen(false)
  }

  return (
    <div className="options-bar-div">
        <div className="options-icons">
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setSettingsOpen(true)}}><i className="fa-solid fa-gear white-text"></i></button>
            <Settings open={settingsOpen} settingsClose={() => setSettingsOpen(false)} closeAllModals={closeAllModals} hideModals={hideModals}></Settings>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setProfilePageOpen(!profilePageOpen)}}><i className="fa-solid fa-paw white-text"></i></button>
            <ProfilePage open={profilePageOpen} profileClose={()=> setProfilePageOpen(false)} closeAllModals={closeAllModals}></ProfilePage>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setFriendsOpen(!friendsOpen)}}><i className="fa-solid fa-bone white-text"></i></button>
            <Friends open={friendsOpen} friendsClose={() => setFriendsOpen(false)} closeAllModals={closeAllModals}></Friends>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setMessagesOpen(!messagesOpen)}}><i className="fa-solid fa-comments white-text"></i></button>
            <Messages open={messagesOpen} messagesClose={() => setMessagesOpen(false)} closeAllModals={closeAllModals}></Messages>
            <button className="double-spacer" onClick={() => {
              closeAllModals()
              setDatesOpen(!datesOpen)}}><i className="fa-regular fa-calendar white-text"></i></button>
            <Dates open={datesOpen} datesClose={() => setDatesOpen(false)}></Dates>
            <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setInfoOpen(!infoOpen)}}><i className="fa-regular fa-circle-question white-text"></i></button>
            <Info open={infoOpen} infoClose={() => setInfoOpen(false)}></Info>
        </div>
        <div className="options-icons">
        <button className="double-spacer" onClick={() => {
                        closeAllModals()
                        setLogoutOpen(true)}}><i className="fa-solid fa-right-from-bracket white-text"></i></button>
            <Logout open={logoutOpen} logoutClose={() => setLogoutOpen(false)} handleLogout={handleLogout}></Logout>         
        </div>
    </div>
  )
}
