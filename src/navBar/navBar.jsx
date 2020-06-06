import React from 'react';
import {Link} from 'react-router-dom';

import './navBar.scss';

const NavBar = () => (
    <div className="NavBar">
        <div><ion-icon name="grid-outline" className="menu-btn"></ion-icon></div>
        <div className="menu-options">
            <Link to='/'>Homepage</Link>
            <Link to='/movies'>Movies</Link>
            <Link to='/tv-shows'>Tv Shows</Link>
            <Link to='/subscriptions'>Subscription</Link>
        </div>
    </div>
)

export default NavBar;