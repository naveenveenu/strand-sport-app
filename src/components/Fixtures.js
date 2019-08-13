import React from 'react';
import {Card, Image, Segment, Grid, Divider} from 'semantic-ui-react';

import teamSrc from ".././resources/badmintonLogo.jpg";


export default class Fixtures extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      a : [],
      b : [],
      playersJson: {},
    }
  }

  componentWillMount(){
    {
      this.setState({
      a: [teamSrc, teamSrc, teamSrc, teamSrc, teamSrc],
      b: [teamSrc, teamSrc, teamSrc, teamSrc],
      });

    }
    var expectedJson = [
      {
        "Name": "Team1",
        players: [{
          "Name": "Player1",
          "ProfilePic": ""
        }]
      },{
        "Name": "Team2",
        players: [{
          "Name": "Player1",
          "ProfilePic": ""

        }]
      },
    ];
    console.log("Keyssss", Object.keys(expectedJson));
    this.setState({
      playersJson: expectedJson,
    })
  }

  render(){
    return(
       <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
              <Image size='small' src={teamSrc} floated='left' />
              <h1>Team1</h1>
              {this.state.playersJson[0].players.map(function(key, ind){
                return <li>{key.Name}</li>
              }) }

          </Grid.Column>

          <Grid.Column verticalAlign='middle'>
            <Image size='small' src={teamSrc} floated='right'/>
            <h1>Team2</h1>
            {this.state.playersJson[1].players.map(function(key, ind){
              return <li>{key.Name}</li>
            }) }
          </Grid.Column>
        </Grid>

        <Divider vertical>V/S</Divider>
      </Segment>
    );
  }
}
