import React, {useEffect, useState ,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from "@googlemaps/js-api-loader"
import {getAllGames, getGamesNearMe} from '../../features/games/gamesSlice'

import golfImg from '../../assets/golf.png'
import bBallImg from '../../assets/basketball.png'
import { useNavigate } from 'react-router-dom';
export default function Map ({gamesArr}) {
  const [isLoading, setIsLoading] = useState(true)
    const locations = gamesArr.map((game)=>{
    return {lat: game.location.coordinates[1], lng: game.location.coordinates[0], gameName: game.gameName, sport: game.sport}
    })

  const mapRef = useRef(null);
  const googleMapRef = useRef(null)
  const dispatch = useDispatch()
  const initializeMap = async (center) => {
    if (window.google) {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        styles: [
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "hue": "#008eff"
                  },
                  {
                      "invert_lightness": true
                  },
                  {
                      "lightness": "-64"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "administrative.country",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "lightness": "-70"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  },
                  {
                      "hue": "#ff0000"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "hue": "#008bff"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "lightness": "30"
                  },
                  {
                      "gamma": "1.00"
                  }
              ]
          },
          {
              "featureType": "poi.attraction",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.business",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.government",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.medical",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "poi.place_of_worship",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.school",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "poi.sports_complex",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  },
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "hue": "#ff0000"
                  },
                  {
                      "lightness": "-10"
                  },
                  {
                      "saturation": "100"
                  },
                  {
                      "gamma": "1"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "hue": "#008eff"
                  },
                  {
                      "saturation": "0"
                  },
                  {
                      "lightness": "0"
                  },
                  {
                      "gamma": "1"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway.controlled_access",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.highway.controlled_access",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "lightness": "-15"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit.line",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "transit.station",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit.station.airport",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit.station.bus",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "transit.station.rail",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "hue": "#008eff"
                  },
                  {
                      "saturation": "-69"
                  },
                  {
                      "lightness": "-27"
                  }
              ]
          }
      ]
      });
    }
    
  }

  const getCurrentLocation = async () => {
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (location) => {
            resolve({
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            });
          },
          (error) => {
            console.error('Error retrieving location:', error);
            resolve(defaultLocation);
          }
        );
      } else {
        resolve(defaultLocation);
      }
    });
  };
  

  let allMarkers = [];

  const updateMarkers = (markers) => {

    for (let i = 0; i < allMarkers.length; i++) {
      allMarkers[i].setMap(null);
  }
    allMarkers = [];

    if (window.google && window.google.maps && window.google.maps.Marker) {
      for (const marker of markers) {
        const googleMarker = new window.google.maps.Marker({
          map: googleMapRef.current,
          position: marker,
          icon : {
            url: marker.sport === 'basketball' ? bBallImg : golfImg,
            scaledSize: new window.google.maps.Size(25, 25)
          }
        })

        allMarkers.push(googleMarker);

        const infoContent = `<p>${marker.gameName}</p>`

        const infoWindow = new window.google.maps.InfoWindow({
          content: infoContent
        });
  
        googleMarker.addListener("click", () => {
          infoWindow.open(googleMapRef.current, googleMarker);
        });
      }
    }
    
  }


  useEffect (() => {
    const loader = new Loader({
      apiKey: "AIzaSyAT5_1vYwxgEWt8wn_LKWDsVo0mOjqfxgs",
      version: "weekly",
    });
    loader.importLibrary('places').then( async ()=>{
      const location = await getCurrentLocation()
      initializeMap(location)
    }).then(async ()=> {
      dispatch(getAllGames())
      updateMarkers(locations)
      setIsLoading(false)
    })
  },[])

  useEffect(() => {
    if (gamesArr.length > 0) { 
        updateMarkers(locations);
    }
}, [gamesArr]);

  
  const activeFilter = useRef(null)
  activeFilter.current = 'all'


  const filterGames = () => {
    const filtered = gamesArr.filter(game=> {
      // console.log(activeFilter.current)
      if (activeFilter.current === 'all') return game
      else if (activeFilter.current === game.sport) return game
    })
    
    const locations = filtered.map((game)=>{
      return {lat: game.location.coordinates[1], lng: game.location.coordinates[0], gameName: game.gameName, sport: game.sport}
      })
      
    updateMarkers(locations)
  }

  const handleToggle = (selectedFilter) => {
    activeFilter.current=selectedFilter
    filterGames()
  }
  const getNearbyGames = async (radius) => {
    const location = await getCurrentLocation()
    
    const locationQuery = {
      lat: location.lat,
      lng: location.lng,
      radius
    }
    dispatch(getGamesNearMe(locationQuery))
    
  }

  return (
  <div>
    <h1>Map</h1>
    <button onClick={()=>handleToggle('basketball')}>Basketball</button>
    <button onClick={()=>handleToggle('golf')}>Golf</button>
    <button onClick={()=>dispatch(getAllGames())}>Get Games</button>
    <button onClick={()=>getNearbyGames(5)}>Get Games Near Me</button>
    <div id='map' ref={mapRef} style={{ width: "400px", height: "400px" }}></div>
  </div>
  )
}