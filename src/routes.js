import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './components/main';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Main} />
        </Switch>
    </BrowserRouter>
);

export default Routes;