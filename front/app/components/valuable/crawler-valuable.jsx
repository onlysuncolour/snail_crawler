import React from 'react';
import { useState, useContext, useEffect, useRef } from "react";
import Valuable from './valuable';
import {Select, notification, List, Table, Button, Popconfirm} from 'antd';
import {SpinContext} from '../../contexts/spin-context'

const columnKeys = ["title", "description", "level", "t1", "t2", "t3", "t4", "t5", "access", "setSkill", "skill"]
const renderColumns = {}
columnKeys.forEach(i => {
    const k = i
    renderColumns[`render_${k}`] = function(text, record) {
        let renderText = text, renderDiffText = record[`${k}_diff`];
        if (text instanceof Array) {
            renderText = text.join('\n')
            renderDiffText = renderDiffText ? renderDiffText.join('\n') : null
        }
        if (renderDiffText) {
            return (
            <div>
                <div>{renderText}</div>
                <div className="diff">{renderDiffText}</div>
            </div>
            )
        } else {
            return (
                <div>{renderText}</div>
            )
        }
    }
    renderColumns.render_action = function(text, record, index) {
        return (
            <>
            <Popconfirm title="Sure to setAsNew?" onConfirm={() => actionFuncs.setAsNew(record, index)}>
                <a>setAsNew</a>
            </Popconfirm>
            <Popconfirm title="Sure to setAsOld?" onConfirm={() => actionFuncs.setAsOld(record, index)}>
                <a>setAsOld</a>
            </Popconfirm>
            </>
        )
    }
})

const columns = [
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
        render: renderColumns.render_title,
        width: 120
      },
      {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
        render: renderColumns.render_description,
        width: 400
      },
      {
        title: 'level',
        dataIndex: 'level',
        key: 'level',
        render: renderColumns.render_level,
        width: 80
      },
      {
        title: '人气',
        dataIndex: 't1',
        key: 't1',
        render: renderColumns.render_t1,
        width: 50
      },
      {
        title: '艺术',
        dataIndex: 't2',
        key: 't2',
        render: renderColumns.render_t2,
        width: 50
      },
      {
        title: '信仰',
        dataIndex: 't3',
        key: 't3',
        render: renderColumns.render_t3,
        width: 50
      },
      {
        title: '文化',
        dataIndex: 't4',
        key: 't4',
        render: renderColumns.render_t4,
        width: 50
      },
      {
        title: '科技',
        dataIndex: 't5',
        key: 't5',
        render: renderColumns.render_t5,
        width: 50
      },
      {
        title: 'access',
        dataIndex: 'access',
        key: 'access',
        render: renderColumns.render_access,
        width: 100
      },
      {
        title: 'skill',
        dataIndex: 'skill',
        key: 'skill',
        render: renderColumns.render_skill,
        width: 200
      },
      {
        title: 'setSkill',
        dataIndex: 'setSkill',
        key: 'setSkill',
        render: renderColumns.render_setSkill,
        width: 200
      },
      {
        title: '操作',
        // dataIndex: 'action',
        key: 'action',
        render: renderColumns.render_action,
        width: 200
      },
]

const actionFuncs = {
    setAsNew() {},
    setAsOld() {},
}

function CrawlerValuable () {
    const [source, setSource] = useState();
    const [level, setLevel] = useState("");
    const [crawlerList, setCrawlerList] = useState([]);
    const [crawlerShowList, setCrawlerShowList] = useState([]);
    const [crawlerValuables, setCrawlerValuables] = useState([]);
    const [valuables, setValuables] = useState([]);
    const [compared, setCompared] = useState(false)
    const {spinning, setSpinning} = useContext(SpinContext)

    // define columns and all render functions here inside component function
    // otherwise setFuncs below won't work.
    actionFuncs.setAsNew = function (record, index)  {
        const target = {}
        Object.keys(record).filter(i => !i.endsWith('_diff')).forEach(i => target[i] = record[i]);
        crawlerValuables[index] = target;
        setCrawlerValuables([...crawlerValuables, {}])
    };
    actionFuncs.setAsOld = function (record, index) {
        Object.keys(record).filter(i => i.endsWith('_diff')).forEach(i => {
            let key = i.split('_')[0];
            record[key] = record[i];
            delete record[i]
        });
        const target = {...record}
        crawlerValuables[index] = target;
        setCrawlerValuables([...crawlerValuables])
    };

    const getCrawlerList = () => {
        if (crawlerList.length > 0) {
            err('请勿重复拉取列表')
            return;
        }
        setSpinning(true)
        Request.Valuable.getCrawlerValuableList({source}).then(resp => {
            setSpinning(false)
            if (resp.data && resp.data.list) {
                setCrawlerList(resp.data.list)
                setCrawlerShowList(resp.data.list)
            }
        })
    }
    const saveCrawlerList = () => {
        if (crawlerList && crawlerList.length > 0) {
            setSpinning(true)
            Request.Valuable.saveValuableList({list: crawlerList}).then(resp => {
                setSpinning(false)
            });
        }
    }
    const getCrawlerValuables = () => {
        if (!level) {
            err('未选择品阶');
            return
        }
        // if (level && crawlerValuables && crawlerValuables.length && crawlerValuables[0].level == level) {
        //     err('请勿重复拉取数据')
        //     return;
        // }
        setCompared(false)
        setSpinning(true)
        Request.Valuable.getCrawlerValuables({level, source}).then(resp => {
                setSpinning(false)
            if (resp.data && resp.data.list) {
                setCrawlerValuables(resp.data.list)
            }
        })
    }
    const loadValuablesAndCompare = () => {
        if (!level || !crawlerValuables || crawlerValuables.length == 0 || crawlerValuables[0].level != level) {
            err('未选择品阶或爬虫贵重品为空或品阶选择错误');
            return;
        }
        setSpinning(true)
        Request.Valuable.getValuables({level}).then(resp => {
                setSpinning(false)
            if (resp.data && resp.data.list) {
                setValuables(resp.data.list)
                // compareValuables()
            }
        })
    }
    useEffect( () => {
        if (!crawlerValuables || crawlerValuables.length == 0) {
            err('爬虫贵重品为空');
            return;
        }
        setCompared(true);
        if (valuables.length == 0) {
            return;
        }
        crawlerValuables.forEach(v => {
            const savedV = valuables.filter(i => i.title == v.title)[0]
            if (savedV && !Common.compareObj(v, savedV)) {
                for (const key in v) {
                    if (!Common.compareObj(v[key], savedV[key])) {
                        v[`${key}_diff`] = savedV[key]
                    }
                }
            }
        })
        setCrawlerValuables([...crawlerValuables])
    }, [valuables])
    // const compareValuables = (v) => {
    // }
    const saveValuables = () => {
        if (!compared || !crawlerValuables || crawlerValuables.length == 0) {
            err('未进行对比或爬虫贵重品为空');
            return;
        }
        const updateValuables = crawlerValuables.map(v => ({
            title: v.title,
            description: v.description,
            level: v.level,
            t1: v.t1,
            t2: v.t2,
            t3: v.t3,
            t4: v.t4,
            t5: v.t5,
            access: v.access,
            setSkill: v.setSkill,
            skill: v.skill,
        }));
        setSpinning(true)
        Request.Valuable.saveValuables({list: updateValuables}).then(resp => {
            setSpinning(false)
        })
    }
    const err = (msg) => {
        notification.error({
            message: msg,
            duration: 1,
          });
    }
    const levelChange = l => {
        setLevel(l)
        setCrawlerShowList(crawlerList.filter(i => i.level == l))
    }
    const handleDelete = a => {
        a;
        debugger;
    }

    const Option = Select.Option;
    return (
        <div className="crawler-valuable">
            <div className="header">
                <Select placeholder="选择数据源" style={{ width: 120 }} value={source} onChange={setSource}>
                    <Option value="0">数据源1</Option>
                    <Option value="1">数据源2</Option>
                </Select>
                <Button type="primary" onClick={getCrawlerList}>爬虫列表</Button>
                <Button type="primary" onClick={saveCrawlerList}>保存列表</Button>
                <Select placeholder="选择品阶" style={{ width: 120 }} value={level} onChange={levelChange}>
                    <Option value=""></Option>
                    <Option value="SSS">SSS</Option>
                    <Option value="SS">SS</Option>
                    <Option value="S">S</Option>
                    <Option value="AAA">AAA</Option>
                    <Option value="AA">AA</Option>
                    <Option value="A">A</Option>
                    <Option value="蓝">蓝</Option>
                    <Option value="绿">绿</Option>
                </Select>
                <Button type="primary" onClick={getCrawlerValuables}>爬虫贵重品</Button>
                <Button type="primary" onClick={loadValuablesAndCompare}>对比贵重品</Button>
                <Button type="primary" onClick={saveValuables}>保存贵重品</Button>
            </div>
            <div className="content">
                <div className="valuable-list">
                    <List
                        size="small"
                        header={<div>爬虫贵重品列表</div>}
                        bordered
                        dataSource={crawlerShowList}
                        renderItem={item => <List.Item>{item.title}, {item.level}</List.Item>}
                        />
                </div>
                <div className="valuables">
                    <Table 
                        columns={columns} 
                        dataSource={crawlerValuables} 
                        rowKey={record=>record.title} 
                        pagination={false}
                        handleDelete={handleDelete}
                        />
                </div>
            </div>
        </div>
    )
}

export {CrawlerValuable as default};
