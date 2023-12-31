import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import GameForm from '../components/forms/GameForm'
import GamesList from "../components/gamesList/GamesList";
import Map from '../components/map/Map'
import { getAllGames } from "../features/games/gamesSlice";


export default function Manage() {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllGames())
    },[])

    const {gamesArr} = useSelector((state)=>state.games)
    
    return (
        <div>
        <h1>Manage</h1>
        <GameForm />
        {/* <Map gamesArr={gamesArr}/> */}
        <GamesList />
        </div>
    )
}