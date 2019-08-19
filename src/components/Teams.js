import React from 'react';
import {Card, Image} from 'semantic-ui-react';
import axios from 'axios';


import teamSrc from ".././resources/badmintonLogo.jpg";

export default class Teams extends React.Component{
  constructor(props){
    super(props)
    // this.state["a"] = [];
    // this.state["b"] = [];
    this.state = {a: []};
    this.state = {b: []};
    this.state = {Tournament : '5d3d3ad413e61004e5c0ffc8-1564298778175'};
    //   b: [],
    //   Tournament: '5d3d3ad413e61004e5c0ffc8-1564298778175',
    // };
  }
 
  componentWillMount(){
    {
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

      this.setState({
        a: [{"image": teamSrc, "teamName": "Bad-Minions"}, {"image": teamSrc, "teamName": "Dracarys"},
              {"image": teamSrc, "teamName": "Padiayppas"}, {"image": teamSrc, "teamName": "Hurricanes"},
              {"image": teamSrc, "teamName":"One-Eyed-Jacks"}, {"image": teamSrc, "teamName":"Satte-Pe-Satta"}, 
              {"image": teamSrc, "teamName": ""}],
        b: [teamSrc, teamSrc, teamSrc, teamSrc, teamSrc],
      });
    }
  }

  render(){
    return(
      <div >
        {this.props.year == "2017" ?
          <Card.Group>{this.state.a.map(function(val, ind){
            return(
              <Card>
                <Image src={val.image} />
                <Card.Content textAlign='center'>
                  <Card.Header>{val.teamName}</Card.Header>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>:<Card.Group>{this.state.b.map(function(val, ind){
          return(
            <Card>
                <Image src={teamSrc}/>
                <Card.Content textAlign='center'>
                  <Card.Header>Bad-Minions</Card.Header>
                </Card.Content>
              </Card>
          )
        })}
        </Card.Group>
        }
      </div>

       

    );
  }
}
