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
    this.deleteSmurf = this.deleteSmurf.bind(this)
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
  deleteSmurf(e, id){
    e.preventDefault();
    console.log(id);

    axios.delete(`http://localhost:3333/smurfs/${id}`)
    .then(res => this.setState({smurfs: res.data}))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          <NavLink to="/" style={{marginRight: "50px"}}>Smurfs</NavLink>
          <NavLink to="/smurf-form">
          Add A Smurf</NavLink>

        </div>


        <Route path="/" exact render={props => <Smurfs {...props} deleteSmurf={this.deleteSmurf} smurfs={this.state.smurfs} />} />
        <Route path="/smurf-form" exact render={props => <SmurfForm {...props} updateSmurfs={this.updateSmurfs}/>} />


        

        
      </div>
    );
  }
}

export default App;
