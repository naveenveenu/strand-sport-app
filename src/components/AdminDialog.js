import React from 'react';
import { Container, Button, Tab, Form, Table, Image, Select, Segment, Card} from 'semantic-ui-react';
import axios from 'axios';
import Login from './Login';

export default class AdminDialog extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      password: '',
      Email: 'example@google.com',
      logging: 'login',
      successfulLogin: false,
      selectedTeam: '',
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
      Tournament: this.props.tournamentId,
      UserId: this.props.userId,
    };
    this.setLogin = this.setLogin.bind(this);
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
    this.selectedTeam = this.selectedTeam.bind(this);

    // this.listTeams();
  }

  selectedTeam(e, data) {
    console.log(e);
    this.setState({
      selectedTeam: data.text,
    })

    console.log(data)
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

  // addPlayer(e) {
  //   e.preventDefault();
  //   console.log("Adding Player", document.getElementById("team").selected, document.getElementById("team").value);
  //   let playersData = this.state.playersData;
  //   let playerNames = document.getElementById('Name').value;
  //   console.log(this.state.TeamNames)
  //   let TeamName = document.getElementById("team").text;
    
  //   console.log(playerNames)
  //   console.log(TeamName)

  //   playersData.push({
  //     playerNames,
  //     TeamName,
  //     Photo: document.getElementById('filePath').value,
  //   });

  //   let playerData = {"@class": ".LogEventRequest", 
  //                   "eventKey": "AddPlayerToTournamentTeam", 
  //                   "teamName": TeamName, 
  //                   "players": [playerNames], 
  //                   "tournamentId" : this.state.Tournament};

  //   axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', playerData)
  //     .then(res => console.log(res.data));

  //     this.setState({
  //       playersData,
  //       file: null,
  //     })

  //   document.getElementById('Name').value = '';
  //   document.getElementById('filePath').value = '';
  //   document.getElementById('filePath').innerHTML = '';
  //   this.setState({
  //     playersData,
  //   })
  // }

  listTeams(e) {
    console.log("list teams", this.props.tournamentId, this.state.userId);
    let tournamentData = {"@class": ".LogEventRequest", "eventKey": "ListTeamsInTournament", "tournamentId": this.props.tournamentId, "playerId":this.state.userId};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', tournamentData)
      .then(res => {
        let teams = res.data.scriptData.teams;
        this.updateTeams(teams);
      });
  }

  addTeam(e) {
    console.log("User ID", this.props.userId); //Pass this value to the required component
    console.log("tournament ID", this.props.tournamentId)
    e.preventDefault();
    console.log("User ID", this.state.UserId);
    let tableData = this.state.tableData;
    let TeamNames = this.state.TeamNames;
    console.log(this.state.UserId)

    let Name = document.getElementById('Name').value;
    let TeamLogoPath = document.getElementById('filePath').value;
    let teamNameExists = false;
   
    if (Name) {
      TeamNames.forEach(teamName => {
        if(teamName.text == Name){
          teamNameExists = true;
        }
      });

      if (!teamNameExists){
        this.addTeamInServer(Name, TeamLogoPath)
      }
    }
    document.getElementById('Name').value = '';
    document.getElementById('filePath').value = '';
    document.getElementById('filePath').innerHTML = '';
  }

  addPlayer(e) {
    e.preventDefault();
    console.log("Adding Player", document.getElementById("team").selected, document.getElementById("team").value);
    let playersData = this.state.playersData;
    let playerName = document.getElementById('Name').value;
    let TeamName = this.state.selectedTeam;
    let playerExists = false;
    console.log(playerName)
    console.log(TeamName)

    if(playerName){
      playersData.forEach(player => {
        if(player.text == playerName){
          playerExists = true;
        }
      });

      if(!playerExists){
        this.addPlayerInServer(playerName, TeamName)
      }

    }

    document.getElementById('Name').value = '';
    document.getElementById('filePath').value = '';
    document.getElementById('filePath').innerHTML = '';
    
  }

  addPlayerInServer(playerName, TeamName){
    let playerData = {"@class": ".LogEventRequest", 
                    "eventKey": "AddPlayerToTournamentTeam", 
                    "teamName": TeamName, 
                    "players": [playerName], 
                    "tournamentId" : this.state.Tournament,
                    "playerId":this.state.UserId};

    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', playerData)
      .then(res => {
        console.log(res.data)
        if(res.data.scriptData.Response == "Success"){
          this.updatePlayers(res.data.scriptData.validPlayers)
          console.log('Player added successfully');
        }
      });
  }

  updatePlayers(playerNames){
    if(playerNames && playerNames.length > 0){
      playerNames.forEach(playerName => {
        this.state.playersData.push ({text: playerName});
      });
    }
  }

  addTeamInServer(Name, TeamLogoPath){
    let teamData = {"@class": ".LogEventRequest", "eventKey": "AddTeamToTournament", "teamName": Name, "tournamentId" : this.props.tournamentId, "pool":"A", "metaData": {"LogoPath": TeamLogoPath}, "playerId":this.state.UserId};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', teamData)
      .then(res => { 
        console.log(res.data)
        if (res.data.scriptData.Response == "Success") {
          this.updateTeams(res.data.scriptData.teams);
          console.log('Registered successfully');
          this.state.file = null;
        }
      });
  }

  updateTeams(teams){
    let tableData = [];
    let TeamNames = [];
    if (teams) {
      teams.forEach(team => {
        tableData.push({
          Name: team.teamName,
          Logo: team.metaData.LogoPath,
        });
        TeamNames.push({
          text: team.teamName,
          key: team.teamName,
          value: team.teamName
        })
      });            
    }

    this.setState({
      tableData,
      TeamNames,
    });
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
    let removeTeam = {
      "@class": ".LogEventRequest",
      "eventKey": "RemoveTeam",
      "tournamentId": this.state.Tournament,
      "teamName": k.id,
      "playerId":this.state.UserId};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', removeTeam)
      .then(res => { 
        console.log(res.data)
        let tableData = this.state.tableData;
        tableData.splice(k.id, 1);

        this.setState({
          tableData,
        })

      });
    }



  //   e.preventDefault();
  //   console.log(e, k.id);
  //   let tableData = this.state.tableData;
  //   tableData.splice(k.id, 1);
  //   this.setState({
  //     tableData,
  //   });
  // }

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
              console.log(this.props.state.UserId);
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
      <Table.Cell><Button id={data.Name} circular color='red' icon='remove' onClick={this.removeTeam} /></Table.Cell>
    </Table.Row>)})}
    </Table.Body>
  </Table></div>);
  }



  getPlayersTab(){
    return (<div>
      <Form>
    <Form.Field>
      <label>Name</label>
      <input placeholder='Full Name' id="Name"/>
    </Form.Field>
    <Form.Field>
    <Select placeholder='Select Team' id="team" onChange={this.selectedTeam} options={this.state.TeamNames} />
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
    <Card.Group itemsPerRow ={2}>
      <Card  color='red'  >
        <Card.Content>
          <Card.Header>Men's Double-I</Card.Header>
          <Card.Description>
            {this.getFixtureTypes('first')}
            {this.selectPlayers()}
          </Card.Description>
        </Card.Content>
      </Card>

      <Card  color='orange'  >
        <Card.Content>
          <Card.Header>Men's Double-II</Card.Header>
          <Card.Description>{this.getFixtureTypes('second')}{this.selectPlayers()}</Card.Description>

        </Card.Content>
      </Card>

      <Card  color='yellow'  >
        <Card.Content>
          <Card.Header>Woman's Double</Card.Header>
          <Card.Description>{this.getFixtureTypes('third')}{this.selectPlayers()}</Card.Description>
        </Card.Content>
      </Card>

      <Card  color='green'  >
        <Card.Content>
          <Card.Header>Mix Doubles</Card.Header>
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
});
  }

  setLogin(obj) {
    console.log("Admin obj", obj);
    this.setState({
      successfulLogin: obj.loginStatus,
      userId: obj.userId,
    });
    this.listTeams();
  }
 
  render(){
    return(
      <div>{this.state.successfulLogin? <Container style={{marginTop:'10px' }} >
      <Tab menu={{ secondary: true, pointing: true }} panes={this.state.panes} />
    </Container>: <Login setLogin={this.setLogin} />}</div>
      
    );
  }
}
