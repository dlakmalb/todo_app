import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './Login';
import NotFound from './components/NotFound';
import TodoList from './TodoList';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Switch>
            <Route path="/todo-list" exact component={TodoList} />
            <Route path="/login" exact component={Login} />
            <Route path="/not-found" exact component={NotFound} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="/not-found" />
        </Switch>
    </BrowserRouter>
);
