import React from 'react';
import { useState, useEffect, useRef, useContext } from "react";
import {SpinContext} from '../../contexts/spin-context'
import {Form, Button, Input, InputNumber} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
  
const validateMessages = {
    required: '${label} is required!',
};
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

function Valuable () {
    const [valuableTitle] = useState(arguments[0].match.params.name)
    const [existedValuable, setExistedValuable] = useState(!!valuableTitle)
    const {spinning, setSpinning} = useContext(SpinContext)
    const [method, setMethod] = useState(!!valuableTitle ? 'edit' : 'add')
    // const formRef = useRef('null')
    const [formRef] = Form.useForm();
    useEffect(() => {
        if (existedValuable) {
            setSpinning(true)
            Request.Valuable.getValuable({title: valuableTitle}).then(resp => {
                setSpinning(false)
                if (resp.data && resp.data.valuable) {
                    formRef.setFieldsValue(resp.data.valuable)
                } else {
                    setExistedValuable(false)
                    setMethod('add')
                }
            })
        }
    }, [])

    const submitValuable = e => {
        const value = formRef.getFieldValue()
        debugger;
    }
    return (
        <div className="valuable-edit">
            <Form form={formRef} {...layout} name="nest-messages" validateMessages={validateMessages} >
                <Form.Item name='title' label="title" required>
                    <Input id="title" />
                </Form.Item>
                <Form.Item name='description' label="description" >
                    <Input.TextArea id="description" rows="5" />
                </Form.Item>
                <Form.Item name='level' label="level" required>
                    <Input id="level" />
                </Form.Item>
                <Form.Item name='t1' label="人气" required>
                    <Input id="t1" />
                </Form.Item>
                <Form.Item name='t2' label="艺术" required>
                    <Input id="t2" />
                </Form.Item>
                <Form.Item name='t3' label="信仰" required>
                    <Input id="t3" />
                </Form.Item>
                <Form.Item name='t4' label="文化" required>
                    <Input id="t4" />
                </Form.Item>
                <Form.Item name='t5' label="科技" required>
                    <Input id="t5" />
                </Form.Item>
                <Form.List name="access" label="access">
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'access' : ''}
                                    key={`access_${index}`}
                                >
                                    <Form.Item
                                        {...field}
                                        noStyle
                                    >
                                        <Input style={{ width: '80%' }} />
                                    </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(index)}
                                        />
                                </Form.Item>
                            ))}
                            <Form.Item {...formItemLayoutWithOutLabel} >
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '80%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Access
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List name="skill" label="skill">
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'skill' : ''}
                                    key={`skill_${index}`}
                                >
                                    <Form.Item
                                        {...field}
                                        noStyle
                                    >
                                        <Input style={{ width: '80%' }} />
                                    </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(index)}
                                        />
                                </Form.Item>
                            ))}
                            <Form.Item {...formItemLayoutWithOutLabel} >
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '80%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Skill
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.List name="setSkill" label="setSkill">
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'setSkill' : ''}
                                    key={`setSkill_${index}`}
                                >
                                    <Form.Item
                                        {...field}
                                        noStyle
                                    >
                                        <Input style={{ width: '80%' }} />
                                    </Form.Item>
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(index)}
                                        />
                                </Form.Item>
                            ))}
                            <Form.Item {...formItemLayoutWithOutLabel} >
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '80%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add SetSkill
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" onClick={submitValuable}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export {Valuable as default};
