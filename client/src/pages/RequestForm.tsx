import React, { useState } from 'react';
import { Button, Card, Collapse, Form, Input, Select } from 'antd';
import { createRequest } from '../services/api';

const { Panel } = Collapse;

const RequestForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await createRequest(values);
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Damage Report Form">
      <Collapse defaultActiveKey={["1", "2"]}>
        <Panel header="Item Details" key="1">
          <Form form={form} layout="vertical">
            <Form.Item name="serialNumber" label="Serial Number" rules={[{ required: true }]}>
              <Input placeholder="Enter serial number" />
            </Form.Item>
            <Form.Item name="facility" label="Facility" rules={[{ required: true }]}>
              <Select options={[{ value: 'Facility A' }, { value: 'Facility B' }]} />
            </Form.Item>
            <Form.Item name="site" label="Site / Location" rules={[{ required: true }]}>
              <Input placeholder="Enter site or location" />
            </Form.Item>
          </Form>
        </Panel>
        <Panel header="Damage Description" key="2">
          <Form layout="vertical" form={form}>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <Input.TextArea rows={6} placeholder="Describe the damage" />
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={onSubmit} loading={loading}>Submit</Button>
      </div>
    </Card>
  );
};

export default RequestForm;
