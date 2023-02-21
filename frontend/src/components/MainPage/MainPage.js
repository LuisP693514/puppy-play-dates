import ProfileModal from '../ProfileModal';
import Navbar from '../NavBar/NavBar';
import './MainPage.css'
import MyGoogleMap from '../Map/Map';

function MainPage() {
    return (
      <>
      <div className="main-layout">
        <div>
          <Navbar/>

        </div>
        <MyGoogleMap />
        <footer className='white-text'>
          Copyright &copy; 2023 Puppy Play Dates
          <ProfileModal />
        </footer>
      </div>
      </>
    );
  }
  
  export default MainPage;