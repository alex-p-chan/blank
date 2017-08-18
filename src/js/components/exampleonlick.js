import React from "react"
import {connect} from "react-redux"
import {fetchUsers} from "../actions/userActions"
@connect((store)=>{
    return{
users:store.users.users,
usersFetched:store.users.fetched
    };
})

export default class Layout extends React.Component{
    fetchUsers(){
        this.props.dispatch(fetchUsers())  
    }
    render(){
        const{ users}=this.props;
        if (users.length==0)
  return <button className='btn' onClick={this.fetchUsers.bind(this)}>load more</button>

  const mappedUsers = users.map(user=><li key={user.userID}>{user.userName}</li>)
return <ul>{mappedUsers}</ul>
}
}