import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Image } from 'react-bootstrap';
import AdminDialog from './components/AdminDialog';
import Standings from './components/Standings';
import Teams from './components/Teams';
import Gallery from './components/Gallery';
import Fixtures from './components/Fixtures';
import Rules from './components/Rules';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {check: true, item:'', year:''};
    this.loadComponent = this.loadComponent.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
    this.selected = this.selected.bind(this);
  }

  selectedItem(eventKey) {
    let id = eventKey.target.id;
    if(id.length !== 0) {
        let keys = id.split("_");
        this.setState({
          item: keys[0],
          year: keys[1],
        });
    }
  }

  selected(e) {
    console.log(e.target.id);
    this.setState({
      item: e.target.id,
    });
  }

  loadComponent() {
    console.log(this.state.item);
    if(this.state.item === 'standings')
      return <Standings year={this.state.year} />
    if(this.state.item === 'teams')
      return <Teams year={this.state.year} />
    if(this.state.item === 'gallery')
      return <Gallery year={this.state.year} />
    if(this.state.item === 'fixtures')
      return <Fixtures />
    if(this.state.item === 'rules')
      return <Rules />
    if(this.state.item === 'admin')
      return <Route path="/login" exact component={AdminDialog} />;
    return <Home />
  }

  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home"><Image src="./resources/logo.png" width="40" height="50" /></Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home" id="home" onClick={this.selected}>Home</Nav.Link>
                <Nav.Link href="#fixtures" id="fixtures" onClick={this.selected}>Fixtures</Nav.Link>
                <NavDropdown title="Standings" onClick={this.selectedItem} id="basic-nav-dropdown">
                  <NavDropdown.Item eventKey="2017" id="standings_2017">2017</NavDropdown.Item>
                  <NavDropdown.Item eventKey="2019" id="standings_2019">2019</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Teams" id="basic-nav-dropdown" onClick={this.selectedItem}>
                  <NavDropdown.Item href="#action/3.1" id="teams_2017">2017</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" id="teams_2019">2019</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#rules" onClick={this.selected} id="rules">Rules</Nav.Link>
                <NavDropdown title="Gallery" id="basic-nav-dropdown" onClick={this.selectedItem}>
                  <NavDropdown.Item href="#action/3.1" id="gallery_2017">2017</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" id="gallery_2019">2019</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#link"><Link id="admin" onClick={this.selected} to="/login">Admin</Link></Nav.Link>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              </Form>
          </Navbar.Collapse>
        </Navbar>
        {this.loadComponent()}
      </Router>
    );
  }
}

export default App;
