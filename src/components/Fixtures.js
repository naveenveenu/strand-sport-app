import React from 'react';
import {Card, Image} from 'semantic-ui-react';

import teamSrc from ".././resources/badmintonLogo.jpg";


export default class Fixtures extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      a : [],
      b : [],
    }
  }
  componentWillMount(){
    {
      this.setState({
      a: [teamSrc, teamSrc, teamSrc, teamSrc, teamSrc],
      b: [teamSrc, teamSrc, teamSrc, teamSrc],
      });
      
    }
  }
  render(){
    return(
     <div>
       <Card.Group>
       <Card fluid color='red'>
          <Card.Content textAlign='center'>
            <Image size='small' src={teamSrc} floated='left' />
            <Image size='small' src={teamSrc} floated='right'/>
            <Card.Content textAlign='center' >
            <Card.Header bold >Naveen</Card.Header>
            <Card.Header bold >Naveen</Card.Header>
            </Card.Content>
            
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
        </Card>
       </Card.Group>
        
     </div>
    );
  }
}
