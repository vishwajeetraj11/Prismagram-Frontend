import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types"
import React from "react";
import Auth from "../Routes/Auth/index"
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => (
    <Route exact={true} path="/" component={Feed} />
)
const LoggedOutRoutes = () => (
    <Route exact={true} path="/" component={Auth} />
    )


const AppRouter = ({isLoggedIn}) => (
    <Router>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes /> }</Switch>
    </Router>
)

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;