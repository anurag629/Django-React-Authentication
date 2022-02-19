import React from 'react';
import Navbar from '../components/Navbar';

const Layout = () => (
    <div>
        <Navbar />
        {props.children}
    </div>
);

export default Layout;