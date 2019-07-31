///node_modules
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';
import history from './routes/history';
import routes from './routes';

///styles
import './utils/global_styles/index.scss';

const routesArr = routes.map(({path, exact, component, name}) => {
    return <Route key={ name }{...{path, exact, component}} />
});

render(
    <Provider store={ store }>
        <Router history={ history }>
            <Switch>
                { routesArr }
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);