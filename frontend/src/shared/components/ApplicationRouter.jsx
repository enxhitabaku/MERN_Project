import {useContext} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import {AuthenticationContext} from "../context/AuthenticationContext";
import Users from "../../user/pages/Users";
import UserPlaces from "../../places/pages/UserPlaces";
import AddPlace from "../../places/pages/NewPlace";
import EditPlace from "../../places/pages/EditPlace";
import LogIn from "../../user/pages/LogIn";
import SignUp from "../../user/pages/SignUp";
import NavigationBar from "./navigation/NavigationBar";

export default function ApplicationRouter() {
    const {isAuthenticated, user} = useContext(AuthenticationContext);

    return (
        <Router>
            <NavigationBar user={{user}}/>
            {isAuthenticated ?
                <AuthenticatedRoutes/> :
                <UnauthenticatedRoutes/>}
        </Router>
    )

}

function AuthenticatedRoutes() {
    return (
        <Switch>
            <Route path="/" exact>
                <Users/>
            </Route>
            <Route path="/:userId/places" exact>
                <UserPlaces/>
            </Route>
            <Route path="/add-place" exact>
                <AddPlace/>
            </Route>
            <Route path="/place/:placeId" exact>
                <EditPlace/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}

function UnauthenticatedRoutes() {
    return (
        <Switch>
            <Route path="/log-in" exact>
                <LogIn/>
            </Route>
            <Route path="/sign-up" exact>
                <SignUp/>
            </Route>
            <Redirect to="/log-in"/>
        </Switch>
    );
}
