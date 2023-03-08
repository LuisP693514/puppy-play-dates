import ProfileModal from '../ProfileModal';
import Navbar from '../NavBar/NavBar';
import OptionsBar from '../OptionsBar/OptionsBar';
import './MainPage.css'
import MyGoogleMap from '../Map/Map';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/session';


function MainPage() {

  const [filters, setFilters] = useState(["petStore", "dogPark", "vet", "groomer"])

  const user = useSelector(selectCurrentUser)
  const userId = user?._id

  const handleFilterClick = (e) => {
    e.preventDefault()
    const value = e.target.attributes[0].value
    const filterCopy = Object.assign([], filters)
    
    if (filters.includes(value)){
      delete filterCopy[filterCopy.indexOf(value)]
    } else {
      filterCopy.push(value)
    }
    setFilters(filterCopy)
  }

    return (
      <>
        <div className="options-bar-div">
          <OptionsBar />
        </div>
        <div>
          <div className="main-layout">
            <div>
              <Navbar filters={filters} filterCallback={handleFilterClick}/>
              <ProfileModal userId={userId}/>
            </div>
            <MyGoogleMap filteredMarkers={filters}/>
          </div>
        </div>
      </>
    );
  }
  
  export default MainPage;