import React, {useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";


import { StyledGameInfo } from "./styles/StyledGameInfo.styled";
import golfImg from '../assets/golf.png'
import bBallImg from '../assets/basketball.png'
import bouncBall from '../assets/BouncingBasketballGif.gif'

export default function DetailedGameInfo() {
  const { gameId } = useParams(); // Access the 'gameId' parameter
  

  // const game = (useSelector((state)=>{
  //   return state.games.gamesArr.find((g)=>g._id === gameId)
  // }))
  const game = {
    "location": {
        "type": "Point",
        "coordinates": [
            -118.1435,
            34.0217
        ]
    },
    "_id": "6524a6c7eb03453d019f6860",
    "gameName": "Basketball at LA Court",
    "sport": "basketball",
    "address": "456 Basketball St, Los Angeles, CA, USA",
    "host": "60d5ec9af682fbd39c2d17b1",
    "partySize": 10,
    "dateTime": "2023-12-12T16:30:00.000Z",
    "attending": [
        "60d5ec9af682fbd39c2d17b1",
        "60d5ec9af682fbd39c2d17b2",
        "60d5ec9af682fbd39c2d17b3"
    ],
    "__v": 0
}
  console.log(game)
  const date = new Date(game.dateTime)
  const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
  const hour = date.getHours();
  const minute = date.getMinutes() === 0 ? '00' : date.getMinutes();
  const month = months[date.getMonth()]
  const dayDate = date.getDate()
  const year = date.getFullYear()
  const {sport, address, partySize, gameName} = game
  const [street, city, state, country] = address.split(', ')
  
  // console.log(game)
  return (
    <div>
    <StyledHeader>
        <MovingHeader>{gameName}</MovingHeader>
    </StyledHeader>
    <StyledGameInfo>
        <h1>{gameName}<span>
        <img src={sport === 'basketball' ? bouncBall : golfImg} alt="" />
          </span>
        </h1>
        <section className="details_container">
          <article>
            <h4>{street}, {city}</h4>
            <h4>{month}, {dayDate}, {year} </h4>
            <h4>{days[date.getDay()]} @ {`${hour}:${minute}`} </h4>
          </article>
          <article>
            <h3 className="details-num">{game.attending.length}</h3>
            <h5>Signups</h5>
          </article>
          <article>
            <h3 className="details-num">{partySize}</h3>
            <h5>Spots</h5>
          </article>
          
        </section>
        
        
    </StyledGameInfo>
    </div>
  )
}

const MovingHeader = styled.div`
position: relative;
font-color: white;
font-family: var(--primary-font);
font-size: xxx-large;
display: flex;
top: 50%;
left: 100px;
width: auto;
min-height: 100%;
justify-content: center;
align-items: center;
color: #ffffff;
line-height: 50px;
animation: moveAndBlink 5s linear infinite;
z-index: 0;

@keyframes moveAndBlink {
  0% {
      left: -10%;
      opacity: .75;
  }
  25% {
    left: 20%;
    opacity: 1;
    
  }
  50% {
    left: 50%;
    opacity: .75
  }
  75% {
    left: 80%;
    opacity: 1;
  }
  100% {
    left: 110%;
    opacity: .75;
  }
}
`

const StyledHeader = styled.header`
  background-color: blue;
  display: flex;
  align-items: top;
  font-size: 100%;
  min-height: 100px;
`


const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ccc;
  border-radius: 5px;
  margin-top: 10px;`