import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
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
                    <AppNavBar/>
                    <Switch>
                        <Route exact path="/" />

                        {/* Routes for auth */}
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />

                        {/* Routes after signed in */}
                        <Route path="/profile" component={ProfileContainer} />
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/friends" component={FriendContainer} />
                        <Route path="/groups" component={GroupContainer} />
                        <Route path="/notifications" component={Notifications} />
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default App;
