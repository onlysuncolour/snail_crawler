import React from 'react';
import { useState, useContext, useEffect, useRef } from "react";
import {Button, Select, Table} from 'antd';
import Common from '../../common/common'
import {SpinContext} from '../../contexts/spin-context'
import Dict from '../../common/dict'
import { Link } from "react-router-dom"

const levelSortMap = {
    'SSS': 1, "SS": 2, "S": 3, "AAA": 4, "AA": 5, "A": 6, "蓝": 7, "绿": 8
}
const tableSort = (a, b) => {
    if (Number(a) > Number(b)) {
        return -1
    } else if (Number(a) < Number(b)) {
        return 1
    } else {
        return 0
    }
}
const columns = [
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        width: 120,
        render: text => (
            <Link to={`/valuable/edit/${text}`}>{text}</Link>
        )
      },
      {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
        width: 300
      },
      {
        title: 'level',
        dataIndex: 'level',
        key: 'level',
        width: 80,
        sorter: (a,b) => tableSort(levelSortMap[a.level], levelSortMap[b.level])
      },
      {
        title: '人气',
        dataIndex: 't1',
        key: 't1',
        width: 80,
        sorter: (a,b) => tableSort(a.t1, b.t1)
      },
      {
        title: '艺术',
        dataIndex: 't2',
        key: 't2',
        width: 80,
        sorter: (a,b) => tableSort(a.t2, b.t2)
      },
      {
        title: '信仰',
        dataIndex: 't3',
        key: 't3',
        width: 80,
        sorter: (a,b) => tableSort(a.t3, b.t3)
      },
      {
        title: '文化',
        dataIndex: 't4',
        key: 't4',
        width: 80,
        sorter: (a,b) => tableSort(a.t4, b.t4)
      },
      {
        title: '科技',
        dataIndex: 't5',
        key: 't5',
        width: 80,
        sorter: (a,b) => tableSort(a.t5, b.t5)
      },
      {
        title: 'access',
        dataIndex: 'access',
        key: 'access',
        width: 120,
        render: text => (<span>{text.join('\n')}</span>)
      },
      {
        title: 'skill',
        dataIndex: 'skill',
        key: 'skill',
        width: 260,
        render: text => (<span>{text.join('\n')}</span>)
      },
      {
        title: 'setSkill',
        dataIndex: 'setSkill',
        key: 'setSkill',
        width: 260,
        render: text => (<span>{text.join('\n')}</span>)
      },
]

function Valuable () {
    const [valuables, setValuables] = useState([]);
    const [displayValuables, setDisplayValuables] = useState([]);
    const {spinning, setSpinning} = useContext(SpinContext)
    const [level, setLevel] = useState()
    const [prefer, setPrefer] = useState()
    const [tags, setTags] = useState([])

    const getValuables = () => {
        if (valuables.length > 0) {
            Common.err('请勿重复请求数据')
            return;
        }
        setSpinning(true)
        Request.Valuable.getValuables().then(resp => {
            setSpinning(false)
            if (resp.data && resp.data.list) {
                setValuables(resp.data.list)
                setDisplayValuables(resp.data.list)
            }
        })
    }
    const levelChange = (l) => {
        setLevel(l)
        displayValuablesChange(l, undefined, undefined)
    }
    const preferChange = (p) => {
        setPrefer(p)
        displayValuablesChange(undefined, p, undefined)
    }
    const tagsChange = (t) => {
        setTags(t)
        displayValuablesChange(undefined, undefined, t)
    }
    const checkTags = (t, vt) => {
        return t.filter(i => !vt[i]).length == 0
    }
    const displayValuablesChange = (l = level, p = prefer, t = tags) => {
        const list = valuables.filter(v => !((l && v.level != l) || (p && v.prefer != p) || (t.length > 0 && !checkTags(t, v.tags))))
        setDisplayValuables(list)
    }
    const addValuables = () => {
        browserHistory.push('/valuable/edit')
    }
    const Option = Select.Option;
    return (
        <div className="valuable-main">
            <div className="header">
                <Button type="primary" onClick={getValuables}>拉取数据</Button>
                <Select placeholder="选择品阶" style={{ width: 120 }} value={level} onChange={levelChange}>
                    <Option value=""></Option>
                    {
                        Dict.LEVEL.map(l => (
                            <Option value={l.key} key={l.key}>{l.name}</Option>
                            ))
                        }
                </Select>
                <Select placeholder="选择偏向" style={{ width: 120 }} value={prefer} onChange={preferChange}>
                    <Option value=""></Option>
                    {
                        Dict.PREFER.map(l => (
                            <Option value={l.key} key={l.key}>{l.name}</Option>
                            ))
                        }
                </Select>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: 600 }}
                    placeholder="选择标签"
                    value={tags}
                    onChange={tagsChange}
                    >
                    {Dict.TAG.map(i => (<Option key={i.name}>{i.name}</Option>))}
                </Select>
                <Button type="primary" onClick={addValuables}>新增贵重品</Button>
            </div>
            <div className="content">
            <Table 
                        columns={columns} 
                        dataSource={displayValuables} 
                        rowKey={record=>record.title} 
                        pagination={false}
                        />
            </div>
        </div>
    )
}

export {Valuable as default};
