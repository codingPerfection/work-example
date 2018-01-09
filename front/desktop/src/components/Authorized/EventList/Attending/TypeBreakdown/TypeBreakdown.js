import React, { PureComponent } from 'react';
import { icon } from './../../../../../helpers/Icon';
import SingleChar from './../SingleChar/SingleChar';


class TypeBreakdown extends PureComponent {



    render() {
        return (
            <div className="breakDown">
                <header>
                    {icon.getIcon(this.props.type, "icon")}
                    <span className="text">{this.props.attending.length}/{this.props.total} {this.props.type}</span>
                </header>
                {this.props.attending.map(c => (<SingleChar char={c} key={c.id} />))}
            </div>
        )
    }
}

export default TypeBreakdown;
