import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

function Home () {

    const theme = createTheme({
        status: {
          danger: '#e53e3e',
        },
        palette: {
          primary: {
            main: '#0971f1',
            darker: '#053e85',
          },
          white: {
            main: '#FFFFFF',
            contrastText: '##000000',
          },
          black: {
            main: '#000000',
            contrastText: '##FFFFFF',
          },
        },
      });

    return (
        <div className="image">
            <ThemeProvider theme={theme}>
                <div className="text">
                    <h1 className="title">MySousChef</h1>
                    <p className="txt">Your personalized recipe search engine</p>
                    <Link to="/login">
                        <Button variant="contained" color="success">Get Started</Button>
                    </Link>

                </div>
            </ThemeProvider>
            
        </div>
    );

}

export default Home;