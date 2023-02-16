import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPoint } from '../features/regression/regressionSlice';
const NewPoint = () => {
    const dispatch = useDispatch();
    const [valX, setValX] = useState(0);
    const [errorValX, setErrorValX] = useState(false);
    const [valY, setValY] = useState(0);
    const [errorValY, setErrorValY] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorValX(false);
        setErrorValY(false);
        if (isNaN(valX) || isNaN(valY)) {
            //console.log('oh no');
            isNaN(valX) && setErrorValX(true);
            isNaN(valY) && setErrorValY(true);
            return;
        }
        //console.log(`valX${valX} valY ${valY}`);
        dispatch(addPoint({ x: valX, y: valY }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {errorValX && <h1>ERROR at X = NaN</h1>}
                X=
                <input id="valueOfX" value={valX} onChange={(event) => setValX(event.target.value.replace(/[^0-9+\-.]/g, ''))} required />
            </div>
            <div>
                {errorValY && <h1>ERROR at Y = NaN</h1>}
                Y=
                <input id="valueOfY" value={valY} onChange={(event) => setValY(event.target.value.replace(/[^0-9+\-.]/g, ''))} required />
            </div>
            <input value="add" type="submit" />
        </form>
    );
};

export default NewPoint;
