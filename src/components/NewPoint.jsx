import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addPoint } from '../features/regression/regressionSlice';

const NewPoint = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({ valX: 0, errorValX: false, valY: 0, errorValY: false });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setValues({ ...values, errorValX: false, errorValY: false });
    if (!/^-?\d*\.?\d+$/.test(values.valX) || !/^-?\d*\.?\d+$/.test(values.valY)) {
      setValues({ ...values, errorValX: isNaN(values.valX), errorValY: isNaN(values.valY) });
      return;
    }
    const { valX, valY } = values;
    dispatch(addPoint({ x: parseFloat(valX), y: parseFloat(valY) }));
  }, [dispatch, values]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {values.errorValX || values.errorValY ? <h1>ERROR: Invalid input</h1> : null}
        X=
        <input
          id="valueOfX"
          value={values.valX}
          onChange={(event) => setValues({ ...values, valX: event.target.value.replace(/[^0-9+\-.]/g, '') })}
          required
        />
      </div>
      <div>
        Y=
        <input
          id="valueOfY"
          value={values.valY}
          onChange={(event) => setValues({ ...values, valY: event.target.value.replace(/[^0-9+\-.]/g, '') })}
          required
        />
      </div>
      <input type="submit" value="add" />
    </form>
  );
};

export default NewPoint;
