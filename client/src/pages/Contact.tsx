import React from 'react';
import { Card, Typography } from 'antd';

const { Paragraph } = Typography;

const Contact: React.FC = () => (
  <Card title="Contact">
    <Paragraph>
      For support or access requests, please contact the Maintenance IT team at
      support@deepakschemicals.example or call +91-XXXXXXXXXX.
    </Paragraph>
  </Card>
);

export default Contact;
