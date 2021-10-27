const getIsAuth = state => state.auth.isAuthenticated
const getAuthUserName = state => state.auth.user.email
const getAuthToken = state => state.auth.token
const getUserID = state => state.auth.user.id

export { getIsAuth, getAuthUserName, getAuthToken, getUserID }
