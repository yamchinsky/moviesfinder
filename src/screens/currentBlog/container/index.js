import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import {
	getAllBlogs,
	getBlog,
	getCurrentBlog,
} from '../../../redux/slices/blogSlice'
import './styles.scss'
import { CSVLink } from 'react-csv'

export const CurrentBlog = () => {
	const history = useHistory()
	const { id } = useParams()
	const value = useSelector(getAllBlogs)
	const [currentBlog, setCurrentBlog] = useState()
	const dispatch = useDispatch()
	const blog = useSelector(getBlog) || null
	const [loadData, setLoadData] = useState()
	useEffect(() => {
		setCurrentBlog(value.find(item => item.id === +id))
	}, [id])

	useEffect(() => {
		dispatch(getCurrentBlog({ movieId: id }))

		setLoadData([
			{
				title: blog.title,
				release_date: blog.release_date,
				runtime: blog.runtime,
				overview: blog.overview,
				genres: blog.genres?.map(item => item.name),
				countries: blog.production_countries?.map(item => item.name),
				languages: blog.spoken_languages?.map(item => item.english_name),
				vote_average: blog.vote_average,
				budget: blog.budget,
				production_companies: blog.production_companies?.map(item => item.name),
			},
		])
	}, [id])

	const headers = [
		{ label: 'Title', key: 'title' },
		{ label: 'Release Date', key: 'release_date' },
		{ label: 'Runtime', key: 'runtime' },
		{ label: 'Overview', key: 'overview' },
		{ label: 'Genres', key: 'genres' },
		{ label: 'Countries', key: 'countries' },
		{ label: 'Languages', key: 'languages' },
		{ label: 'Average score', key: 'vote_average' },
		{ label: 'Budget', key: 'budget' },
		{ label: 'Production companies', key: 'production_companies' },
	]
	const csvReport = {
		data: loadData,
		headers: headers,
		filename: 'Film_data.csv',
	}

  const goBack = () => {
    history.goBack()
  }

	return !currentBlog ? (
		<div>Loading....</div>
	) : (
		<div className="current-blog">

      <button  onClick={goBack} className="current-blog__button" style={{ position: 'absolute', top:10, zIndex: 2 }}>
        Back to home
      </button>


			<div className="current-blog__back" onClick={() => history.push('/home')}>
				<img
					src={`https://image.tmdb.org/t/p/original/${currentBlog?.backdrop_path}`}
					className="current-blog__img"
				/>
			</div>

			<div className="current-blog__container">
				<img
					className="current-blog__container-img"
					src={`https://image.tmdb.org/t/p/original/${currentBlog?.poster_path}`}
				/>
				<div className="current-blog__container-about">
					<h1>{currentBlog.title}</h1>
					<p>
						<span>{blog.release_date}</span> | <span>{blog.runtime} min</span>
					</p>
					<p>{blog.overview}</p>
					<p>
						<b>Genres: </b>
						{blog.genres?.map(item => (
							<span key={item.id}>{item.name}, </span>
						))}{' '}
					</p>{' '}
					<p>
						<b>Countries: </b>
						{blog.production_countries?.map(item => (
							<span key={item.iso_3166_1}>{item.name}, </span>
						))}{' '}
					</p>{' '}
					<p>
						<b>Languages: </b>
						{blog.spoken_languages?.map(item => (
							<span key={item.iso_639_1}>{item.english_name}, </span>
						))}{' '}
					</p>{' '}
					<p>
						<b>Average score: </b>
						<span> {blog.vote_average} </span>
					</p>{' '}
					<p>
						<b>Budget: </b>
						<span>$ {blog.budget} </span>
					</p>
					<p style={{ marginTop: '20px' }}>
						{blog.production_companies?.map(item =>
							item.logo_path ? (
								<img
									src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
									key={item.id}
									style={{ height: '50px', marginLeft: '10px' }}
								/>
							) : (
								<span key={item.id} style={{ marginLeft: '15px' }}>
									<b>{item.name}</b>
								</span>
							),
						)}{' '}
					</p>
					<CSVLink {...csvReport}>
						<button className="current-blog__button">Export to CSV</button>
					</CSVLink>
				</div>
			</div>
		</div>
	)
}
