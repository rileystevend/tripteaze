const express = require('express');
 // need to create /////////
//const bcrypt = require('bcrypt-nodejs');

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      pw: '',
    }
  }

  userName() {
    this.setState({
      username: this.target.value
    })
  }

  password() {
    this.setState({
      pw: this.target.value
    })
  }

  clickHandle() {
    this.props.login(this.state.username, this.state.pw)
  }


  render () {
    return (
      <div>
        <h2>Login</h2>
        <div>
          <label for="username">Username:</label>
          <input id="username" type="text" value={this.state.username} onChange={this.userName.bind(this)}/>
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" type="password" value={this.state.pw} onChange={this.password.bind(this)}/>
        </div>
        <div>
          <button onClick={this.clickHandle.bind(this)}> Login </button>
        </div>
      </div>
    )
  }
}
