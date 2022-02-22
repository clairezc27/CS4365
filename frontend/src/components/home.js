import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

function Home () {

    return (
        <div>
            <Link to="/signup">
                <Button variant="contained">Signup</Button>
            </Link>

            <Link to="/login">
                <Button variant="contained">Login</Button>
            </Link>
            
        </div>
    );

}

export default Home;