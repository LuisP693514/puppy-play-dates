import './NavBar.css';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
// import { useDispatch} from 'react-redux';
import Filters from '../Filters/Filters';
import { useState } from 'react';
import transparentLogo from "../../images/transparent-logo.png"


function Navbar() {
    // const history = useHistory();
    // const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showFilters, setShowFilters] = useState(false);


    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleFilterClick = () => {
        setShowFilters(!showFilters);
    }

    return (
        <div className='nav-bar-header'>
            <img className="main-page-logo" src={transparentLogo}/>
            <div id='headerLogo'>
                <Link className='navLogo' to='/'>
                    
                </Link>
            </div>
            <div className='filters'>
                <button id='filter-dropdown' onClick={handleProfileClick}>
                    <p id='filter-text'>Filters:</p>
                    <i id='filter-arrow' className="fa-solid fa-caret-down" onClick={handleFilterClick}></i>
                    {showFilters && <Filters />}
                </button>
            </div>
        </div>
    )

};

export default Navbar;
