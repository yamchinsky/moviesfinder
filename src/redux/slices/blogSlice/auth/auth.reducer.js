import { combineReducers } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import {
	registerSuccess,
	registerError,
	loginSuccess,
	loginError,
	logoutSuccess,
	logoutError,
	getCurrentUserSuccess,
	getCurrentUserError,
} from './auth.actions'

const initialUserState = {
	email: null,
	id: null,
}

const user = createReducer(initialUserState, {
	[registerSuccess]: (_, { payload }) => ({
		email: payload.email,
		verifyToken: payload.verifyToken,
	}),

	[loginSuccess]: (_, { payload }) => ({
		email: payload.email,
		id: payload.id,
		token: payload.token,
	}),
	[getCurrentUserSuccess]: (state, { payload }) => ({
		...state,
		...payload,
	}),
	[logoutSuccess]: () => initialUserState,
})

const token = createReducer(null, {
	[registerSuccess]: () => null,
	[loginSuccess]: (_, { payload }) => payload.token,
	[logoutSuccess]: () => null,
})

const loading = createReducer(false, {
	[loginSuccess]: () => false,
	[loginError]: () => false,
	[logoutSuccess]: () => false,
	[logoutError]: () => false,
	[registerSuccess]: () => false,
	[registerError]: () => false,
	[getCurrentUserSuccess]: () => false,
	[getCurrentUserError]: () => false,
})

const error = createReducer(null, {
	[registerError]: (_, { payload }) => payload,
	[loginError]: (_, { payload }) => payload,
	[logoutError]: (_, { payload }) => payload,
	[getCurrentUserError]: (_, { payload }) => payload,
})

const isRegistrated = createReducer(false, {
	[registerSuccess]: () => true,
})

const isAuthenticated = createReducer(false, {
	[isRegistrated]: () => true,
	[loginSuccess]: () => true,
	[getCurrentUserSuccess]: () => true,
	[registerError]: () => false,
	[loginError]: () => false,
	[getCurrentUserError]: () => false,
	[logoutSuccess]: () => false,
})

const authReducer = combineReducers({
	user,
	token,
	loading,
	isAuthenticated,
	error,
})

export { authReducer }
