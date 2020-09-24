import {Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types"
import React from "react";
import Auth from "../Routes/Auth/index"
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search/index";
import Profile from "../Routes//Profile/index";

const LoggedInRoutes = () => (
    <Switch>
    <Route exact={true} path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
    </Switch>
)
const LoggedOutRoutes = () => (
    <Switch>
    <Route exact={true} path="/" component={Auth} />
    <Redirect from="*" to="/" />    
    </Switch>
    )


const AppRoutes = ({isLoggedIn}) => (
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> 
)

AppRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRoutes;