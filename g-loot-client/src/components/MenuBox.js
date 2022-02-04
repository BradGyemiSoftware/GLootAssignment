import React, { useState } from 'react';
import classNames from 'classnames';

import Menu from './MenuComponents/Menu.js';

/**************************************
*******             *********
**************************************/
function MenuBox() {

  const [isActive, setIsActive] = useState(false);

  const btnClasses = classNames("menu-container",
                                  { "active": isActive,
                                    "inactive": !isActive }
                               );

  return(
    <div className={btnClasses}>
      <div className="menu-logo" onClick={() => setIsActive(!isActive)}>
        <div className="spinning-border"></div>
        <div className="solid-border"> </div>
        <img src="original.png" alt="G-Loot Logo"/>
      </div>
      <Menu />
    </div>
  )
}




export {MenuBox};
