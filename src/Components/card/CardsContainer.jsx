import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAllBlogs,
	getAllBlogsFromApi,
	getArrayFavotiteFilms,
	getPages,
	getSearchFilm,
	getSortedBy,
	setNextPage,
} from '../../redux/slices/blogSlice'
import arrowUp from '../../assets/icons/arrow-up.png'

import Card from './Card'
import './CardsContainer.scss'

const CardsContainer = () => {
	const dispatch = useDispatch()

	const value = useSelector(getAllBlogs) || []
	const page = useSelector(getPages)
	const searchFilm = useSelector(getSearchFilm)
	const [sortedValue, setSortedValue] = useState([])
	const sortedBy = useSelector(getSortedBy)
	const arrayFavotiteFilms = useSelector(getArrayFavotiteFilms)

	useEffect(() => {
		dispatch(getAllBlogsFromApi({ page: 1 }))
	}, [])

	useEffect(() => {
		setSortedValue(
			value.filter(item =>
				item.title.toLowerCase().includes(searchFilm.trim().toLowerCase()),
			),
		)
	}, [searchFilm, value])

	const paginationPage = () => {
		dispatch(setNextPage())
		dispatch(getAllBlogsFromApi({ page }))
	}

	const handleScroll = () => {
		const el = document.querySelector('.scroll_to_top')
		if (window.pageYOffset > 600) {
			el.classList.add('scroll_to_top-active')
		} else {
			el.classList.remove('scroll_to_top-active')
		}
	}

	const scrollToTop = () => {
		window.scrollTo(0, 0)
	}

	const renderList = () => {
		return (
			sortedBy.sortedBy === 'Favorites' ? arrayFavotiteFilms : sortedValue
		).map(({ id, title, overview, poster_path }) => {
			return (
				<Card
					key={id}
					id={id}
					src={`https://image.tmdb.org/t/p/original/${poster_path}`}
					alt={'image'}
					title={title}
					description={overview}
				/>
			)
		})
	}

	if (!sortedValue.length) {
		return (
			<div className="not_result">
				<p>Not result with this name</p>
			</div>
		)
	}

	return (
		<>
			<h2 className="card-main-container-title">
				{sortedBy?.name || 'Top films'}
			</h2>
			{!searchFilm && !(sortedBy.sortedBy === 'Favorites') ? (
				<InfiniteScroll
					dataLength={value.length}
					next={paginationPage}
					hasMore={true}
					loader={<div>Loading...</div>}
					className={'card-main-container'}
					onScroll={handleScroll}
				>
					{renderList()}
					<div className="scroll_to_top" onClick={scrollToTop}>
						<img src={arrowUp} alt="arrow" style={{ height: 25 }} />
					</div>
				</InfiniteScroll>
			) : (
				<div className={'card-main-container'}>{renderList()}</div>
			)}
		</>
	)
}

export default CardsContainer
