import ProfileModal from '../ProfileModal';
import Navbar from '../NavBar/NavBar';
import './MainPage.css'

function MainPage() {
    return (
      <>
        <Navbar/>
        <p>Yay doggies</p>
        <ProfileModal />
        <footer>
          Copyright &copy; 2023 Puppy Play Dates
        </footer>
      </>
    );
  }
  
  export default MainPage;