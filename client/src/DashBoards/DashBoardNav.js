import { Link } from "react-router-dom";

const DashBoardNav = () => {
    const pathName = window.location.pathname;
    return (
    <ul className="nav nav-tabs">
        <li className="nav-item">
            <Link className={`nav-link ${pathName ==="/dashboard" && "active"}`} to="/dashboard">Products List</Link>
        </li>

        <li className="nav-item">
            <Link className={`nav-link ${pathName ==="/dashboard/seller" && "active"}`} to="/dashboard/seller">Your Products</Link>
        </li>
    </ul>
    )
    
}

export default DashBoardNav;