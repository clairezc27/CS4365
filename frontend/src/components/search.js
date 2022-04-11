import Header from "./common/header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngdt } from "../features/recipe";
import TextField from "@mui/material/TextField";
import Ingdts from "./common/ingdts";
import Filter from "./common/filter";
import "../index.css";
import RecipeCard from "./common/card";

const Search = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ingdt, setIngdt] = useState("");
  const [ingdtList, setIngdtList] = useState([]);
  const results = useSelector((state) => state.recipe.results);
  
  useEffect(() => {
      if (!user){
      navigate("/")
      }
  },[navigate, user])

  const handleSubmit = (event) => {
    event.preventDefault();
    setIngdt("");
    setIngdtList(ingdtList.concat(ingdt));
    dispatch(addIngdt(ingdt));
  };

  return (
    <div>
      <Header />

      <div className="splitScreen">
        <div className="leftPane">
          <div className="search">
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="ingdtInput"
                variant="outlined"
                label="Enter ingredients here"
                value={ingdt}
                onChange={(e) => {
                  setIngdt(e.target.value);
                }}
              />
            </form>
          </div>
          <br />
          <Ingdts />
        </div>
        <div className="rightPane">
          <Filter />
        <div style={{ display:'inline'}}>
          {results.map((result, index) => (
            <RecipeCard
              className="card"
              style={{ margin: "3px" }}
              key={index}
              info={result.recipe}
            />
          ))}
        </div>  
        </div>
      </div>
    </div>
  );
};

export default Search;
