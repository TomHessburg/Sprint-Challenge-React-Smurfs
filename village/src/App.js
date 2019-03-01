import React, { Component } from 'react';
import axios from 'axios'
import { Route, NavLink } from 'react-router-dom'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
  
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };

    this.updateSmurfs = this.updateSmurfs.bind(this)
  }

  componentDidMount(){
    axios.get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState({
          smurfs: res.data
        }
      )})
      .catch(err => console.log(err))
  }

  updateSmurfs(newSmurfs){
    console.log(newSmurfs.data)
    this.setState({
      smurfs: newSmurfs.data
    })
  }

  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          <NavLink to="/">Smurfs</NavLink>
          <NavLink to="/smurf-form">
          Add A Smurf</NavLink>

        </div>


        <Route path="/" exact render={props => <Smurfs {...props} smurfs={this.state.smurfs} />} />
        <Route path="/smurf-form" exact render={props => <SmurfForm {...props} updateSmurfs={this.updateSmurfs}/>} />


        

        
      </div>
    );
  }
}

export default App;
