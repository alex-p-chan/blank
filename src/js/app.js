import React from "react"
import ReactDOM from "react-dom"
import Layout from "./components/layout"
import {Provider}from "react-redux"
import css from '../css/app.scss'
import store from "./store"
import { HashRouter as Router} from 'react-router-dom'

const app=document.getElementById('app')
ReactDOM.render(<Provider store={store}><Router><Layout /></Router></Provider>, app);
