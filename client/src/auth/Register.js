import {useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log("Under Try")
            await axios.post(`http://localhost:8001/api/register`, { 
                name,
                email,
                password
            }).then((respo) => {
                console.log("Under Response");
                console.log("Register User ==> ", respo);
                toast("Register success.Please login");
                history.push("/login");
            });
            
        }
        catch(err){
            console.log(err);
            if (err.response.status === 400) toast(err.response.data);
        }
    }

    
    return(
        <>
            <div className="card w-75 mx-auto mb-3 bg-warning p-5 text-center">
                <h2>Register page</h2>
            </div>
            
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                        <RegisterForm 
                            name={name}
                            email={email}
                            password={password}
                            setName={setName}
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

export default Register;