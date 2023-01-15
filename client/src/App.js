import Home from "./components/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import NavBar from "./components/NavBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./DashBoards/Dashboard";
import DashBoardSeller from "./DashBoards/DashBoardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";


function App() {

  return (
    <BrowserRouter>
    <NavBar/>
    <ToastContainer />
    <Switch>
      <Route path='/' exact>
        <Home />          
      </Route>
      <Route path='/login' exact>
        <Login />          
      </Route>
      <Route path='/register' exact>
        <Register />          
      </Route>
      <PrivateRoute path='/dashboard' exact>
        <DashBoard />          
      </PrivateRoute>
      <PrivateRoute path='/dashboard/seller' exact>
        <DashBoardSeller />          
      </PrivateRoute>
      <PrivateRoute path='/hotels/new' exact>
        <NewHotel />          
      </PrivateRoute>
      <PrivateRoute path='/stripe/callback' exact>
        <StripeCallback />          
      </PrivateRoute>
    </Switch>
      
    </BrowserRouter>

  );
}

export default App;
