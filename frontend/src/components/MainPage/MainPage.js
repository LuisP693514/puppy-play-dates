import ProfileModal from '../ProfileModal';
import Navbar from '../NavBar/NavBar';
import OptionsBar from '../OptionsBar/OptionsBar';
import './MainPage.css'
import MyGoogleMap from '../Map/Map';

function MainPage() {
    return (
      <>
        <div className="options-bar-div">
          <OptionsBar />
        </div>
        <div>
          <div className="main-layout">
            <div>
              <Navbar/>
              <ProfileModal />
            </div>
            <MyGoogleMap />
            <footer className='white-text'>
              Copyright &copy; 2023 Puppy Play Dates
            </footer>
          </div>
        </div>
      </>
    );
  }
  
  export default MainPage;