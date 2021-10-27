import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const STATE_KEY = 'blog'
const KEY = '67aa0da8c89889f506f05ef1d428dc04'

export const getAllBlogsFromApi = createAsyncThunk(
	'blog/getAll',
	async body => {
		const { page } = body
		const data = await fetch(
			`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}&page=${page}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		return data.json()
	},
)

export const getCurrentBlog = createAsyncThunk(
	'blog/getCurrentBlog',
	async body => {
		const { movieId } = body
		const data = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		return data.json()
	},
)

const initialState = {
	allBlogs: [],
	currentPage: 2,
	searchFilm: '',
	currentBlog: {},
	sortedBy: {},
	arrFavoriteFilm: [],
	arrayFavotiteFilms: [],
}

export const blogSlice = createSlice({
	name: STATE_KEY,
	initialState,
	reducers: {
		setNextPage: state => {
			state.currentPage += 1
		},
		setSearchFilm: (state, action) => {
			const { search } = action.payload
			state.searchFilm = search
		},
		orderByHight: state => {
			state.allBlogs = [
				...state.allBlogs.sort((a, b) => a.vote_average - b.vote_average),
			]
			state.sortedBy = {
				sortedBy: 'hight',
				name: 'Rating (descending)',
			}
		},
		orderByLower: state => {
			state.allBlogs = [
				...state.allBlogs.sort((a, b) => b.vote_average - a.vote_average),
			]
			state.sortedBy = {
				sortedBy: 'lower',
				name: 'Rating (growing)',
			}
		},
		orderByPopulation: state => {
			state.allBlogs = [
				...state.allBlogs.sort((a, b) => b.popularity - a.popularity),
			]
			state.sortedBy = {
				sortedBy: 'population',
				name: 'The most popular',
			}
		},
		addFavoriteFilm: (state, action) => {
			const { id } = action.payload
			const isAlredyInArr = state.arrFavoriteFilm.includes(id)

			if (isAlredyInArr) {
				state.arrFavoriteFilm = [
					...state.arrFavoriteFilm.filter(item => item !== id),
				]
			} else {
				state.arrFavoriteFilm = [...state.arrFavoriteFilm, id]
			}
		},
		getFavoritesFilmInUser: (state, action) => {
			const { films } = action.payload


			state.arrayFavotiteFilms = [...state.allBlogs].filter(item =>
				films.includes(item.id),
			)
			state.sortedBy = {
				sortedBy: 'Favorites',
				name: 'My Favorites films',
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(getAllBlogsFromApi.fulfilled, (state, action) => {
			const isSame = action.payload.results.find(item =>
				state.allBlogs.find(itemw => itemw.id === item.id),
			)

			if (!isSame) {
				state.allBlogs = [...state.allBlogs, ...action.payload.results]
			}
		})
		builder.addCase(getCurrentBlog.fulfilled, (state, action) => {
			state.currentBlog = action.payload
		})
	},
})

export const {
	setNextPage,
	setSearchFilm,
	orderByHight,
	orderByLower,
	orderByPopulation,
	addFavoriteFilm,
	getFavoritesFilmInUser,
} = blogSlice.actions

export const getAllBlogs = state => state.blog.allBlogs
export const getPages = state => state.blog.currentPage
export const getSearchFilm = state => state.blog.searchFilm
export const getBlog = state => state.blog.currentBlog
export const getSortedBy = state => state.blog.sortedBy
export const getFavoriteFilm = state => state.blog.arrFavoriteFilm
export const getArrayFavotiteFilms = state => state.blog.arrayFavotiteFilms

export default blogSlice.reducer
