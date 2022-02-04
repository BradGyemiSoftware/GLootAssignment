import React, { useState, useEffect } from 'react';
import MenuTitle from './MenuTitle.js';
import MenuAdd from './MenuAdd.js';
import MenuList from './MenuList.js';
import MenuLoading from './MenuLoading.js';
import MenuError from './MenuError.js';
import {formatHttpStatusCode} from '../../utilities/httpStatusCodes.js';
import axios from 'axios';

function Menu() {
  // states to manage
  const [ playerList, setPlayerList ] = useState([]);
  const [ axiosState, setAxiosState ] = useState(1);

  // http status codes
  const INITIAL_STATE = 0;
  const WAITING = 1;
  const REQUEST_SUCCESS = 200;
  const REQUEST_REDIRECT = 300;
  const CLIENT_ERROR = 400;
  const SERVER_ERROR = 500;

  // Run this once after render
  useEffect( () => {
    getPlayers();
  }, [])

  ////////////////////////// API CALLS /////////////////////////

  // gets the playerList from the server and refreshes the state
  const getPlayers = async () => {
    setAxiosState(WAITING);
    await axios.get("/players")
            .then( response => {  setAxiosState(formatHttpStatusCode(response.status));
                                  setPlayerList(response.data);})
            .catch( error => { setAxiosState(formatHttpStatusCode(error.response.status))})
    return;
  }

  // adds a player to the list of players
  const addPlayer = async (pName) => {
    setAxiosState(WAITING);
    await axios.post("/player", {name: pName})
              .then( response => {setAxiosState(formatHttpStatusCode(response.status));
                                  setPlayerList(response.data);})
              .catch( error => {setAxiosState(formatHttpStatusCode(error.response.status))});
    return;
  }

  // deletes a player from the player list
  const deletePlayer = async (pID) => {
    setAxiosState(WAITING);
    await axios.delete("/player/"+pID)
              .then( response => {setAxiosState(formatHttpStatusCode(response.status));
                                  setPlayerList(response.data);
                                  console.log(response.data);})
              .catch( error => {setAxiosState(formatHttpStatusCode(error.response.status))});
    return;
  }

  // edits a player's name in the player list
  const editPlayer = async (pID, pName) => {
    setAxiosState(WAITING);
    await axios.put("/player/"+pID, {name: pName})
              .then( response => {setAxiosState(formatHttpStatusCode(response.status));
                                  setPlayerList(response.data);})
              .catch( error => {setAxiosState(formatHttpStatusCode(error.response.status))});
  }

  ///////////////////////////// RENDERER ////////////////////////////
  // return jsx components based on axios stateNumber
  function stateManager(stateNumber) {
    if(stateNumber === WAITING)
      return (
        <div className="menu">
          <MenuTitle axiosState={WAITING}/>
          <MenuLoading />
        </div>
      );
    if(stateNumber === REQUEST_REDIRECT ||
       stateNumber === CLIENT_ERROR    ||
       stateNumber === SERVER_ERROR )
        return(
          <div className="menu">
            <MenuTitle axiosState={WAITING}/>
            <MenuError triggerFreshState={getPlayers}/>
          </div>
        )

      return (
        <div className="menu">
          <MenuTitle axiosState={ stateNumber }/>

          <MenuAdd playerList={ playerList } triggerAddPlayer={ addPlayer }/>

          <MenuList playerList={ playerList }
                    axiosState={ stateNumber }
                    triggerEditPlayer={ editPlayer }
                    triggerDeletePlayer={ deletePlayer }/>
        </div>
      );
  }

  return stateManager(axiosState)    // Render
}

export default Menu;
