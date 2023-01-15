import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './NavBar.css';
import { useHistory } from "react-router-dom";

const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {redux_auth} = useSelector((state) => ({...state}));

    const rmlocalStorage = () => {
        
        dispatch({
            type: "LOGGED_OUT",
            payload: null,
        })

        window.localStorage.removeItem("redux_auth"); 
        history.push("/login");
    }

    return(
        <div className="nav d-flex justify-content-around">
            <Link className= "nav-link" to="/" >
                Home
            </Link>
            {redux_auth !== null && 
                <Link className= "nav-link pointer" to="/dashboard">Dashboard</Link>
            }
            {redux_auth !== null && 
                <a className= "nav-link pointer" href="#" onClick={rmlocalStorage} >Logout</a>
            }
            
            {redux_auth === null && (
                <>
                    <Link className= "nav-link" to="/register" >
                        Register
                    </Link>
                    <Link className= "nav-link" to="/login" >
                        Login
                    </Link>
                </>
            )}
        </div>
    )
}
export default NavBar;