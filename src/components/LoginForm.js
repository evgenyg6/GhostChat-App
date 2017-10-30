import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';
import ghost from '../images/ghost.png';
import icon from '../images/icon.png';
import lock from '../images/lock.png';


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname:"",
      error:""

    };
  }

  setUser = ({user, isUser}) => {
    if(isUser) {
      this.setError("User name taken")
    } else {
      this.setError("")
      this.props.setUser(user)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { socket } = this.props
    const { nickname } = this.state
    socket.emit(VERIFY_USER, nickname, this.setUser)
  }

  handleChange = (event) => {
    this.setState({nickname:event.target.value})
  }

  setError = (error) => {
    this.setState({error})
  }

  signInClick() {
    console.log('Signed In');
  }

  signUpClick() {
    console.log('Signed Up');
  }


  render() {
    const { nickname, error } = this.state
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form" >

          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input
            ref={(input)=>{ this.textInput = input }}
            type="text"
            id="nickname"
            value={nickname}
            onChange={this.handleChange}
            placeholder={'MYCoolUSername'}
            />
            <div className="error">{error ? error:null}</div>

        </form>
      </div>
    );
  }
}

