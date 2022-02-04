import React,{ useState } from 'react';
import {FaUserPlus} from 'react-icons/fa';
import {verifyPlayerName} from '../../utilities/verifyPlayerNames.js';

const MenuAdd = ({ playerList, triggerAddPlayer }) => {

  const [addPlayerText, setAddPlayerText] = useState('');

  return(
    <div className="menu-add">
      <button type="button" className="add-player-button"
              onClick={ (e) => {
                verifyPlayerName(playerList, addPlayerText) ?
                  triggerAddPlayer(addPlayerText)
                : alert("Player name is either empty, invalid, or taken"); }}>
       <FaUserPlus />
      </button>
      <input type="text" placeholder="enter player name" required
        value={addPlayerText} onChange={(e) => {setAddPlayerText(e.target.value)}}></input>
    </div>
  )
}

export default MenuAdd;
