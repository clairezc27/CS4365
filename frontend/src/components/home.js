import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Home () {

    return (
        <div className="image">
                <div className="text">
                    <h1 className="title">MySousChef</h1>
                    <p className="txt">Your personalized recipe search engine</p>
                    <Link to="/login">
                        <Button variant="contained" color="success">Get Started</Button>
                    </Link>

                </div>
            
        </div>
    );

}

export default Home;