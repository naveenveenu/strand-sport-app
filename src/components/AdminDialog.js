import React from 'react';
import { Container, Button, Tab, Form, Table, Image, Select, Segment, Card} from 'semantic-ui-react';
import axios from 'axios';

export default class AdminDialog extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      password: '',
      Email: 'example@google.com',
      logging: 'login',
      successfulLogin: false,
      NoOfTeams: 1,
      NoOfPlayers: 1,
      open: false,
      panes: [],
      file: null,
      tableData: [],
      TeamNames: [],
      fixturesNames: [{
          text:'MD', key: 'MD', value: 'MD'
      },{
        text:'WD', key: 'WD', value: 'WD'
      },{
        text:'MixD', key: 'MixD', value: 'MixD'
      },{
        text:'Single', key: 'Single', value: 'Single'
      }
    ],
      playersData: [],
      Tournament: '5d3d3ad413e61004e5c0ffc8-1564298778175',
      UserId: null
    };
    this.selectTFixture = this.selectTFixture.bind(this);
    this.selectPlayers = this.selectPlayers.bind(this);
    this.selectFixture = this.selectFixture.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeTeam = this.removeTeam.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onLoginOptionChange = this.onLoginOptionChange.bind(this);
    this.prevent = this.prevent.bind(this);
    this.handleChangeTeams = this.handleChangeTeams.bind(this);
    this.handleChangePlayers = this.handleChangePlayers.bind(this);
    this.getTeamsTab = this.getTeamsTab.bind(this);
    this.getPlayersTab = this.getPlayersTab.bind(this);
    this.updateScoresTab = this.updateScoresTab.bind(this);
    this.getFixturesTab = this.getFixturesTab.bind(this);
    this.listTeams = this.listTeams.bind(this);
  }

  fileInputRef = React.createRef();
  fileChange = e => {
    this.setState({ file: URL.createObjectURL(e.target.files[0]) }, () => {
      console.log(e);
      console.log("File chosen --->",this.state.file  );
    });
  };
  handleChangeTeams(e) {
    // console.log(e.target.value);
    this.setState({
      NoOfTeams: e.target.value,
    });
  }

  handleChangePlayers(e) {
    // console.log(e.target.value);
    this.setState({
      NoOfPlayers: e.target.value,
    });
  }

  onLoginOptionChange(e, {value}) {
    console.log(e.target.id);
    this.setState({
      logging: value,
    });
  }

  addPlayer(e) {
    e.preventDefault();
    console.log("Adding Player", document.getElementById("teams").selected, document.getElementById("teams").value);
    let playersData = this.state.playersData;
    let Name = document.getElementById('Name').value;

    playersData.push({
      Name,
      TeamName: document.getElementById("teams").value,
      Photo: document.getElementById('filePath').value,
    });

    document.getElementById('Name').value = '';
    document.getElementById('filePath').value = '';
    document.getElementById('filePath').innerHTML = '';
    this.setState({
      playersData,
    })
  }

  listTeams(e) {
    let tournamentData = {"@class": ".LogEventRequest", "eventKey": "ListTeamsInTournament", "tournamentId": this.state.Tournament};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', tournamentData)
      .then(res => {
        console.log(res.data);
        let teams = res.data.teams;
        this.state.tableData = [];
        teams.forEach(team => {
          this.state.tableData.push({
            Name: team.teamName,
            Logo: team.metaData.LogoPath
          });
        });
      });
  }

  addTeam(e) {
    console.log("User ID", this.props.userId); //Pass this value to the required component
    e.preventDefault();
    let tableData = this.state.tableData;
    let TeamNames = this.state.TeamNames;

    let Name = document.getElementById('Name').value;
    TeamNames.push({text:Name, key: Name, value: Name});
    let TeamLogoPath = document.getElementById('filePath').value;

    tableData.push({
      Name: Name,
      Logo: TeamLogoPath,
    });

    let teamData = {"@class": ".LogEventRequest", "eventKey": "AddTeamToTournament", "teamName": Name, "tournamentId" : this.state.Tournament, "pool":"A", "metaData": {"LogoPath": TeamLogoPath}};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', teamData)
      .then(res => console.log(res.data));

      this.setState({
        tableData,
        TeamNames,
        file: null,
      })
    console.log('Registered successfully');

    document.getElementById('Name').value = '';
    document.getElementById('filePath').value = '';
    document.getElementById('filePath').innerHTML = '';
  }

  removePlayer(e, k) {
    e.preventDefault();
    console.log(e, k.id);
    let tableData = this.state.tableData;
    tableData.splice(k.id, 1);
    this.setState({
      tableData,
    });
  }
  removeTeam(e, k) {
    e.preventDefault();
    console.log(e, k.id);
    let tableData = this.state.tableData;
    tableData.splice(k.id, 1);
    this.setState({
      tableData,
    });
  }

// =============================================================================
// =============================================================================
// =============================================================================


  onSubmit(e) {
    e.preventDefault();
    console.log("Came into submit method")
    if(this.state.logging === "login") {
      /*let userCredentials = {UserName: this.state.UserName, Password: this.state.Password};
      axios.get('http://localhost:4000/strand/login/'+this.state.UserName, userCredentials)*/
      let userCredentials = {"userName": this.state.UserName, "password": this.state.Password, "@class" : ".AuthenticationRequest"};
      axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/AuthenticationRequest', userCredentials)
          .then(res => {
            console.log(res.data);
            console.log(res.data.userId)
            if (res.data.userId) {
              console.log('login successful');
              this.state.UserId = res.data.userId;
              this.setState({
                successfulLogin: true
              });
            }else{
              console.log("Login Not Successful")
            }
          })
          .catch(function (error){
              console.log(error);
          });

    } else {
      /*let userCredentials = {UserName: this.state.UserName, Email: this.state.Email};
      axios.post('http://localhost:4000/strand/login', userCredentials)*/
      console.log("came into else part")
      let userCredentials = {"userName": this.state.UserName, "displayName": "", "password": this.state.Password, "segments": {}, "@class" : ".RegistrationRequest"};
      axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/RegistrationRequest', userCredentials)
          .then(res => {
            console.log(res.data)
            if (res.data.userId) {
              this.state.UserId = res.data.userId;
              this.setState({
                UserName: '',
                Email: '',
                Password:'',
                successfulLogin: true
              });
            }
          });
      console.log('Registered successfully');
    }
  }

  onEmailChange(e) {
      this.setState({
        Email: e.target.value,
      });
  }

  onUserNameChange(e) {
    this.setState({
      UserName: e.target.value,
    });
  }

  onPasswordChange(e) {
    this.setState({
      Password: e.target.value,
    });
  }

  prevent(e) {
    e.preventDefault();
  }

  getTeamsTab(){
    return (<div>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='First Name' id="Name"/>
    </Form.Field>
    <Form.Field>
      <label>Logo</label>
      <input id="filePath" placeholder='Logo Path' value={this.state.file}/>
          <Button
            content="Choose File"
            labelPosition="left"
            icon="file"
            onClick={() => this.fileInputRef.current.click()}
          />
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            onChange={this.fileChange}
          />
    </Form.Field>
    <Button type="submit" onClick={this.addTeam}>
      Submit
    </Button>
    </Form>

    <Table basic celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Logo</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {this.state.tableData.map((data, key) =>{
      console.log(data, key);
      return (<Table.Row>
      <Table.Cell>{data.Name}</Table.Cell>
      <Table.Cell><Image src={data.Logo} size='tiny' circular /></Table.Cell>
      <Table.Cell><Button id={key} circular color='red' icon='remove' onClick={this.removeTeam} /></Table.Cell>
    </Table.Row>)})}
    </Table.Body>
  </Table></div>);
  }
  getPlayersTab(){
    return (<div>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='First Name' id="Name"/>
    </Form.Field>
    <Form.Field>
    <Select placeholder='Select Team' id="team" options={this.state.TeamNames} />
    </Form.Field>
    <Form.Field>
      <label>Logo</label>
      <input id="filePath" placeholder='Logo Path' value={this.state.file}/>
          <Button
            content="Choose File"
            labelPosition="left"
            icon="file"
            onClick={() => this.fileInputRef.current.click()}
          />
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            onChange={this.fileChange}
          />
    </Form.Field>
    <Button type="submit" onClick={this.addPlayer}>
      Submit
    </Button>
    </Form>

    <Table basic celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Team Name</Table.HeaderCell>
        <Table.HeaderCell>Logo</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>
    <Table.Body>
    {this.state.playersData.map((data, key) =>{
      console.log(data, key);
      return (<Table.Row>
      <Table.Cell>{data.Name}</Table.Cell>
      <Table.Cell>{data.TeamName}</Table.Cell>
      <Table.Cell><Image src={data.Photo} size='tiny' circular /></Table.Cell>
      <Table.Cell><Button id={key} circular color='red' icon='remove' onClick={this.removePlayer} /></Table.Cell>
    </Table.Row>)})}
    </Table.Body>
  </Table></div>)
  }

  selectFixture(e, key) {
    console.log('which fixture', key.value);
    this.setState({
      selectedFixture:key.value,
    });
  }

  selectTFixture(e, key, selectedFixture) {
    let playersData = this.state.playersData;
    let ar = [];
    for(let player of playersData) {
      console.log(key.value, player);
      if(key.value === player.TeamName) {
        ar.push({
          key: player.Name,
          value: player.Name,
          text: player.Name,
        });
      }
    }
    if(selectedFixture === "fixtureTeam1") {

      this.setState({
        mixPlayers1:ar,
      });
    }else {
      this.setState({
        mixPlayers2: ar,
      });
    }
    console.log('which fixture',e, key.value);
  }

  getFixtureTypes(ftype){
    return <Select placeholder='Select Play' id={"fixture"+ftype} onChange={this.selectFixture} options={this.state.fixturesNames} />
  }

  selectPlayers(ftype){
    return <div><Select placeholder='Select Player' multiple options={this.state.mixPlayers1} /><Select placeholder='Select Player' multiple options={this.state.mixPlayers2} /></div>
  }

  getFixturesTab(){
    return <div>
      <div>
        <Select placeholder='Select Team' id={"teamA"} onChange={(e, key) => this.selectTFixture(e, key, "fixtureTeam1")} options={this.state.TeamNames} />
        {'  V/S  '}
        <Select placeholder='Select Team' id={"teamB"} onChange={(e, key) => this.selectTFixture(e, key, "fixtureTeam2")} options={this.state.TeamNames} />
      </div>
    <Card.Group>
      <Card  color='red'  >
        <Card.Content>
          <Card.Header>TeamA vs TeamB</Card.Header>
          <Card.Meta>Play1</Card.Meta>
          <Card.Description>
            {this.getFixtureTypes('first')}
            {this.selectPlayers()}
          </Card.Description>
        </Card.Content>
      </Card>

      <Card  color='orange'  >
        <Card.Content>
          <Card.Header>TeamA vs TeamB</Card.Header>
          <Card.Meta>Play2</Card.Meta>
          <Card.Description>{this.getFixtureTypes('second')}{this.selectPlayers()}</Card.Description>

        </Card.Content>
      </Card>

      <Card  color='yellow'  >
        <Card.Content>
          <Card.Header>TeamA vs TeamB</Card.Header>
          <Card.Meta>Play2</Card.Meta>
          <Card.Description>{this.getFixtureTypes('third')}{this.selectPlayers()}</Card.Description>
        </Card.Content>
      </Card>

      <Card  color='green'  >
        <Card.Content>
          <Card.Header>TeamA vs TeamB</Card.Header>
          <Card.Meta>Play2</Card.Meta>
          <Card.Description>{this.getFixtureTypes('fourth')}{this.selectPlayers()}</Card.Description>
        </Card.Content>
      </Card>
  </Card.Group>
  </div>
  }
  updateScoresTab(){
    return(<div/>)
  }
  componentWillMount(){
    const panes = [
  { menuItem: 'Teams', render: () => <Tab.Pane attached={false}>{this.getTeamsTab()}</Tab.Pane> },
  { menuItem: 'Players', render: () => <Tab.Pane attached={false}>{this.getPlayersTab()}</Tab.Pane> },
  { menuItem: 'UpdateScores', render: () => <Tab.Pane attached={false}>{this.updateScoresTab()}</Tab.Pane> },
  { menuItem: 'Fixtures', render: () => <Tab.Pane attached={false}>{this.getFixturesTab()}</Tab.Pane> },
]
this.setState({
  panes,
})
  }


  render(){
    return(
      <Container style={{marginTop:'10px' }} >
        <Tab menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
      </Container>
    );
  }
}
