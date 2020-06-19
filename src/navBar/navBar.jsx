import React, { useRef, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { TweenMax, Power3 } from 'gsap';

import logo from '../images/via-stream-logo.png';

import './navBar.scss';

const NavBar = () => {
  const isHomePage = useRouteMatch('/').isExact;

  let upperRight = useRef(null);
  let upperLeft = useRef(null);
  let lowerLeft = useRef(null);
  let lowerRight = useRef(null);

  useEffect(() => {
    console.log(testing);
    TweenMax.to(testing, 2, { opacity: 1, ease: Power3.easeIn });
  }, []);

  return (
    <div className={isHomePage ? 'NavBar-Homepage' : 'NavBar'}>
      <div className="navbar-display">
        <div className="menu-options">
          <Link to="/" className="menu-item menu-item-l">
            <img src={logo} />
          </Link>
          <Link to="/movies" className="menu-item menu-item-m">
            Movies
          </Link>
          <Link to="/tv-shows" className="menu-item menu-item-t">
            Series
          </Link>
          <Link to="/subscriptions" className="menu-item menu-item-s">
            Helper
          </Link>
        </div>
        <div className="menu-btn" ref={(el) => (testing = el)}>
          <svg height="100%" width="100%" viewBox="0 0 256 256" className="svg">
            <g id="Icon" layerName="Icon">
              <path
                ref={(el) => (upperLeft = el)}
                stroke="#d1ac00"
                stroke-width="10"
                d="M45.5521+17.4124L87.1446+17.4124C101.42+17.4124+112.993+28.9718+112.993+43.2311L112.993+86.3416C112.993+100.601+101.42+112.16+87.1446+112.16L45.5521+112.16C31.2763+112.16+19.7034+100.601+19.7034+86.3416L19.7034+43.2311C19.7034+28.9718+31.2763+17.4124+45.5521+17.4124Z"
                fill="none"
                stroke-linecap="round"
                opacity="1"
                stroke-linejoin="round"
              />
              <path
                stroke="#d1ac00"
                stroke-width="10"
                d="M168.855+17.4124L210.448+17.4124C224.724+17.4124+236.297+28.9718+236.297+43.2311L236.297+86.3416C236.297+100.601+224.724+112.16+210.448+112.16L168.855+112.16C154.58+112.16+143.007+100.601+143.007+86.3416L143.007+43.2311C143.007+28.9718+154.58+17.4124+168.855+17.4124Z"
                fill="none"
                stroke-linecap="round"
                opacity="1"
                stroke-linejoin="round"
              />
              <path
                stroke="#d1ac00"
                stroke-width="10"
                d="M168.855+143.84L210.448+143.84C224.724+143.84+236.297+155.399+236.297+169.658L236.297+212.769C236.297+227.028+224.724+238.588+210.448+238.588L168.855+238.588C154.58+238.588+143.007+227.028+143.007+212.769L143.007+169.658C143.007+155.399+154.58+143.84+168.855+143.84Z"
                fill="none"
                stroke-linecap="round"
                opacity="1"
                stroke-linejoin="round"
              />
              <path
                stroke="#d1ac00"
                stroke-width="10"
                d="M45.5521+143.84L87.1446+143.84C101.42+143.84+112.993+155.399+112.993+169.658L112.993+212.769C112.993+227.028+101.42+238.588+87.1446+238.588L45.5521+238.588C31.2763+238.588+19.7034+227.028+19.7034+212.769L19.7034+169.658C19.7034+155.399+31.2763+143.84+45.5521+143.84Z"
                fill="none"
                stroke-linecap="round"
                opacity="1"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
