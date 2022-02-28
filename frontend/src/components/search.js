import Header from "./common/header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Search = () => {

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
            <p>Search page</p>
        </div>
    );

}

export default Search;