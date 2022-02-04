import React from 'react';

const MenuError = ({errorCode, triggerFreshState}) => {
  return(
    <div className="menu-error">
      <button onClick={() => {triggerFreshState()}}>X</button>
       An error occured, check if the server is on
    </div>
  )
}

export default MenuError;
