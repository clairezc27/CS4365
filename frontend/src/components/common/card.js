import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addFav } from "../../features/recipe";
import { getAuth } from "firebase/auth";

const RecipeCard = (props) => {

  const dispatch = useDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleFav = () => {
    dispatch(addFav(props.info, user.email));
  }

  return (
    <Card className="card" sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.info.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          <a href={props.info.url}>{props.info.label}</a>
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button size="small">Save</Button>
        <Button size="small" onClick={handleFav}>Favorite</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
