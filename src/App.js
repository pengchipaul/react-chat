import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppNavBar from './components/layout/AppNavBar';
import ProfileContainer from './components/Profile/ProfileContainer';
import Dashboard from './components/dashboard/Dashboard';
import FriendContainer from './components/Friend/FriendContainer';
import GroupContainer from './components/Group/GroupContainer';
import Notifications from './components/Notification/Notifications';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <div className="App">
                    <AppNavBar />
                    <div>
                        <Switch>
                        <Route exact path="/" />

                        {/* Routes for auth */}
                        <GuestRoute path="/signin" component={SignIn} auth={this.props.auth}/>
                        <GuestRoute path="/signup" component={SignUp} auth={this.props.auth}/>

                        {/* Routes after signed in */}
                        <SignedInRoute path="/profile" component={ProfileContainer} auth={this.props.auth} />
                        <SignedInRoute path="/dashboard" component={Dashboard} auth={this.props.auth} />
                        <SignedInRoute path="/friends" component={FriendContainer} auth={this.props.auth} />
                        <SignedInRoute path="/groups" component={GroupContainer} auth={this.props.auth} />
                        <SignedInRoute path="/notifications" component={Notifications} auth={this.props.auth} />
                    </Switch>
                    </div>
                    
                </div>
            </BrowserRouter>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const GuestRoute = ({ component: Component, auth , ...rest }) => (
    <Route {...rest} render={props => auth.uid ? (<Redirect to="/dashboard" />) : (<Component {...props} />)} />
);

const SignedInRoute = ({ component: Component, auth , ...rest }) => (
    <Route {...rest} render={props => auth.uid ? (<Component {...props} />) : (<Redirect to="/signin" />) } />
);

export default connect(mapStateToProps)(App);
