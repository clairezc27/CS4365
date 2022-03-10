import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';

const Ingdts = () => {
    const ingdts = useSelector((state) => state.recipe.ingdts);

    return (
        <>
        {ingdts.map((ingdt, index) => (
            <Button style={{margin: "3px"}} key={index} variant="contained" endIcon={<ClearIcon />}>
                {ingdt}
            </Button>

        ))

        }
        </>
    )
}

export default Ingdts;