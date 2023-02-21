import './LandingPage.css'
import logan from '../../images/Logan.png'
import Janira from '../../images/Janira.png'
import Luis from '../../images/Luis.png'
import Mei from '../../images/Mei.png'

export default function LandingPage() {
  return (
    <div className="container">
        <div className="landing-page-personnel">
            <div className="landing-page-card">
                <img className="landing-page-image avatar" src={logan}/>
                <div><h3>Logan Hartman</h3></div>
                <div><h4>Lead</h4></div>
                <div className="landing-page-links">
                    <div>Git</div>
                    <div>LI</div>
                    <div></div>
                </div>

            </div>
            <div className="landing-page-card">
                <img className="landing-page-image avatar" src={Luis}/>
                <div><h3>Luis Perez</h3></div>
                <div><h4>Backend Lead</h4></div>
                <div className="landing-page-links">
                    <div>Git</div>
                    <div>LI</div>
                    <div></div>
                </div>

            </div>
            <div className="landing-page-card">
                <img className="landing-page-image avatar" src={Mei}/>
                <div><h3>Mei Huang</h3></div>
                <div><h4>Frontend Lead</h4></div>
                <div className="landing-page-links">
                    <div>Git</div>
                    <div>LI</div>
                    <div></div>
                </div>

            </div>
            <div className="landing-page-card">
                <img className="landing-page-image avatar" src={Janira}/>
                <div><h3>Janira Crispin</h3></div>
                <div><h4>Flex Lead</h4></div>
                <div className="landing-page-links">
                    <div>Git</div>
                    <div>LI</div>
                    <div></div>
                </div>

            </div>

        </div>
    </div>
  )
}
