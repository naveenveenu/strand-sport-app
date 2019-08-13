import React from 'react';
import axios from 'axios';
import App from '../App';

const columnStyle = {
 maxWidth: 450,
 position: 'relative',
 marginTop: 100
};


export default class Home extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
      UserName: '',
      Password: '',
      successfulLogin: false,
      adminLoginSuccess: false,
    };
    this.loginTo = this.loginTo.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  loginTo(e) {
      console.log('login....');
      let userCredentials = {"userName": this.state.UserName, "password": this.state.Password, "@class" : ".AuthenticationRequest"};
      axios.post('https://y384716iGW5P.preview.gamesparks.net/rs/debug/btxhd6ZiPxN5CWfkGiAM25pmCDA9NwG7/AuthenticationRequest', userCredentials)
          .then(res => {
            console.log(res.data);
            console.log(res.data.userId)
            if (res.data.userId) {
              console.log('login successful');
              this.state.UserId = res.data.userId;
              var adminLoginSuccess = false;
              if(this.state.UserName === "naveen" && this.state.Password === "naveen123") {
                adminLoginSuccess = true;
              }
              this.setState({
                successfulLogin: true,
                adminLoginSuccess,
              });
            }else{
              console.log("Login Not Successful")
            }
          })
          .catch(function (error){
              console.log(error);
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

  render(){
    return(
      <div>
        {this.state.successfulLogin? <App showAdmin={this.state.adminLoginSuccess} />:  <div class ="ui middle aligned center aligned grid">
        <div class="column" style={columnStyle}>
          <h2 class="ui teal header">
            <div class="content">
                Please Log-in here
            </div>
          </h2>
          <form class="ui large form">
            <div class="ui stacked segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"/>
                  <input type="text" name="userName" onChange={this.state.onUserNameChange} ></input>
                </div>
              </div>

              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"/>
                  <input type="password" name="password" onChange={this.state.onPasswordChange} ></input>
                </div>
              </div>
              <div class="ui fluid large teal submit button" onClick={this.loginTo}>Login</div>
            </div>
            <div class="ui error message"></div>
          </form>
        </div>
      </div>}
      </div>
    );
  }
}
