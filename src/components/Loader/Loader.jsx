import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import css from './Loader.module.css';

export class Loader extends Component {
    render() {
        return (
            <div className={css.Loader}>
                <div className={css.loaderBox}>
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            </div>
        );
    }
}
