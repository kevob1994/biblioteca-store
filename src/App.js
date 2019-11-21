import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Subscribers from './components/subscribers/Subscribers';
import EditSubscriber from './components/subscribers/EditSubscriber';
import NewSubscriber from './components/subscribers/NewSubscriber';
import ShowSubscriber from './components/subscribers/ShowSubscriber';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
          {/* <Redirect exact from='/' to='/subscriptores' /> */}
            <Route exact path="/suscriptores" component={Subscribers}/>
            <Route exact path="/suscriptores/mostrar/:id" component={ShowSubscriber}/>
            <Route exact path="/suscriptores/nuevo" component={NewSubscriber}/>
            <Route exact path="/suscriptores/editar/:id" component={EditSubscriber}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
