import React from 'react';
import './Navigation.css';


const Navigation = props => {
    return (
        <div className="navigation">
            <img className="logo" src="https://i.ibb.co/jGNRvPV/logo.png" alt="logo"/>
            <form onSubmit={props.submitSearch}><input className="search" onChange={props.searchChangeHandler} placeholder="Search Movies" name="search"/></form>
        </div>
    )
}

export default Navigation;