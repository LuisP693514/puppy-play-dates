import './NavBar.css';
import { Link } from 'react-router-dom';
// import { useDispatch} from 'react-redux';
import Filters from '../Filters/Filters';
import { useState } from 'react';
import transparentLogo from "../../images/transparent-logo.png"


function Navbar() {
    // const history = useHistory();
    // const dispatch = useDispatch();

    const [showFilters, setShowFilters] = useState(false);

    const handleFilterClick = () => {
        setShowFilters(!showFilters);
    }

    return (
        <div className='nav-bar-header'>
            <img className="main-page-logo" src={transparentLogo}/>
            <div id='headerLogo'>
                <Link className='navLogo' to='/'></Link>
            </div>
            <div>
                    <button className="orange-text filter"onClick={handleFilterClick}><i class="fa-solid fa-sliders"></i></button>
            </div>
        </div>
    )

};

export default Navbar;
