import { useSelector } from "react-redux";
import {Card, Avatar, Badge} from 'antd';
import moment from 'moment';
import { useEffect, useState} from 'react';
import axios from "axios";

const {Meta} = Card;
const {Ribbon} = Badge;

const ConnectNav = () => {
    const [balance, setBalance] = useState(0);
    const {redux_auth} = useSelector((state) => ({...state}));
    const {user} = redux_auth;
    

    useEffect(() => {
        axios.post(`http://localhost:8001/api/get-account-balance`, {}, {
            headers: {
                Authorization: `Bearer ${redux_auth.token}`
            },
        })
        .then((res) => {
            console.log("Account >> ", res);
            setBalance(res.data);
        })
        console.log("Handle Click executed");
    }, [])

    const currencyFormatter = (input) => {
        return(input.amount).toLocaleString(input.currency, {
            maximumFractionDigits: 2,
            style: "currency",
            currency: input.currency,
        })
    }

    return(
        <div className="d-flex justify-content-around">
            <Card>
                <Meta 
                    avatar={<Avatar style={{ backgroundColor: "purple"}}>{user.name[0]}</Avatar>}
                    title={user.name}
                    description={`Joined ${moment(user.createdAt).fromNow()}`}
                />
            </Card>
            {redux_auth && redux_auth.user.stripe_seller && redux_auth.user.stripe_seller.charges_enabled && (
                <>
                    <Ribbon text="Pending Bal" color="purple">
                        <Card>
                            {balance && balance.pending && balance.pending.map((balpend, index) => (
                                <span key={index} className="lead">{currencyFormatter(balpend)}</span>
                            ))}
                        </Card>
                    </Ribbon>
                    
                </>
            )}
            
        </div>
    )
}

export default ConnectNav;