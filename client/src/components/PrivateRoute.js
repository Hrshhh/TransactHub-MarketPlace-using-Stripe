import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({...rest}) => {
    const {redux_auth} = useSelector((state) => ({...state}));

    return redux_auth && redux_auth.token ? <Route {...rest} />:<Redirect to="/login" />
}

export default PrivateRoute;