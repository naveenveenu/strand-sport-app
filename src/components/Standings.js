import React from 'react';
import {Menu, Icon, Table, Label} from 'semantic-ui-react';

export default class Standings extends React.Component{


  componentWillMount(){
    {
      this.setState({
        pt_2019: ["Pos.", "TEAMS", "PLAYED", "WON", "LOST", "TMW", "TML", "POINTS"]
      });
    }
  }

 
  render(){
    return(
      // <div>Standings Page {this.props.year}</div>
      <div>
        <Table celled>
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell>Pos.</Table.HeaderCell>
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
      <Table.Row>
        <Table.Cell collapsing>
          <Label ribbon color='olive'>First</Label>
        </Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing >Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
        <Table.Cell collapsing>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </div>
    );
  }
}
