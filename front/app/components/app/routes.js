import routes from '../../common/routes'
import React from 'react';
import { Route, Switch, Redirect, NavLink} from "react-router-dom"
import { useState, useEffect, useRef } from "react";

function Routes () {
        return (
        <Switch>
            {
                routes.map(r => <Route exact={r.exact} path={r.path} component={r.component} key={r.key} />)
            }
            <Redirect to="/"/>
        </Switch>
    )
}

export {Routes as default};
