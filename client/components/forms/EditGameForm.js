import React, {useRef, useEffect, useState} from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { updateGame } from '../../features/games/gamesSlice'

import formatDate from '../../utils/formatDateForInput'

import ConfirmationModal from '../forms/ConfirmationModal'

export default function EditGameForm () {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { gameId } = useParams();
  const game = (useSelector((state)=>{
    return state.games.gamesArr.find((g)=>g._id === gameId)
  }))
  
  const {sport, address, partySize, _id: id, gameName, location} = game

  const [lng, lat] = location.coordinates
  const dateTime = formatDate(game.dateTime)
  // DateTime
  const dateTimeRef = useRef(null)

  // Address
  const autocompleteInputRef = useRef(null)
  let autocomplete;
  const addressRef = useRef(null)
  
  // Sports
  const basketballRef = useRef(null);
  const golfRef = useRef(null);

  // Handle Coordinated Defaulting
  const latRef = useRef(null)
  const lngRef = useRef(null)
  latRef.current = lat;
  lngRef.current = lng

  // Party Size
  const partySizeRef = useRef(null);

  // Game Name
  const gameNameRef = useRef(null);


  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  useEffect(()=>{
    const loader = new Loader({
      apiKey: "AIzaSyAT5_1vYwxgEWt8wn_LKWDsVo0mOjqfxgs",
      version: "weekly",
    });

    
    loader.importLibrary('places')
    .then(()=>{

      // Initialize Address Autocomplete
      autocomplete = new google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        { types: ["address"] }
      );
      // Default to current Address
      autocompleteInputRef.current.value = address
      addressRef.current = address
      autocomplete.addListener("place_changed", onPlaceChanged);

      

    })

    const onPlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        addressRef.current = place.formatted_address;
      }
      if (place.geometry) {
        latRef.current = place.geometry.location.lat();
        lngRef.current = place.geometry.location.lng();
      }
    };
  },[])



  const handleSubmit =  async (e) => {
    e.preventDefault()
    
    setShowConfirmation(true)

  }

  const handleConfirm = () => {
    const formValues = {
      gameId: id,
      gameName: gameNameRef.current.value,
      sport: basketballRef.current.checked ? 'basketball' : 'golf',
      location: {
        type: 'Point',
        coordinates: [lngRef.current, latRef.current]
      },
      address: addressRef.current,
      partySize: partySizeRef.current.value,
      dateTime: dateTimeRef.current.value
    }
    
    dispatch(editGame(formValues))
    handleClose()
  }
  
  return (
    <div>
    <h1>Edit Game Form</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor='gameName'>Game Name</label>
      <input
        type='text'
        name='gameName'
        id='gameName'
        ref={gameNameRef}
        defaultValue={gameName}
      />
      <br />
      <label htmlFor="basketball">Basketball</label>
      <input 
        type="radio" 
        name="sport" 
        id="basketball" 
        ref={basketballRef} 
        defaultChecked = {sport === 'basketball'}
      />
      <label htmlFor="golf">Golf</label>
      <input 
        type="radio" 
        name="sport" 
        id="golf" 
        ref={golfRef} 
        defaultChecked = {sport === 'golf'}
      />
      <br />
      <label>Date/Time</label>
      <input 
        type="datetime-local" 
        ref={dateTimeRef} 
        name="dateTime" 
        id="dateTime" 
        defaultValue={dateTime}
      />
      <br />
      <label>Party Size</label>
      <input 
        type="number" 
        ref={partySizeRef} 
        name="partySize" 
        id="partySize"
        defaultValue={partySize}
        />
      <br />
      <label>Address</label>
      <input 
        type="text" 
        ref={autocompleteInputRef} 
        name='address'
        id='address'
        defaultValue={address}
      />
      <br />
      <button type='submit'>Save</button>
      <button type='button' onClick={handleClose}>Close</button>
    </form>
    {showConfirmation && <ConfirmationModal confirm={handleConfirm} cancel={handleCancel} />}
    
    {/* <div id='map' ref={mapRef} style={{ width: "400px", height: "400px" }}></div> */}
    </div>
  )
}