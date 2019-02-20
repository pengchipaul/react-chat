import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import Badge from 'react-bootstrap/Badge';

class SignedInLinks extends React.Component {

    render() {
        return (
            <div className="AppBar">
                <NavBar bg="dark" expand="lg" variant="dark" stick="top">
                    <Link to="/" className={"navbar-brand"}>PA Chat</Link>
                    <NavBar.Toggle aria-controls="signed-in-links" />
                    <NavBar.Collapse id="signed-in-links">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/dashboard">Home</Link>
                            <Link className="nav-link" to="/friends">Friends</Link>
                            <Link className="nav-link" to="/groups">Groups</Link>
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </Nav>
                        <Link className="nav-link btn btn-primary text-white mr-2 mb-md-2 mb-sm-2 mb-lg-0" to="/notifications">Notifications
                            <Badge className="ml-2" variant="light">5</Badge>
                            <span className="sr-only">unread messages</span>
                        </Link>
                        <SearchBar/>
                    </NavBar.Collapse>
                </NavBar>
            </div>
        );
    }
}

export default SignedInLinks;