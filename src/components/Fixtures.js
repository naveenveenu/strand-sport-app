import React from 'react';
import {Button,Card,Accordion, Image, Segment, Grid, Divider, Label, Header, Icon} from 'semantic-ui-react';
import axios from 'axios';


export default class Fixtures extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      a : [],
      b : [],
      status: false,
      playersJson: [],
      activeIndex: 0,
    }
  }

  componentDidMount(){
    let tournamentData = {"@class": ".LogEventRequest", "eventKey": "ListMatchesInTournament", "tournamentId": this.props.tournamentId, "playerId":this.props.userId};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', tournamentData)
      .then(res => {
        var matches = res.data.scriptData.matches;
        var expectedJson = []
        for(var matchId=0; matchId<matches.length; matchId++){
          var curMatch = matches[matchId];

          var team1 = curMatch.team1;
          var team2 = curMatch.team2;
          var subMatches = curMatch.subMatches;
          var subMatchJson = [];
          for(var subMatchId=0; subMatchId<subMatches.length; subMatchId++){
            var segment = [];
            var subMatch = subMatches[subMatchId];
            var t1players = subMatch.team1Players;
            var t2players = subMatch.team2Players;
            var p = false;
            if(subMatch.team1Score > subMatch.team2Score) {
              p = true;
            }
            segment.push({"Name": team1, "players": t1players, "score": subMatch.team1Score, "win": p, "trump": subMatch.team1TrumpMatch, matchType: subMatch.subMatchType});
            segment.push({"Name": team2, "players": t2players, "score": subMatch.team2Score, "win": !p, "trump": subMatch.team2TrumpMatch, matchType: subMatch.subMatchType});
            subMatchJson.push(segment);
          }
          let teamData = {"@class": ".LogEventRequest", "eventKey": "ListTeamsInTournament", "tournamentId": this.props.tournamentId, "playerId":this.props.userId};
          axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', teamData).then(res => {
            var existedTeams = res.data.scriptData.teams;
            console.log("response");
            var teamJson = [];
            for(var team of existedTeams) {
              if(team.teamName === team1) {
                var players = team.players;
                teamJson.push({"Name": team1, "players": players, "score": curMatch.team1Points, "MatchType": curMatch.matchType, subMatches: subMatchJson});
              }else if(team.teamName === team2) {
                teamJson.push({"Name": team2, "players": team.players, "score": curMatch.team1Points, "MatchType": curMatch.matchType,  subMatches: subMatchJson});
              }
            }
            expectedJson.push(teamJson);
            this.setState({
              status: true,
            });
          });
        }
        this.setState({
          playersJson: expectedJson,
        })
      });


  }
  handleClick = (e, titleProps) => {
      const { index } = titleProps
      const { activeIndex } = this.state
      const newIndex = activeIndex === index ? -1 : index

      this.setState({ activeIndex: newIndex })
    }

  render(){
    const { activeIndex } = this.state
    const h = this;
    return(
      <div>
        {this.state.status? this.state.playersJson.map(function(key, index){
          return <React.Fragment>
                    <Divider horizontal>
                      <Header as='h4'>
                        Match {index+1}
                      </Header>
                    </Divider>

                    <Segment>
                    <Grid columns={2} relaxed='very'>
                      <Grid.Column>
                      <h1>{key[0].Name}</h1>
                       {key[0].players.map(function(keyt, ind){
                         return <li>{keyt}</li>
                       }) }
                      </Grid.Column>

                      <Grid.Column floated="right">
                      <h1 style={{float: "right"}}>{key[1].Name}</h1>
                      <br />
                      <br />
                      <div style={{float: "right"}}>
                       {key[1].players.map(function(keyt, ind){
                         return <li>{keyt}</li>
                       }) }
                       </div>
                      </Grid.Column>
                    </Grid>
                    <Divider vertical>V/S</Divider>
                    <Accordion>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={h.handleClick}
      >
        <Icon name='dropdown' />
        {key[0].subMatches.length}--subMatches
      </Accordion.Title>
      <Accordion.Content active={activeIndex === -1}>
      {key[0].subMatches.map(function(subkey, index){
        return <Segment placeholder>
         <Grid columns={2} relaxed='very' stackable>
           <Grid.Column>

               <Image size='small' src={''} floated='left' />
               <h1>{subkey[0].trump?<Label color='red'>
                T
              </Label>:<div/>}{subkey[0].matchType}</h1>
               {subkey[0].players.map(function(key1, ind){
                 return <li>{key1}</li>
               }) }

           </Grid.Column>

           <Grid.Column verticalAlign='middle'>
             <Image size='small' src={''} floated='right'/>
             <h1 style={{float: "right"}}>{subkey[1].trump?<Label color='red'>
              T
            </Label>:<div/>}{subkey[1].matchType}</h1>
            <br />
            <br />
            <div style={{float: "right"}}>
             {subkey[1].players.map(function(key2, ind){
               return <li>{key2}</li>
             }) }
             </div>
           </Grid.Column>
         </Grid>

         <Divider vertical>
           <Button.Group>
             <Button  positive={key[0].win}>{key[0].score}</Button>
             <Button.Or text="" />
             <Button  positive={key[1].win}>{key[1].score}</Button>
           </Button.Group>
         </Divider>
       </Segment>
      })}
      </Accordion.Content>
    </Accordion>
                  </Segment>
                </React.Fragment>}):  <h1>Loading...</h1>
        }
       </div>
    );
  }
}
