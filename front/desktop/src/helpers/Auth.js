import { settings } from './../Settings';
import { extendObservable } from 'mobx';
import { userSettings } from './UserSettings'

class Auth {

  constructor() {
    let t = null;
    /* istanbul ignore next */
    if (window.localStorage) {
      t = localStorage.getItem('loginToken');
    }
    extendObservable(this, {
      token: t
    })
  }

  logout = () => {
    this.token = null;
    userSettings.fetched = false;
    /* istanbul ignore next */
    if (window.localStorage) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('loginTokenVersion');
    }
    /* istanbul ignore next */
    if (window.location) {
      window.location = '/';
    }
  }

  isAuth() {
    if (this.token) {
      return true;
    }
    return false;
  }

  setAuthToken(token) {
    /* istanbul ignore next */
    if (window.localStorage) {
      localStorage.setItem('loginToken', token);
      localStorage.setItem('loginTokenVersion', settings.apiVersion);
    }
    this.token = token;
  }

}




export let auth = new Auth();