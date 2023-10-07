import React from 'react';
import Chart from '../components/Chart';
import PointControl from '../components/PointControl';
import TitleBar from '../components/TitleBar';

const Polynomial = () => {
    return (
        <div>
            <TitleBar/>
            <div className="feature-container">

                <Chart />
                <PointControl />
            </div>
        </div>
    );
};

export default Polynomial;
