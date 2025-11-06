import React from 'react';
import { Card, List, Button, Space, Input } from 'antd';

const Workflow: React.FC = () => {
  const pending = [
    { id: 'REQ-001', serialNumber: 'SN-123', by: 'John D.', action: 'APPROVE' },
    { id: 'REQ-002', serialNumber: 'SN-456', by: 'Mary P.', action: 'REVIEW' }
  ];

  return (
    <Card title="Pending Workflow">
      <List
        dataSource={pending}
        renderItem={(item) => (
          <List.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{item.id}</strong> — {item.serialNumber} — Requested by {item.by}
              </div>
              <Input.TextArea rows={2} placeholder="Add a comment..." />
              <Space>
                <Button type="primary">Approve</Button>
                <Button danger>Reject</Button>
              </Space>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Workflow;
