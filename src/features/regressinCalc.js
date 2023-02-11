import regression from "regression";
const regressionCalc = (data) => {
  const dataArr = data.map((u) => [u.x, u.y]);
  //console.log(dataArr);
  const result = regression.linear(dataArr);
  const formattedPoints = result.points.map((u) => {
    return { x: u[0], y: u[1] };
  });
  // console.log(formattedPoints);
  return { result, formattedPoints };
};

export default regressionCalc;