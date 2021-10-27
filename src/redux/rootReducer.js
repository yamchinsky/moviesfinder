import { combineReducers } from 'redux'

import blogReducer from './slices/blogSlice'
import userReducer from './slices/userSlice'

const rootReducer = combineReducers({
	user: userReducer,
	blog: blogReducer,
})

export default rootReducer
