import React from 'react';
import axios from 'axios';
import App from '../App';

const columnStyle = {
 maxWidth: 450,
 position: 'relative',
 marginTop: 100
};


export default class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
      UserName: 'naveen',
      Password: 'naveen',
      successfulLogin: false,
      adminLoginSuccess: false,
      userId: '',//Set it wherever you need by this.setState
      tournamentId: '',
    };
    this.loginTo = this.loginTo.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  setLogin(userId) {
    this.props.setLogin({
      loginStatus: true,
      userId
    })
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
              this.setState({
                userId : res.data.userId,
                tournamentId : '5d43b6c9603c3f04d855bc4c-1566933315172',
              })
              var adminLoginSuccess = false;
              if(res.data.scriptData && res.data.scriptData.isAdmin){
                adminLoginSuccess = true;
              }
              this.setLogin(res.data.userId);
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
        {this.state.successfulLogin? <App UserId={this.state.userId} TournamentId = {this.state.tournamentId} showAdmin={this.state.adminLoginSuccess} />:  <div class ="ui middle aligned center aligned grid">
        <div class="column" style={columnStyle}>
          <h2 class="ui teal header">
            <div className="content">
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
