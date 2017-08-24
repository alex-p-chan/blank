import React from "react"
import ReactDOM from "react-dom"
import Layout from "./components/layout"
import {Provider}from "react-redux"
import css from '../css/app.scss'
import store from "./store"
import { HashRouter as Router} from 'react-router-dom'
const app=document.getElementById('app')
ReactDOM.render(<Provider store={store}><Router>
    <Layout /></Router></Provider>, app);
//Imgur client: ca15dd2403ec2ce
//imgur secret:4dbe994bd3b10bc042bc6850b897bd11e223c3c7