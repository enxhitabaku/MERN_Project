import './App.css'
import {AuthenticationContextProvider} from "./shared/context/AuthenticationContext";
import ApplicationRouter from "./shared/components/ApplicationRouter";


function App() {
    return (
        <AuthenticationContextProvider>
            <section id="travel-albania-main-container">
                <ApplicationRouter/>
            </section>
        </AuthenticationContextProvider>
    );
}

export default App
