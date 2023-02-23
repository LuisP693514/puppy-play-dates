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
        <Link className="landing-button-div" to="/login"><button className="button landing-button">Check us out!</button></Link>
        <div className="dark-orange-text login-developers"><h2>Developers:</h2></div>
        <div>
            <div className="landing-page-personnel">
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={logan}/>
                    <div className="spacer"><h3>Logan Hartman</h3></div>
                    <div className="spacer"><h4>Team Lead</h4></div>
                    <div className="landing-page-links">
                        <a href="https://github.com/logan-hart" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-square-github orange-text link-icon"></i></div></a>
                        <a href="https://www.linkedin.com/in/logan-hartman4104/" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div></a>
                    </div>
                </div>
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={Luis}/>
                    <div className="spacer"><h3>Luis Perez</h3></div>
                    <div className="spacer"><h4>Backend Lead</h4></div>
                    <div className="landing-page-links">
                        <a href="https://github.com/LuisP693514" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-square-github orange-text link-icon"></i></div></a>
                        <a href="https://www.linkedin.com/in/luis-perez-5baa4695/" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div></a>
                    </div>
                </div>
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={Mei}/>
                    <div className="spacer"><h3>Mei Huang</h3></div>
                    <div className="spacer"><h4>Frontend Lead</h4></div>
                    <div className="landing-page-links">
                        <a href="https://github.com/meih15" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-square-github orange-text link-icon"></i></div></a>
                        <a href="https://www.linkedin.com/in/mei-huang-ba967a159" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div></a>
                    </div>
                </div>
                <div className="landing-page-card">
                    <img className="landing-page-image avatar" src={Janira}/>
                    <div className="spacer"><h3>Janira Crispin</h3></div>
                    <div className="spacer"><h4>Project Flex</h4></div>
                    <div className="landing-page-links">
                        <a href="https://github.com/janirac" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-square-github orange-text link-icon"></i></div></a>
                        <a href="https://www.linkedin.com/in/janira-crispin-396656a9/" target="_blank" rel="noopener noreferrer"><div><i className="fa-brands fa-linkedin orange-text link-icon"></i></div></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
