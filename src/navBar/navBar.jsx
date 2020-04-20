import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => (
    <div>
        <Link to='/'>Homepage</Link>
        <Link to='/movies'>Movies</Link>
        <Link to='/tv-shows'>Tv Shows</Link>
        <Link to='/subscriptions'>Subscription</Link>
    </div>
)

export default NavBar;