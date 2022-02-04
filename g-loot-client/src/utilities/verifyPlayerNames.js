const verifyPlayerName = (playerList, playerName) => {
  console.log(playerList);
  console.log(playerName)
  if (playerName === '') return false;   // return false on empty field
  if ( !(/^[a-zA-Z ]+$/.test(playerName)) ) return false;     // return false on non-word characters

  // return false if there already exists a match
  var isUnique = true;
  playerList.forEach((player) => {
    if(player.name === playerName)
      isUnique = false;
  });

  // return
  return isUnique;
}

export {verifyPlayerName};
