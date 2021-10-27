import React from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './Loader.scss'

const AppLoader = () => {
	return (
		<div className={'loader'}>
			<Loader type="Circles" color="#FC842D" height={100} width={100} />
		</div>
	)
}

export default AppLoader
