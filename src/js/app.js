import React from "react"
import ReactDOM from "react-dom"
import Layout from "./components/layout"
import {Provider}from "react-redux"
import css from '../css/app.scss'
import store from "./store"
const app=document.getElementById('app')
ReactDOM.render(<Provider store={store}><Layout /></Provider>, app);
