import React from 'react';
import './Navigation.css';


const Navigation = props => {
    return (
        <div className="navigation">
            <img className="logo" src="https://i.ibb.co/jGNRvPV/logo.png" alt="logo"/>
            <input className="search" onChange={props.searchChangeHandler} placeholder="Search Movies"/>
        </div>
    )
}

export default Navigation;