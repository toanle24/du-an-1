import React from 'react'
import Footer from '../components/footer';
import Header from '../components/Header';

const LayoutWebsite = (props) => {
    return (
        <div>
            <Header />
            <hr />
            {props.children}

            <Footer/>
        </div>
    )
}

export default LayoutWebsite
