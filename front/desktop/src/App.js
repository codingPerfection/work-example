import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { auth } from './helpers/Auth';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Authorized from './components/Authorized/Authorized';


class App extends React.Component {


  fetchEvents() {
    this.props.history.push('/');
  }

  render() {
    if (auth.isAuth()) {
      return <Authorized />
    } else {
      return (
        <Switch>
          <Route exact path="/" >
            <Login auth={this.props.auth} done={this.fetchEvents.bind(this)} />
          </Route>
          <Route path="/register/:code" render={(props) =>
            <Register
              code={props.match.params.code}
              done={this.fetchEvents.bind(this)}
            />}
          />
          <Route path="/user"><div>register user</div></Route>
        </Switch >
      )
    }
  }

}



//export default App;
export default withRouter(observer(App));