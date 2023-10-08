import React from 'react';
import styles from './polynomial.module.css'
import Chart from '../../components/Chart';
import PointControl from '../../components/PointControl';
import TitleBar from '../../components/TitleBar/TitleBar';

const Polynomial = () => {
    return (
        <div>
            <TitleBar/>
            <div className={styles.mainContainer}>

                <Chart />
                <PointControl />
            </div>
        </div>
    );
};

export default Polynomial;
