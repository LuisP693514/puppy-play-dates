import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'
import './Info.css'

export default function Info({open, infoClose}) {


    if (!open) return null
    return ReactDom.createPortal(
        <div className="options-modal">
            <button onClick={infoClose} className="modal-close">&times;</button>
            <p>Thank you for visiting Puppy Play Dates!</p>
            <div><span><i className="fa-solid fa-gear orange-text"></i></span> to change account settings</div>
            <div><span><i className="fa-solid fa-paw orange-text"></i></span> to view and update your profile</div>
            <div><span><i className="fa-solid fa-bone orange-text"></i></span> to view your friends</div>
            <div><span><i className="fa-solid fa-comments orange-text"></i></span> to view messages</div>
            <div><span><i className="fa-regular fa-calendar orange-text"></i></span> to see/create date.</div>
            <div><span><i className="fa-solid fa-sliders orange-text"></i></span> to filter content</div>
            <div><span><i className="fa-solid fa-dog orange-text"></i></span> on map to view dog profile</div>
            <div><span><i className="fa-solid fa-plus orange-text"></i></span>  to zoom the map out</div>
            <div><span><i className="fa-solid fa-minus orange-text"></i></span> to zoom the map in</div>
            <div><span><i className="fa-solid fa-location-crosshairs orange-text"></i></span> to recenter the map on your location</div>
            <div><span><i className="fa-solid fa-right-from-bracket orange-text"></i></span> to logout of your account</div>
            <Link className="link" to="/"><button className="button developer-button">Developer Information</button></Link>
        </div>,
        document.getElementById("portal")
    )
}