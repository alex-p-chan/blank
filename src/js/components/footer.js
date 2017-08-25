import React from "react"
export default class Footer extends React.Component{    
   render(){
       const date=(new Date()).getFullYear()
        return (
<footer class="container-fluid text-center">
  <p>BLANK - JAM TANK - Copyright ©{date} - <a href="mailto:alex@alexpchan.com?Subject=Blank!" target="_top">Contact</a></p>
</footer>
        )
}
}