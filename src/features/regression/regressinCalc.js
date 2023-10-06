import regression from 'regression';
const regressionCalc = (data) => {
    const dataArr = data.map((u) => [u.x, u.y]);
    const result = regression.polynomial(dataArr);
    const formattedPoints = result.points.map((u) => {
        return { x: parseFloat(u[0]), y: parseFloat(u[1]) };
    });
    return { result, formattedPoints };
};

export default regressionCalc;
