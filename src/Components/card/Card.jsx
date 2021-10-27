import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router'
import like from '../../assets/icons/heart.svg';
import liked from '../../assets/icons/liked.svg';
import { addFavoriteFilm, getFavoriteFilm } from '../../redux/slices/blogSlice';

const Card = ({ id, src, title, description }) => {
  const history = useHistory();
  const [currentDes, setCurrentDes] = useState(description)
  const likefFilms = useSelector(getFavoriteFilm);
  const [isLiked, setIsLiked] = useState(likefFilms.includes(id));

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentDes?.length > 70) {
      setCurrentDes(prev => prev.slice(0, 70) + '...')
    }
  }, [currentDes])

  const openCurrentBlog = () => {
    history.push(`/blog/${id}`)
  }

  const likedBlog = (id) => {
    dispatch(addFavoriteFilm({ id: id }))
    setIsLiked(prev => !prev)
  }
  
	return (
    <div className="card">
      <div className="card__photo">
        <img
          src={src}
          onClick={openCurrentBlog}
          alt={`${title} photo`}
          className="card__img"
        />
      </div>

      <div className="card__content">
        <div>
          <h2 className="card__title">
            {title}
          </h2>
          <p className="card__description">
            {currentDes}
          </p>
        </div>

        <div className="card__wrap">
          <button className="button" onClick={openCurrentBlog}>
            Details
          </button>

          <div className="card__like-wrap" onClick={() => likedBlog(id)}>
            <img src={isLiked ? liked : like} className="card__like" />
          </div>
        </div>
      </div>
    </div>
	)
}

export default Card
