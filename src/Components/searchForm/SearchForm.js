import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchFilm, setSearchFilm } from '../../redux/slices/blogSlice'
import '../searchForm/searchForm.scss'

const SearchForm = () => {
  const dispatch = useDispatch();
  const searchFilm = useSelector(getSearchFilm);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setSearchFilm({ search: value }))
  }
  
  const reset = () => {
    dispatch(setSearchFilm({ search: '' }))
    window.scrollTo(0, 0)
  }

	return (
		<div>
			<div className="SearchForm">
				<input
					className="SearchForm-input"
					name="name"
          onChange={(e) => handleChange(e)}
					value={searchFilm}
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search..."
				/>
        {
          !searchFilm.length || (
            <span className="SearchForm-reset" onClick={reset}>
              X
            </span>
          )
        }
				<button type="submit" className="SearchForm-button">
					<span className="SearchForm-button-label">Search</span>
				</button>
			</div>
		</div>
	)
}

export default SearchForm
