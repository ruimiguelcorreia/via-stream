import React, { useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import gsap, { Power3 } from 'gsap';

import logo from '../images/via-stream-logo.png';

import './navBar.scss';

const NavBar = () => {
	const isHomePage = useRouteMatch('/').isExact;

	let navBarClicked = false;
	let disabled = false;

	const startAnimation = () => {
		if (disabled) {
			return;
		}

		disabled = true;
		navBarClicked = !navBarClicked;

		const duration = 0.15;

		if (navBarClicked) {
			gsap.to(upperRight, { fill: '#d1ac00', duration, ease: Power3.easeIn });
			gsap.fromTo(
				upperLeft,
				{ display: 1, x: 0 },
				{ opacity: 0, x: -100, duration, ease: Power3.easeIn, delay: duration }
			);
			gsap.fromTo(
				movies,
				{ display: 'none', x: 20 },
				{ display: 'block', x: 0, duration, ease: Power3.easeIn, delay: duration }
			);
			gsap.fromTo(
				lowerLeft,
				{ opacity: 1, x: 0 },
				{ opacity: 0, x: -100, duration, ease: Power3.easeIn, delay: duration * 2 }
			);
			gsap.fromTo(
				series,
				{ display: 'none', x: 20 },
				{ display: 'block', x: 0, duration, ease: Power3.easeIn, delay: duration * 2 }
			);
			gsap.fromTo(
				lowerRight,
				{ opacity: 1, x: 0 },
				{ opacity: 0, x: -100, duration, ease: Power3.easeIn, delay: duration * 3 }
			);
			gsap.fromTo(
				helper,
				{ display: 'none', x: 20 },
				{ display: 'block', x: 0, duration, ease: Power3.easeIn, delay: duration * 3 }
			);
		} else {
			gsap.to(upperRight, { fill: 'none', duration, ease: Power3.easeIn });
			gsap.fromTo(helper, { display: 'block', x: 0 }, { duration, display: 'none', x: 20, ease: Power3.easeIn });
			gsap.fromTo(lowerRight, { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration, ease: Power3.easeIn });
			gsap.fromTo(
				series,
				{ display: 'block', x: 0 },
				{ display: 'none', x: 20, duration, ease: Power3.easeIn, delay: duration }
			);
			gsap.fromTo(
				lowerLeft,
				{ opacity: 0, x: -25 },
				{ opacity: 1, x: 0, duration, ease: Power3.easeIn, delay: duration }
			);
			gsap.fromTo(
				movies,
				{ display: 'block', x: 0 },
				{ display: 'none', x: 20, duration, ease: Power3.easeIn, delay: duration * 2 }
			);
			gsap.fromTo(
				upperLeft,
				{ opacity: 0, x: -25 },
				{ opacity: 1, x: 0, duration, ease: Power3.easeIn, delay: duration * 2 }
			);
		}

		setTimeout(() => {
			disabled = false;
		}, duration * 3 * 100);
	};

	let upperRight = useRef(null);
	let upperLeft = useRef(null);
	let lowerLeft = useRef(null);
	let lowerRight = useRef(null);
	let movies = useRef(null);
	let series = useRef(null);
	let helper = useRef(null);

	return (
		<div className={isHomePage ? 'NavBar-Homepage' : 'NavBar'}>
			<div className="navbar-display">
				<div className="menu-options">
					<Link to="/" className="menu-item menu-item-l">
						<img src={logo} alt="Via Stream Logo" />
					</Link>
					<Link
						to="/movies"
						onClick={startAnimation}
						className="menu-item menu-item-m"
						ref={(el) => (movies = el)}
					>
						Movies
					</Link>
					<Link
						to="/tv-shows"
						onClick={startAnimation}
						className="menu-item menu-item-t"
						ref={(el) => (series = el)}
					>
						Series
					</Link>
					<Link
						to="/subscriptions"
						onClick={startAnimation}
						className="menu-item menu-item-s"
						ref={(el) => (helper = el)}
					>
						Helper
					</Link>
				</div>
				<div className="menu-btn" onClick={startAnimation}>
					<svg height="100%" width="100%" viewBox="0 0 256 256" className="svg">
						<g id="Icon">
							<path
								ref={(el) => (upperLeft = el)}
								stroke="#d1ac00"
								strokeWidth="10"
								d="M45.5521+17.4124L87.1446+17.4124C101.42+17.4124+112.993+28.9718+112.993+43.2311L112.993+86.3416C112.993+100.601+101.42+112.16+87.1446+112.16L45.5521+112.16C31.2763+112.16+19.7034+100.601+19.7034+86.3416L19.7034+43.2311C19.7034+28.9718+31.2763+17.4124+45.5521+17.4124Z"
								fill="none"
								strokeLinecap="round"
								opacity="1"
								strokeLinejoin="round"
							/>
							<path
								ref={(el) => (upperRight = el)}
								stroke="#d1ac00"
								strokeWidth="10"
								d="M168.855+17.4124L210.448+17.4124C224.724+17.4124+236.297+28.9718+236.297+43.2311L236.297+86.3416C236.297+100.601+224.724+112.16+210.448+112.16L168.855+112.16C154.58+112.16+143.007+100.601+143.007+86.3416L143.007+43.2311C143.007+28.9718+154.58+17.4124+168.855+17.4124Z"
								fill="none"
								strokeLinecap="round"
								opacity="1"
								strokeLinejoin="round"
							/>
							<path
								ref={(el) => (lowerRight = el)}
								stroke="#d1ac00"
								strokeWidth="10"
								d="M168.855+143.84L210.448+143.84C224.724+143.84+236.297+155.399+236.297+169.658L236.297+212.769C236.297+227.028+224.724+238.588+210.448+238.588L168.855+238.588C154.58+238.588+143.007+227.028+143.007+212.769L143.007+169.658C143.007+155.399+154.58+143.84+168.855+143.84Z"
								fill="none"
								strokeLinecap="round"
								opacity="1"
								strokeLinejoin="round"
							/>
							<path
								ref={(el) => (lowerLeft = el)}
								stroke="#d1ac00"
								strokeWidth="10"
								d="M45.5521+143.84L87.1446+143.84C101.42+143.84+112.993+155.399+112.993+169.658L112.993+212.769C112.993+227.028+101.42+238.588+87.1446+238.588L45.5521+238.588C31.2763+238.588+19.7034+227.028+19.7034+212.769L19.7034+169.658C19.7034+155.399+31.2763+143.84+45.5521+143.84Z"
								fill="none"
								strokeLinecap="round"
								opacity="1"
								strokeLinejoin="round"
							/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
