import React from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

export default class Standings extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      standingsData: []
    }
  }
  componentDidMount(){
    let tournamentData = {"@class": ".LogEventRequest", "eventKey": "TournamentLeaderBoard", "tournamentId": this.props.tournamentId, "playerId":this.props.userId};
    axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/LogEventRequest', tournamentData)
      .then(res => {
        console.log(res.data);
          var standingsData = res.data.scriptData.leaderboardDetails;
          this.setState({standingsData});
      });
  }


  render(){
    return(
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>TEAMS</Table.HeaderCell>
              <Table.HeaderCell>Played</Table.HeaderCell>
              <Table.HeaderCell>Won</Table.HeaderCell>
              <Table.HeaderCell>Lost</Table.HeaderCell>
              <Table.HeaderCell>TMPW</Table.HeaderCell>
              <Table.HeaderCell>TML</Table.HeaderCell>
              <Table.HeaderCell>TP</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {this.state.standingsData.map(function(key, ind){
            return (
              <Table.Row>
                <Table.Cell collapsing>{key.teamName}</Table.Cell>
                <Table.Cell collapsing>{key.MatchesPlayed}</Table.Cell>
                <Table.Cell collapsing>{key.wins}</Table.Cell>
                <Table.Cell collapsing>{key.losses}</Table.Cell>
                <Table.Cell collapsing>{key.TMW}</Table.Cell>
                <Table.Cell collapsing>{key.TML}</Table.Cell>
                <Table.Cell collapsing>{key.pointsWon}</Table.Cell>
              </Table.Row>
            )
          })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
