'use client'
import { Button, ConfigProviderProps, DatePicker, Form, Input, message } from 'antd';
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { AddTransactionItem } from '@/service/allApi';

const AddTransaction = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      category:values?.category?.toLowerCase() ,
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : '',
    };
    try {
      const res = await AddTransactionItem(formattedValues);
      if (res?.status === 201) {
        messageApi.open({
          type: 'success',
          content: "Transaction Added successfully!",
        });
        form.resetFields();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
type SizeType = ConfigProviderProps['componentSize'];
  const [size, setSize] = useState<SizeType>('large');
  return (
    <>
     {contextHolder}
    <div className="bg-white p-4 rounded-lg shadow-md ">
      <Form form={form} onFinish={onFinish}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Form.Item name="description" rules={[{ required: false, message: "Please input your description" }]}>
              <Input placeholder="Description" style={{ height: '40px' }}/>
            </Form.Item>
          </div>

          <div>
            <Form.Item name="amount" rules={[{ required: false, message: "Please input your amount" }]}>
              <Input placeholder="Amount" style={{ height: '40px' }}/>
            </Form.Item>
          </div>

          <div>
            <Form.Item name="category" rules={[{ required: false, message: "Please input your category" }]}>
              <Input placeholder="Category" style={{ height: '40px' }}/>
            </Form.Item>
          </div>

          <div>
            <Form.Item name="date" rules={[{ required: false, message: "Please input your date" }]}>
            <DatePicker
            format="MM/DD/YYYY"
            style={{ width: '100%',height: '40px' }}
          />
            </Form.Item>
          </div>

          <div className="mr-1">
          <Button type="primary" size={size} htmlType="submit" >
            Primary
          </Button>

          </div>
        </div>
      </Form>
    </div>
    </>

  );
};

export default AddTransaction;
