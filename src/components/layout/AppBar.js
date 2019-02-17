import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

class AppBar extends React.Component{

    render(){
        return(
          <div className="AppBar">
            <NavBar bg="dark" expend="lg" variant="dark">
                <Link to="/" className={"navbar-brand"}>PA Chat</Link>
                <Nav className="mr-auto">
                    <Link className={'nav-link'} to={"/dashboard"}>Home</Link>
                </Nav>
            </NavBar>
          </div>
        );
    }
}

export default AppBar;