import './NavBar.css';
import { Link } from 'react-router-dom';
// import { useDispatch} from 'react-redux';
import Filter from './Filter/Filter';
import { useState } from 'react';
import transparentLogo from "../../images/transparent-logo.png"


function Navbar(props) {
    const [filterOpen, setFilterOpen] = useState(false)
    // const history = useHistory();
    // const dispatch = useDispatch();

    // const [showFilters, setShowFilters] = useState(false);

    // const handleFilterClick = () => {
    //     setShowFilters(!showFilters);
    // }

    return (
        <div className="nav-bar-height">
            <div className='nav-bar-header'>
                <img className="main-page-logo" src={transparentLogo}/>
                <div id='headerLogo'>
                    <Link className='navLogo' to='/'></Link>
                </div>
                <div>
                    <button className="double-spacer orange-text filter" onClick={() => setFilterOpen(!filterOpen)}><i className="fa-solid fa-sliders"></i></button>
                    <Filter filters={props.filters} filterCallback={props.filterCallback} open={filterOpen} filterClose={() => setFilterOpen(false)}></Filter>
                </div>
            </div>
        </div>
    )

};

export default Navbar;
