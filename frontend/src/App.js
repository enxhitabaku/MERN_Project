import './App.css'

import AvatarOne from './static/images/avatar/avatar-boy-1.png'
import AvatarTwo from './static/images/avatar/avatar-boy-2.png'

import Users from './user/pages/Users'
import NavigationBar from './shared/components/navigation/NavigationBar'
import UserPlaces from './places/pages/UserPlaces'
import AddPlace from './places/pages/NewPlace'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import EditPlace from './places/pages/EditPlace'
import LogIn from "./user/pages/LogIn";
import SignUp from "./user/pages/SignUp";
import {AuthenticationContext} from "./shared/context/AuthenticationContext";
import {useContext} from "react";

const DummyUsersList = [
    {
        id: '1',
        fullName: 'Remy John',
        imageSrc: AvatarOne,
        placeCount: 2,
    },
    {
        id: '2',
        fullName: 'John Sina',
        imageSrc: AvatarTwo,
        placeCount: 1,
    },
]

function App() {
    const {isAuthenticated} = useContext(AuthenticationContext);

    let routes;
    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users/>
                </Route>
                <Route path="/my-places" exact>
                    <h1>My Places</h1>
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
    } else {
        routes = (
            <Switch>
                <Route path="/log-in" exact>
                    <LogIn/>
                </Route>
                <Route path="/sign-up" exact>
                    <SignUp/>
                </Route>
                <Redirect to="/log-in"/>
            </Switch>
        )
    }

    return (
        <section id="travel-albania-main-container">
            <Router>
                <NavigationBar user={DummyUsersList[0]}/>
                {routes}
            </Router>
        </section>
    )
}

export default App
