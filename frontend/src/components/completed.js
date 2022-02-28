import Header from "./common/header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Completed () {

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user){
        navigate("/")   
        }
    },[navigate, user])

    return (
        <div>
            <Header />
            <p>Completed page</p>
        </div>
    );

}

export default Completed;