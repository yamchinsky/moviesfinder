import React from 'react'

import { Home } from './screens/home/container/index'
import { NotFound } from './screens/notFound/NotFound'
import { ToastContainer, Zoom } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import './App.scss'
import './assets/scss/style.scss'

import { useSelector } from 'react-redux'
import { Route, Switch, useHistory } from 'react-router'
import { CurrentBlog } from './screens'
import Doorway from './Components/doorway/Doorway'

function App() {
	const isAuth = useSelector(state => state.user.isAuth)
	const history = useHistory()
	return (
		<div className="App">
			{isAuth && history.push('./home')}
			<Switch>
				<Route exact path="/" component={Doorway} redirectTo="/home" />
				<Route path="/home" component={Home} redirectTo="/" />
				<Route path="/blog/:id" component={CurrentBlog} redirectTo="/" />
				<Route component={NotFound} />
			</Switch>

			<ToastContainer
				transition={Zoom}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	)
}

export default App
