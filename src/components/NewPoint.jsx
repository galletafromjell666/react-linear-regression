import { useState } from "react";

const NewPoint = () => {
  const [valX, setValX] = useState(0);
  const [valY, setValY] = useState(0);
  return (
    <div>
      X=
      <input
        id="valueOfX"
        value={valX}
        onChange={(event) => setValX(event.target.value.replace(/\D/, ""))}
      />
      Y=
      <input
        id="valueOfY"
        value={valY}
        onChange={(event) => setValY(event.target.value.replace(/\D/, ""))}
      />
    </div>
  );
};

export default NewPoint;
