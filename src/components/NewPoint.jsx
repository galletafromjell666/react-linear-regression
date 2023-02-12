import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPoint } from '../features/regression/regressionSlice';
const NewPoint = () => {
    const dispatch = useDispatch();
    const [valX, setValX] = useState(0);
    const [valY, setValY] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`valX${valX} valY ${valY}`);
        dispatch(addPoint({ x: valX, y: valY }));
    };

    return (
        <form onSubmit={handleSubmit}>
            X=
            <input id="valueOfX" value={valX} onChange={(event) => setValX(event.target.value.replace(/\D/, ''))} />
            Y=
            <input id="valueOfY" value={valY} onChange={(event) => setValY(event.target.value.replace(/\D/, ''))} />
            <input value="add" type="submit" />
        </form>
    );
};

export default NewPoint;
