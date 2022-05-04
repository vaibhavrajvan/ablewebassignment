import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Jobentry from './Jobentry';
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Route path="/" exact>
          <LandingPage />
        </Route>

        <Route path="/jobentry" exact>
          <Jobentry />
        </Route>
      </BrowserRouter>

    </div>
  );
}

export default App;
