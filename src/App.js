import './App.css';
import React,{Fragment,useState} from 'react';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import Users from './Components/users/Users';
import User from './Components/users/User'
import Search from './Components/users/Search'
import Alert from './Components/layout/alert';
import About from './Components/pages/About';
import axios from 'axios';

const App =() =>{

  // initials
  const [users, setusers] = useState([]);
  const [user, setuser] = useState({});
  const [repos, setrepos] = useState([]);
  const [loading, setloading] = useState(false);
  const [alert, setalert] = useState(null);
 
  // async componentDidMount(){
  
  //  this.setState({loading:true});

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  //   this.setState({ users:res.data, loading:false })

  // }


  // Search git hub users
  const searchUsers = async text =>{

   setloading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setusers(res.data.items);
    setloading(false);
  }


 // get single github user 
 const getUser = async username => {

  setloading(true);

  const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  setuser(res.data);
  setloading(false);

}

// get User's Repositories

 const getUserRepos = async username =>{
  setloading(true);

  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
  setrepos(res.data);
  setloading(false);
}

  // clear users after searching
 const clearUsers = () =>{
    setusers([]);
    setloading(false)
    }
  // set alert for an empty input
  const showAlert = (msg, type) => {
   
    setalert({ msg, type});
    setTimeout(() => setalert(null), 3000);
  }


    return (
      <Router>
      <div className="App">
      <Navbar/>
      <div className="container">
      <Alert alert = {alert}/>
      <Switch>
        <Route exact path = '/' render  = { props => (
          <Fragment>
        <Search
       searchUsers = {searchUsers} 
       clearUsers={clearUsers} 
       showClear ={users.length > 0 ? true :false}
        showAlert = {showAlert}
       />
      <Users
       loading = {loading} 
       users = {users}/>
          </Fragment>
        )}/>
        <Route exact path="/about" component = {About}  />
        <Route exact path="/User/:login" render = {props=>(
          <User 
          {...props}  
          getUser = {getUser} 
          getUserRepos = {getUserRepos}
          user={user} 
          repos = {repos}
          loading = {loading}/>
        )} 
         />
      </Switch>

      
      </div>
    
      </div>
      </Router>
    );
  }



export default App;
