import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './Header.css';
import { auth } from './../../../helpers/Auth';
import { userSettings } from './../../../helpers/UserSettings';
import ModalInvite from './ModalInvite/ModalInvite'
import ModalQuitGuild from './ModalQuitGuild/ModalQuitGuild'
import { observer } from 'mobx-react';

class Header extends Component {
  constructor(props, route) {
    super(props);
    this.state = {
      modal: false
      //route: props.match.route
    };
  }

  render() {
    return (
      <header id="mainHeader">

        <NavLink exact to={"/"} className="App-title">
          <h1 > {userSettings.guild} </h1>
        </NavLink>
        <div className="links">
          {userSettings.isManager ?
            (
              <a id="inviteLink" onClick={() => {
                this.ModalInvite.getUrl();
                this.setState({ modal: true });
              }}>
                INVITE
              </a>
            ) :
            <a id="quitGuildLink" onClick={() => { this.setState({ modal: true }) }}>QUIT</a>
          }
          <NavLink exact to={"/"} activeClassName="selected">
            EVENTS
            </NavLink>
          <NavLink to={"/guild-overview"} activeClassName="selected">
            ATTENDANCE RATE
            </NavLink>
          <a className="logout" onClick={(e) => { auth.logout() }}> Logout</a>
        </div>

        {userSettings.isManager ? (
          <ModalInvite
            ref={(ref) => { this.ModalInvite = ref }}
            data={this.state.modal}
            close={() => { this.setState({ modal: false }) }} />
        ) : (
            <ModalQuitGuild data={this.state.modal} close={() => { this.setState({ modal: false }) }} />
          )}
      </header >
    )
  }
}


export default withRouter(observer(Header));