import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import HomePage from "./components/home-page.component";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBFormInline} from "mdbreact";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <MDBNavbar color="indigo" dark expand="md">
          <MDBNavbarBrand>
              <img src={logo} width="30" height="30" alt="koderplace.com" />
              <Link to="/" className="navbar-brand">Silly Doubt</Link>
          </MDBNavbarBrand>
          <MDBNavbarNav left>
            <MDBNavItem>
              <Link to="/create" className="nav-link">Create Doubt</Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link to="/doubts" className="nav-link">Doubts</Link>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
          </MDBNavbar>
          <br/>
          <Route path="/" exact component={HomePage} />
          <Route path="/doubts" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
