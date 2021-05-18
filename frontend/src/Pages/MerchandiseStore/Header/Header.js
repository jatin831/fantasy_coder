import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../Logo/Logo';
import { withRouter, Link } from 'react-router-dom';
import './Header.css';
import { GrCart } from 'react-icons/gr';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from "react-icons";

const Header = (props) => {

    // console.log(props.location.pathname);

    let cartItems = null;
    if (props.totalItems) {
        cartItems = <span className='CartItems'>{props.totalItems}</span>;
    }

    // console.log(props.location.pathname.slice(7, 15));
    return (
        <Navbar sticky ='top' className="Header px-5" variant="dark" bg="dark" expand="lg">
            <Navbar.Brand className="pl-5 Header_Logo" href="/"><Logo /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="Header_NavCollapse" id="basic-navbar-nav">
                <Nav className="mr-auto Links">
                    <a href="/">
                        <span className={"NavLinks " + (props.location.pathname === '/' ? 'active' : '')}>Home</span>
                    </a>
                    <a href="/store">
                        <span className={"NavLinks " + (props.location.pathname === '/store' || props.location.pathname.slice(7, 15) === 'category' ? 'active' : '')}>Store</span>
                    </a>
                    <a href="/store/orders">
                        <span className={"NavLinks " + (props.location.pathname === '/store/orders' ? 'active' : '')}>Orders</span>
                    </a>
                </Nav>
                <Nav className="Header_CartIcon">
                    <Nav.Link className={"CartIcon " + (props.location.pathname === '/store/cart' ? 'active' : '')} href="/store/cart">
                    <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
                        <div className="d-flex justify-content-center mt-md-2 pb-2">
                            <FaShoppingCart />
                        </div>
                    </IconContext.Provider>
                        
                        { cartItems }
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>  
    )
}

export default withRouter(Header);
