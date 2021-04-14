import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../Logo/Logo';
import { withRouter } from 'react-router-dom';
import './Header.css';
import { GrCart } from 'react-icons/gr';

const Header = (props) => {

    let cartItems = null;
    if (props.totalItems) {
        cartItems = <span className='CartItems'>{props.totalItems}</span>;
    }
    // console.log(props);
    return (
        <Navbar sticky ='top' className="Header px-5" bg="light" expand="lg">
        <Navbar.Brand className="pl-5" href="/"><Logo /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto Links">
                <Nav.Link className={props.location.pathname === '/' ? 'active' : ''} href="/">Home</Nav.Link>
                <Nav.Link className={props.location.pathname === '/store' ? 'active' : ''} href="/store">Store</Nav.Link>
            </Nav>
            <Nav className="mr-5">
                <Nav.Link className={"CartIcon " + (props.location.pathname === '/store/cart' ? 'active' : '')} href="/store/cart">
                    <GrCart/>
                    { cartItems }
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>  
    )
}

export default withRouter(Header);
