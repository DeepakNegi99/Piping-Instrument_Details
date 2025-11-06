import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { Pie, Column } from '@ant-design/plots';
import  {useDispatch} from 'react-redux';
import { setRequests } from '../store/requestsSlice';
import { fetchRequests } from '../services/api';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRequests().then((data) => dispatch(setRequests(data as any)));
  }, [dispatch]);

  const pieData = [
    { type: 'Facility A', value: 27 },
    { type: 'Facility B', value: 25 },
    { type: 'Facility C', value: 18 },
    { type: 'Facility D', value: 15 },
    { type: 'Facility E', value: 10 },
    { type: 'Facility F', value: 5 }
  ];

  const barData = [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 18 },
    { month: 'Mar', count: 9 },
    { month: 'Apr', count: 22 }
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Card title="Requests by Facility (this year)">
          <Pie data={pieData} angleField="value" colorField="type" radius={0.9} />
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Monthly Requests">
          <Column data={barData} xField="month" yField="count" columnWidthRatio={0.6} />
        </Card>
      </Col>
    </Row>
  );
};

export default connect(null, { setRequests })(Dashboard);
