import {Route, Switch } from "react-router-dom";
import PropTypes from "prop-types"
import React from "react";
import Auth from "../Routes/Auth/index"
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";

const LoggedInRoutes = () => (
    <Switch>
    <Route exact={true} path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route  path="/:username" component={Profile} />
    </Switch>
)
const LoggedOutRoutes = () => (
    <Switch>
    <Route exact={true} path="/" component={Auth} />
    </Switch>
    )


const AppRoutes = ({isLoggedIn}) => (
    isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> 
)

AppRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRoutes;