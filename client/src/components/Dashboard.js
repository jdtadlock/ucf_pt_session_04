import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>{this.props.email}</p>
      </div>
    );
  }
}

export default Dashboard;
