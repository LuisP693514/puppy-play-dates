import { Link } from 'react-router-dom'
import './LandingPage.css'
import tightlogo from "../../images/tight-logo.jpg"
import logan from '../../images/Logan.png'
import Janira from '../../images/Janira.png'
import Luis from '../../images/Luis.png'
import Mei from '../../images/Mei.png'

export default function LandingPage() {

  return (
    <div className="landing-page-layout">
        <div className="dark-orange-text landing-welcome"><h1>Welcome to Puppy Play Dates!</h1></div>
        <div className="container">
            <img className="landing-page-icon" src={tightlogo}/>
        </div>
        <Link className="landing-button" to="/login"><button className="button">Check us out!</button></Link>
        <div className="dark-orange-text login-developers"><h2>Developers:</h2></div>
        <div>
            <div className="landing-page-personnel">
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={logan}/>
                    <div className="spacer"><h3>Logan Hartman</h3></div>
                    <div className="spacer"><h4>Team Lead</h4></div>
                    <div className="landing-page-links">
                        <div><i className="fa-brands fa-square-github orange-text link-icon"></i></div>
                        <div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div>
                        <div></div>
                    </div>
                </div>
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={Luis}/>
                    <div className="spacer"><h3>Luis Perez</h3></div>
                    <div className="spacer"><h4>Backend Lead</h4></div>
                    <div className="landing-page-links">
                        <div><i className="fa-brands fa-square-github orange-text link-icon"></i></div>
                        <div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div>
                        <div></div>
                    </div>
                </div>
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={Mei}/>
                    <div className="spacer"><h3>Mei Huang</h3></div>
                    <div className="spacer"><h4>Frontend Lead</h4></div>
                    <div className="landing-page-links">
                        <div><i className="fa-brands fa-square-github orange-text link-icon"></i></div>
                        <div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div>
                        <div></div>
                    </div>
                </div>
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={Janira}/>
                    <div className="spacer"><h3>Janira Crispin</h3></div>
                    <div className="spacer"><h4>Project Flex</h4></div>
                    <div className="landing-page-links">
                        <div><i className="fa-brands fa-square-github orange-text link-icon"></i></div>
                        <div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
