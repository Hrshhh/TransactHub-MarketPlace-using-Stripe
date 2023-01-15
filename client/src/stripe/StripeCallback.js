import {LoadingOutlined} from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const StripeCallback = () => {
    const dispatch = useDispatch();
    const {redux_auth} = useSelector((state) => ({...state}));

    useEffect(() => {
        if(redux_auth && redux_auth.token){
            accountStatus();
        }
    }, [redux_auth]);

    const accountStatus = async () => {
        try{
            await axios.post(`http://localhost:8001/api/get-account-status`, {}, {
                headers: {
                    Authorization: `Bearer ${redux_auth.token}`,
                }
            }).then((res) => {
                console.log("User account on stripe callback from backend >> ", res);

                updateUserInLocalStorage(res.data, () => {

                    dispatch({
                        type:"LOGGED_IN",
                        payload: res.data,
                    });

                    window.location.href = "/dashboard/seller"
                })
            })
        }
        catch(err){
            console.log(err);
        }
    }

    const updateUserInLocalStorage = (user, next) => {
        if(window.localStorage.getItem("redux_auth")){
            let redux_auth = JSON.parse(localStorage.getItem("redux_auth"));
            redux_auth.user = user;
            localStorage.setItem("redux_auth", JSON.stringify(redux_auth));
            next();
        }
    }

    return(
        <div className='text-center mt-4'>
            <LoadingOutlined className='h1 text-success' />
        </div>
    )
}

export default StripeCallback;