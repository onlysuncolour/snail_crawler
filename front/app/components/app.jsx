import React from 'react';
import { useState, useEffect, useRef } from "react";
import Routes from "./app/routes"
import NavMenu from './landing/navmenu';
import { Router } from "react-router";
import {SpinContext} from '../contexts/spin-context'
import {Spin} from 'antd'

export default function () {
    const [spinning, setSpinning] = useState(false)
    return (
        <SpinContext.Provider value={{ spinning, setSpinning }}>
            <Spin tip="Loading..." spinning={spinning}>
                <Router history={browserHistory}>
                    <NavMenu></NavMenu>
                    <Routes></Routes>
                </Router>
            </Spin>
        </SpinContext.Provider>
    )
}
