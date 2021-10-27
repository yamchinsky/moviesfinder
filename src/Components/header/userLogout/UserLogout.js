import React from 'react'
// import { logOut } from '../../../redux/slices/blogSlice/auth/auth.operations'
import { ReactComponent as LogoutSvg } from '../../../assets/icons/logout.svg'
import '../userLogout/logOut.scss'

import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../../redux/slices/userSlice'

const UserLogout = () => {
	const dispatch = useDispatch()
	// const id = useSelector(state => state.user.id)
	const handleLogout = () => {
		dispatch(userLogout())
	}

	return (
		<>
			<button type="button" className={'logoutBtn'} onClick={handleLogout}>
				<LogoutSvg className={'logoutSvg'} />
				<p className={'logoutText'}>Выйти</p>
			</button>
		</>
	)
}

export default UserLogout
