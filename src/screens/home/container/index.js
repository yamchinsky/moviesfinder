import React from 'react'
import Header from '../../../Components/header/Header';
import { SideBar } from '../components/SideBar';
import './styles.scss'
import CardsContainer from '../../../Components/card/CardsContainer';

export const Home = () => {



	return (
		<div className="home-screen container">
			<SideBar />
      <div className="home-screen__content">
        <Header />
        <div className="home-screen__wrap">
          <CardsContainer />
        </div>
      </div>
		</div>
	)
}
