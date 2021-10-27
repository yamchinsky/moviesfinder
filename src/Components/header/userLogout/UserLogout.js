import React from 'react'

import { ReactComponent as LogoutSvg } from '../../../assets/icons/logout.svg'
import '../userLogout/logOut.scss'

import { useDispatch, useSelector } from 'react-redux'
import { getUserId, userLogout } from '../../../redux/slices/userSlice'

const UserLogout = () => {
	const dispatch = useDispatch()
	const id = useSelector(getUserId)
	const handleLogout = () => {
		dispatch(userLogout({ id: id }))
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
