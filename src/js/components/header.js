import React from "react"
import {connect} from "react-redux"
import {fetchUser} from "../actions/userActions"
import { Link } from 'react-router-dom'
@connect((store)=>{
    return{
user:store.user.user,
userFetched:store.user.fetched
    };
})

export default class Topbar extends React.Component{    
    componentWillMount(){
    this.props.dispatch(fetchUser(1))
}
fetchUser(){
    this.props.dispatch(fetchUser(1))  
}
    render(){
        const{ user}=this.props;
        var login;
        if (user.length==0)
            login = <a href="#" onClick={this.fetchUser.bind(this)}><span className="glyphicon glyphicon-log-in"></span> Login</a>;
else
    login=<a href="#">Welcome {user.userName}</a>;
        return (
  <header> 
      <nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>                        
      </button>
      <a className="navbar-brand" href="#">Logo</a>
    </div>
    <div className="collapse navbar-collapse" id="myNavbar">
      <ul className="nav navbar-nav">
        <li className="active"><Link to='/'>Home</Link></li>
        <li><Link to='/game'>Game</Link></li>
    </ul>

      <ul className="nav navbar-nav navbar-right">
      <li>{login}</li>
      </ul>
    </div>
  </div>
</nav>

  </header>)
}
}