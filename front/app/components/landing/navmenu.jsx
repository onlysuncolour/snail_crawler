import React, {useState} from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom"

function Navmenu () {
    const [current, setCurrent] = useState('')

    function handleClick(e) {
        setCurrent(e.key)
    }
    return  (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="valuable" >
                <Link to="/valuable"> Valuable </Link>
            </Menu.Item>
            <Menu.Item key="talent" >
                <Link to="/talent"> Talent </Link>
            </Menu.Item>
            <Menu.Item key="partner" >
                <Link to="/partner"> Partner </Link>
            </Menu.Item>
        </Menu>
    )
}

export {Navmenu as default};
