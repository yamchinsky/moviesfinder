import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const STATE_KEY = 'user'

export const initialState = {
	email: '',
	token: '',
	isAuth: false,
	id: '',
}

export const userSignUp = createAsyncThunk('user/signUp', async body => {
	console.log('enter', body)
	const data = await fetch(`http://localhost:4000/api/v1/auth/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(body),
	})
	return data.json()
})

export const userSignIn = createAsyncThunk('user/signIn', async body => {
	console.log(body)
	const data = await fetch(`http://localhost:4000/api/v1/auth/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	return data.json()
})

export const userLogout = createAsyncThunk('user/logout', async body => {
	console.log(body)
	const data = await fetch(`http://localhost:4000/api/v1/auth/logout`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
	return data.json()
})

export const userSlice = createSlice({
	name: STATE_KEY,
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { email, token, id } = action.payload
			state.email = email
			state.token = token
			state.id = id
		},
	},
	extraReducers: builder => {
		builder.addCase(userSignUp.fulfilled, (state, action) => {
			console.log(action)
			state.email = action.payload.email
		})
		builder.addCase(userSignIn.fulfilled, (state, action) => {
			console.log(action)
			state.token = action.payload.data.token
			state.id = action.payload.data.id
			state.isAuth = true
		})

		builder.addCase(userLogout.fulfilled, (state, action) => {
			console.log(action)

			state.token = null
			state.isAuth = false
		})
	},
})

export const { setUser } = userSlice.actions

export const getUserEmail = state => state.user.email

export default userSlice.reducer
