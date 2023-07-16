import './App.css'
import NavigationBar from './shared/components/NavigationBar'
import Users from './user/pages/Users'
import AvatarOne from './static/images/avatar/avatar-boy-1.png'
import AvatarTwo from './static/images/avatar/avatar-boy-2.png'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'

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
    return (
        <section id="trave-albania-main-container">
            <Router>
                <NavigationBar user={DummyUsersList[0]} />
                <Switch>
                    <Route path="/" exact>
                        <Users />
                    </Route>
                    <Route path="/my-places" exact>
                        <h1>My Places</h1>
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Router>
        </section>
    )
}

export default App
