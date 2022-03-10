import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { deleteIngdt } from "../../features/recipe";

const Ingdt = (props) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(deleteIngdt(props.name));
    }

    return (
        <>
            <Button style={{margin: "3px"}} variant="contained" endIcon={<ClearIcon />} onClick={handleClick}>
                {props.name}
            </Button>
        </>
    )
}

export default Ingdt;