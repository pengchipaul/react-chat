import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import SearchBar from './SearchBar';
import Badge from 'react-bootstrap/Badge';
import { connect } from 'react-redux';

class AppNavBar extends React.Component {
    

    render() {

        const signedInLinks = <React.Fragment>
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
        </React.Fragment>;

        const guestLinks = <React.Fragment>
        <NavBar.Toggle aria-controls="guest-links" />
                <NavBar.Collapse id="guest-links">
                    <Nav className="ml-auto">
                        <Link className="nav-link" to="/signin">Sign in</Link>
                        <Link className="nav-link" to="/signup">Sign up</Link>
                    </Nav>
                </NavBar.Collapse>
        </React.Fragment>
        
        const displayLinks = this.props.auth.uid ? signedInLinks : guestLinks;

        return (
            <div className="AppBar">
                <NavBar bg="dark" expand="lg" variant="dark" stick="top">
                    <Link to="/" className={"navbar-brand"}>PA Chat</Link>
                    {displayLinks}

                    
                </NavBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(AppNavBar);