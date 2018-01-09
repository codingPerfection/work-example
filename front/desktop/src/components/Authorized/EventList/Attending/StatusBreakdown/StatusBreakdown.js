import React, { Component } from 'react';
import SingleChar from './../SingleChar/SingleChar';


class StatusBreakdown extends Component {



    render() {
        return (
            <div>
                <h3 className="attendingBreakdown addMargin">{this.props.title}</h3>
                <div className={this.props.late ? "breakDown lateView": "breakDown"}>
                    {this.props.chars.map(c => (<SingleChar char={c} key={c.id} late={this.props.late}  />))}
                    {this.props.chars.length === 0 ? (<div className="emptyMsg">{this.props.empty}</div>) : null}
                </div>
            </div>
        )
    }
}

export default StatusBreakdown;
