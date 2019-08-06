import React from 'react';
import {Card, Image} from 'semantic-ui-react';

import teamSrc from ".././resources/badmintonLogo.jpg";

export default class Teams extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      a: [],
      b: []
    };
  }
 
  componentWillMount(){
    {
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
