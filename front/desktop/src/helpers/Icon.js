import React from 'react'
import SpriteSheet from './../img/iconsChar/spritesheet.png';
import SpriteSheetUi from './../img/iconsUI/spritesheet.png';
import './Icon/spriteChar.css';
import './Icon/spriteUI.css';

class Icon {
    //calculates in portion
    getIcon(charIcon, addClass) {
        return <div style={{ backgroundImage: `url(${SpriteSheet})` }} className={"spriteChar spriteChar-" + charIcon + " " + addClass} />
    }
    getUiIcon(icon,addClass){
        return <div style={{ backgroundImage: `url(${SpriteSheetUi})` }} className={"spriteUi spriteUi-" + icon + " " + addClass} />
    }
}

export let icon = new Icon();