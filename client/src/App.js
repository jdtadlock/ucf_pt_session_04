import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard';

class App extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      logged_in: false,
      user: {}
    }
  }

  componentDidMount() {
    axios.get('/isauth')
      .then(res => {
        if ( res.data.email ) {
          this.setState({
            logged_in: true,
            user: res.data
          });
        }
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  logUserIn = (e) => {
    e.preventDefault();

    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.setState({
        logged_in: true,
        user: res.data
      });
    });
  }

  registerUser = (e) => {
    e.preventDefault();

    axios.post('/register', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.setState({
        logged_in: true,
        user: res.data
      });
    });
  }

  logoutUser = () => {
    axios.get('/logout')
      .then(res => {
        this.setState({
          logged_in: false,
          user: {}
        });
      });
  }

  render() {
    return (
      <div>
        <header>
          <h3>Authentication Example</h3>
          {this.state.logged_in ? (
            <nav>
              <span>{this.state.user.email}</span>
              <button onClick={this.logoutUser}>Log Out</button>
            </nav>
          ) : ''}
        </header>
        
        <Route path="/" render={props => (
          this.state.logged_in ? <Redirect to="/dashboard" /> : (
            <div>
              <form>
                <h1>Login</h1>
                <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email" />
                <input type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password" />

                <button onClick={this.logUserIn}>Submit</button>
              </form>

              <form>
                <h1>Register</h1>
                <input type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email" />
                <input type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password" />

                <button onClick={this.registerUser}>Submit</button>
              </form>
            </div>
          )
        )} />

        <Route path="/dashboard" render={props => (
          this.state.logged_in ? <Dashboard email={this.state.user.email} /> : <Redirect to="/" />
        )} />
        
      </div>
    );
  }
}

export default App;
