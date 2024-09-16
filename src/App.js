import { TODO } from "./TODO";
import { All } from "./All";
import { Stat } from "./Stats";
import { Timer } from './Time';

import {BrowserRouter as Router, Route, Routes, NavLink} from 'react-router-dom';

/*The main page of display. It contains a navigation bar, its functionality imported from the router-dom.
  Each link directs to the pages imported above. Along with a header, the page has the purpose of connecting the
  application alltogether.
*/

function App() {
  return (
    <Router>
      <div className="App container">
        <h2 className="d-flex justify-content-center m-3">
          Productivity Manager
        </h2>

        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
          <ul className="navbar-nav justify-content-center">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-dark" to="/todo"> 
                Tasks
              </NavLink>
            </li>
            <li className="nav-item- m-1"> 
              <NavLink className="btn btn-light btn-outline-dark" to="/view">
                All Tasks
              </NavLink>
            </li>
            <li className="nav-item- m-1"> 
              <NavLink className="btn btn-light btn-outline-dark" to="/stat">
                Statistics
              </NavLink>
            </li>
            <li className="nav-item- m-1"> 
              <NavLink className="btn btn-light btn-outline-dark" to="/time">
                Timer
              </NavLink>
            </li>
          </ul>

        </nav>

        <Routes>
          <Route path='/todo' element={<TODO />}/>
          <Route path='/view' element={<All />}/>
          <Route path='/stat' element={<Stat />}/>
          <Route path='/time' element={<Timer />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
