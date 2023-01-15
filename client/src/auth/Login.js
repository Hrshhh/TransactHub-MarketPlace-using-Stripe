import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log("Under Try")
            await axios.post(`http://localhost:8001/api/login`, { 
                email,
                password
            }).then((responsee) => {
                console.log("Save User in REDUX and local storage then redirect ==> ", JSON.stringify(responsee.data));
                toast("Login SuccessFull !!");
                window.localStorage.setItem("redux_auth", JSON.stringify(responsee.data))

                dispatch({
                    type: "LOGGED_IN",
                    payload: responsee.data,
                })
                history.push("/dashboard");
                // console.log(JSON.stringify(respo));
            });
            
        }
        catch(err){
            console.log(err);
            if(err.response.status === 400) toast(err.response.data);
        }
    }

    return(
        <>
            <div className="card w-75 mx-auto mb-3 bg-warning p-5 text-center">
                <h2>Login Page</h2>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                        <LoginForm 
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            handleSubmit={handleSubmit}    
                        />
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Login;