import React from 'react';
import { withRouter } from 'react-router-dom';
import './Logo.css';
import ImgLogo from '../../../assets/img/CodeiumLogo.png';
import ImgLogo2 from '../../../assets/img/Codeium3.png';

const Logo = (props) => {
    return props.location.pathname === '/checkout' ? (
            <div className='Logo'> <img src={ImgLogo2} /> </div>
        ) : <div className='Logo'> <img src={ImgLogo} /> </div>
} 

export default withRouter(Logo);