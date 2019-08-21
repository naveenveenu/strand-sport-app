import React from 'react';
import {Component} from 'react';
import {Dropdown, Menu, Container} from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDialog from './components/AdminDialog';
import Standings from './components/Standings';
import Teams from './components/Teams';
import Gallery from './components/Gallery';
import Fixtures from './components/Fixtures';
import Rules from './components/Rules';
import Home from './components/Home';
import Modal from './components/Modal/Modal';

import logo from './resources/strandLogo.png';

class App extends Component {
  state = { activeItem: 'home', show : 'false' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
      return <Fixtures userId={this.props.UserId} tournamentId ={this.props.TournamentId}/>
    if(this.state.item === 'rules')
      return <Rules />
    if(this.state.item === 'admin')
      return <AdminDialog userId={this.props.UserId} tournamentId ={this.props.TournamentId} />;
    return <div> This is Home Page </div>
  }

  render() {
    const { activeItem } = this.state
    return (
      <Container fluid>
      <Router>
        <Menu size='large'>
        <Menu.Item onClick={this.selected} size="big"><img src={logo}/></Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item id="home" onClick={this.selected} name='home' active={activeItem === 'home'} />

            <Menu.Item href="#fixtures" id="fixtures" onClick={this.selected} name='Fixtures'active={activeItem === 'messages'} />

            <Dropdown item text='Standings' onClick={this.selectedItem} id="standings">
              <Dropdown.Menu>
                <Dropdown.Item  id="standings_2017">2017</Dropdown.Item>
                <Dropdown.Item  id="standings_2019">2019</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text='Teams' onClick={this.selectedItem} id="teams">
              <Dropdown.Menu>
                <Dropdown.Item  id="teams_2017">2017</Dropdown.Item>
                <Dropdown.Item  id="teams_2019">2019</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text='Gallary' onClick={this.selectedItem} id="gallary">
              <Dropdown.Menu>
                <Dropdown.Item id="gallery_2017">2017</Dropdown.Item>
                <Dropdown.Item id="gallery_2019">2019</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item href="#rules" name='Rules' id="rules" active={activeItem === 'rules'} />
            {this.props.showAdmin?<Menu.Item><Link id="admin" onClick={this.selected} to="/login">Admin</Link></Menu.Item>:<div />}
          </Menu.Menu>
        </Menu>
        {this.loadComponent()}
      </Router>
      </Container>
    );
  }
}

export default App;
