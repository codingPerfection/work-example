import React, { PureComponent } from 'react';
import {icon} from './../../../../../helpers/Icon';


class CharType extends PureComponent {



    render() {
        return (
            <div className="type">
                {icon.getIcon(this.props.type, "icon")}
                <div className="fill">
                    <div className="relative">
                        <div className="percent" style={{ width: this.props.percent }}></div>
                        <div className="text">{this.props.attending}/{this.props.total}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CharType;
