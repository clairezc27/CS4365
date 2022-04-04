import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addFav, unfav, addSaved, complete } from "../../features/recipe";
import { getAuth } from "firebase/auth";

const RecipeCard = (props) => {

  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleFav = () => {
    dispatch(addFav(props.info, user.email));
  }

  const handleUnfav = () => {
    dispatch(unfav(user.email, props.info.label));
  }

  const handleSave = () => {
    dispatch(addSaved(props.info, user.email));
  }

  const handleComplete = () => {
    dispatch(complete(props.info, user.email));
  }

  return (
    <Card className="card" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="170"
        image={props.info.image}
      />
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography style={{ marginBottom: 0 }} gutterBottom variant="h5" component="div" >
          <a href={props.info.url}>{props.info.label}</a>
        </Typography>
      </CardContent>
      <CardActions>
        <div>
          {props.url === 'saved' ? <Button size="small" onClick={handleComplete}>Complete</Button> : <Button size="small" onClick={handleSave}>Save for Later</Button>}
        </div>
        <div>
          {props.url === 'favs' ? <Button size="small" onClick={handleUnfav}>Unfavorite</Button> : <Button size="small" onClick={handleFav}>Favorite</Button>}
        </div>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
