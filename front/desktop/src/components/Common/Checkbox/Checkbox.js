import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Checkbox.css'
import { icon } from './../../../helpers/Icon'
// react-native

// react-dom (what we'll use here)



class Checkbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        }
    }

    getValue(){
        return this.state.checked;
    }


    render() {
        return (
            <div id="checkbox" onClick={(e) => { this.setState({checked: !this.state.checked}) }}>
                {this.state.checked ? icon.getUiIcon('checkboxCheck', 'icon') : null}
            </div>
        )
    }

}

export default observer(Checkbox);
