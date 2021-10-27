import React from 'react'
import '../header/header.scss'

import SearchForm from '../searchForm/SearchForm'
import UserInfo from './userInfo/UserInfo'
import UserLogout from './userLogout/UserLogout'

const Header = () => {
	return (
		<header className="header">
			<div className="header_main_container">
				<div className="header_container">
					<SearchForm />
					<UserInfo />
					<UserLogout />
				</div>
			</div>
		</header>
	)
}

export default Header
