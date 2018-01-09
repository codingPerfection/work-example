import React, { Component } from 'react';
import { icon } from './../../../../../helpers/Icon';
import { time } from './../../../../../helpers/Time';


class SingleChar extends Component {



    render() {
        return (
            <div className="person">
                {icon.getIcon(this.props.char.charClass, "icon")}
                <div className="text">
                    {this.props.late ?
                        (<div>
                            <span className="charName">{this.props.char.charName}</span>
                            <span className="lateTime">{time.getLateTime(this.props.char.lateTime)}</span>
                        </div>)
                        : this.props.char.charName}

                </div>
            </div>
        )
    }
}

export default SingleChar;
