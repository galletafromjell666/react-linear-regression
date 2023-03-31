import React from 'react';
import Chart from '../components/Chart';
import PointControl from '../components/PointControl';

const Polynomial = () => {
    return (
        <div>
            <div className="feature-container">
                <Chart />
                <PointControl />
            </div>
        </div>
    );
};

export default Polynomial;
