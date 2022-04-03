import Header from "./common/header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getFavs } from "../features/recipe";
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from "./common/card";

function Favs() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(getFavs(user.email));
  }, [navigate, user, dispatch]);

  const favs = useSelector((state) => state.recipe.favs);
  return (
    <div>
      <Header />
      <div style={{ padding: 10}}>
          {favs.map((result, index) => (
            <RecipeCard
              className="card"
              style={{ margin: "3px" }}
              key={index}
              info={result}
            />
          ))}
        </div>  
    </div>
  );
}

export default Favs;