import Header from "./common/header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { searchRecipe, addIngdt } from "../features/recipe";
import TextField from '@mui/material/TextField';
import Ingdts from "./common/ingdts";


const Search = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ingdt, setIngdt] = useState();
    const [ingdtList, setIngdtList] = useState([]);

    useEffect(() => {
        if (!user){
        navigate("/")   
        }
    },[navigate, user])

    const handleSearch = () => {
        if (ingdtList.length > 0) {
            let request =ingdtList[0];
            for(let i = 1; i < ingdtList.length; i++) {
                request += "%20" + ingdtList[i];
            }
            dispatch(searchRecipe(request));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIngdt("");
        setIngdtList(ingdtList.concat(ingdt));
        dispatch(addIngdt(ingdt));
    }

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                <TextField
                    id="ingdtInput"
                    variant="outlined"
                    label="Enter ingredients here"
                    value={ingdt}
                    onChange={(e) => {
                        setIngdt(e.target.value);
                    }}
                />
            </form>
            <Button variant="contained" onClick={handleSearch}>Submit</Button>
            <br />
            <Ingdts />
        </div>
    );

}

export default Search;