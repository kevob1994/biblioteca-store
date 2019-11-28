import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Books from './components/books/Books';
import EditBooks from './components/books/EditBook';
import ShowBooks from './components/books/ShowBook';
import NewBooks from './components/books/NewBook';
import LoanBooks from './components/books/LoanBook';



import Subscribers from './components/subscribers/Subscribers';
import EditSubscriber from './components/subscribers/EditSubscriber';
import NewSubscriber from './components/subscribers/NewSubscriber';
import ShowSubscriber from './components/subscribers/ShowSubscriber';

import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={UserIsAuthenticated(Books)}/>
            <Route exact path="/libros/prestamo/:id" component={UserIsAuthenticated(LoanBooks)}/>
          {/* <Redirect exact from='/' to='/subscriptores' /> */}
            <Route exact path="/suscriptores" component={UserIsAuthenticated(Subscribers)}/>
            <Route eact path="/libros/mostrar/:id" component={UserIsAuthenticated(ShowBooks)}/>
            <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NewBooks)}/>
            <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditBooks)}/>
            <Route exxact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(ShowSubscriber)}/>
            <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NewSubscriber)}/>
            <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditSubscriber)}/>

            <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
