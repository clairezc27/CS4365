import Header from "./common/header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { searchRecipe } from "../features/recipe";


const Search = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user){
        navigate("/")   
        }
    },[navigate, user])

    const handleSearch = () => {
        let arr = ['beef, cheese'];
        dispatch(searchRecipe(arr));
    }

    return (
        <div>
            <Header />
            <p>Search page</p>
            <Button variant="contained" onClick={handleSearch}>Submit</Button>
        </div>
    );

}

export default Search;