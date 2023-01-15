import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import DashBoardNav from "./DashBoardNav";

const DashBoard = () => {
    return(
        <>
        <div className="card w-75 mx-auto p-5 bg-warning text-center">
            <ConnectNav />
        </div>
        <div className="container-fluid p-4">
            <DashBoardNav />
        </div>
        
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10"> 
                    <h3>Your Products</h3>
                </div>
                <div className="col-md-2">
                    <Link to="/" className="btn btn-primary">Browse Products</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default DashBoard;