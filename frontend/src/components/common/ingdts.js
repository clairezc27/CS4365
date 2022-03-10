import { useSelector } from 'react-redux';
import Ingdt from './ingdt';

const Ingdts = () => {
    const ingdts = useSelector((state) => state.recipe.ingdts);

    return (
        <>
            {ingdts.map((ingdt, index) => (
                <Ingdt style={{margin: "3px"}} key={index} name={ingdt}/>
            ))}
        </>
    )
}

export default Ingdts;