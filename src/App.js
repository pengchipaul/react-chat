import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AppBar from './components/layout/AppBar';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <div className="App">
                    <AppBar/>
                    <Switch>
                        <Route exact path="/"/>
                        <Route path="/dashboard" component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}

export default App;
