import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaUserMinus, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import {verifyPlayerName} from '../../utilities/verifyPlayerNames.js';



const MenuList = ({axiosState, playerList, triggerEditPlayer, triggerDeletePlayer}) => {

  const [ playerToEdit, setPlayerToEdit ] = useState(null);   //empty object when no edit is occuring

  function renderTableRow(player, playerList) {
    if( playerToEdit === null ){
      // if there are no entries being edited, display row normally
      return(
        <tr key={player.id}>
          <td> {player.name} </td>
          <td>
            <button onClick={ (e) => setPlayerToEdit({id: player.id, name: player.name}) }> <FaUserEdit /> </button>
            <button onClick={ (e) => triggerDeletePlayer(player.id) }> <FaUserMinus /> </button>
          </td>
        </tr>
      );
    }
    if( playerToEdit !== {} ){
      if( playerToEdit.id === player.id ){
        // if this is the entry which is currently being edited, display with input and conform/cancel buttons
        return (
          <tr className="row-to-edit" key={player.id}>
            <td>
              <input type="text" value={playerToEdit.name}
                     onChange={(e) => {setPlayerToEdit({id: playerToEdit.id, name: e.target.value})}}></input>
            </td>
            <td>
              <button
                onClick={ (e) => {
                  setPlayerToEdit(null);
                  verifyPlayerName(playerList, playerToEdit.name) ?
                    triggerEditPlayer(player.id, playerToEdit.name)
                  : alert("Player name entered is invalid, empty, or taken.")} }> <FaCheckCircle /> </button>
              <button onClick={ (e) => {setPlayerToEdit(null)} }> <FaTimesCircle /> </button>
            </td>
          </tr>
        );
      }
      // If there is currently a player being edited, only display the minimal data
      return (
        <tr key={player.id}>
          <td> {player.name}</td>
          <td></td>
        </tr>
      );
    }
  }

  return(
    <div className="menu-list">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        { axiosState === 0 || axiosState === 200 ?
            playerList.map( player => {
              return renderTableRow(player, playerList);
            })
          :
            <tr><td>ERROR OCCURED WITH STATUS CODE: {axiosState}</td></tr>
        }
        </tbody>
      </table>
    </div>
  )
}

export default MenuList;
