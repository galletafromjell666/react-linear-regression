import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePoint } from '../features/regression/regressionSlice';
const PointList = () => {
    const dispatch = useDispatch();
    const pointState = useSelector((state) => state.CartessianPoints);
    return (
        <div>
            {pointState &&
                pointState.map(({ id, coordinates: { x, y } }) => (
                    <div key={id} style={{ display: 'flex', flexDirection: 'row' }}>
                        <p> {`x = ${x} y=${y}`}</p>
                        <button
                            onClick={() => {
                                dispatch(removePoint(id));
                            }}
                        >
                            X
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default PointList;
