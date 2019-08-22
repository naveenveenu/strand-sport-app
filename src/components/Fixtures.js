import React from 'react';
import {Button, Image, Segment, Grid, Divider, Label} from 'semantic-ui-react';
import axios from 'axios';


export default class Fixtures extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      a : [],
      b : [],
      playersJson: [],
    }
  }

  componentDidMount(){

    let tournamentData = {"@class": ".LogEventRequest", "eventKey": "ListMatchesInTournament", "tournamentId": this.props.tournamentId, "playerId":this.props.userId};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', tournamentData)
      .then(res => {
        console.log(res.data);
        var matches = res.data.scriptData.matches;
        var expectedJson = [];
        for(var matchId=0; matchId<matches.length; matchId++){
          var curMatch = matches[matchId];

          var team1 = curMatch.team1;
          var team2 = curMatch.team2;
          var subMatches = curMatch.subMatches;
          for(var subMatchId=0; subMatchId<subMatches.length; subMatchId++){
            var segment = [];
            var subMatch = subMatches[subMatchId];
            var t1players = subMatch.team1Players;
            var t2players = subMatch.team2Players;
            var p = false;
            if(subMatch.team1Score > subMatch.team2Score) {
              p = true;
            }
            segment.push({"Name": team1, "players": t1players, "score": subMatch.team1Score, "win": p, "trump": subMatch.team1TrumpMatch});
            segment.push({"Name": team2, "players": t2players, "score": subMatch.team2Score, "win": !p, "trump": subMatch.team2TrumpMatch});
            expectedJson.push(segment);
          }
        }
        this.setState({
          playersJson: expectedJson,
        })
      });


  }

  render(){
    return(
      <div>
        {this.state.playersJson.map(function(key, index){
          return <Segment placeholder>
           <Grid columns={2} relaxed='very' stackable>
             <Grid.Column>

                 <Image size='small' src={''} floated='left' />
                 <h1>{key[0].trump?<Label color='red'>
                  T
                </Label>:<div/>}{key[0].Name}</h1>
                 {key[0].players.map(function(key, ind){
                   return <li>{key}</li>
                 }) }

             </Grid.Column>

             <Grid.Column verticalAlign='middle'>
               <Image size='small' src={''} floated='right'/>
               <h1>{key[1].trump?<Label color='red'>
                T
              </Label>:<div/>}{key[1].Name}</h1>
               {key[1].players.map(function(key, ind){
                 return <li>{key}</li>
               }) }

             </Grid.Column>
           </Grid>

           <Divider vertical>
             <Button.Group>
               <Button  positive={key[0].win}>{key[0].score}</Button>
               <Button.Or text='34' />
               <Button  positive={key[1].win}>{key[1].score}</Button>
             </Button.Group>
           </Divider>
         </Segment>
        })}
       </div>
    );
  }
}
