import Header from "./common/header";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSaved } from "../features/recipe";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "./common/card";
import { useLocation } from "react-router-dom";

const Saved = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loc = useLocation();
  let path = loc.pathname.substring(1, loc.pathname.length);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    dispatch(getSaved(user.email));
  }, [navigate, user, dispatch]);

  const saved = useSelector((state) => state.recipe.saved);

  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        {saved.map((result, index) => (
          <RecipeCard
            url={path}
            className="card"
            style={{ margin: "3px" }}
            key={index}
            info={result}
          />
        ))}
      </div>
    </div>
  );
};

export default Saved;
