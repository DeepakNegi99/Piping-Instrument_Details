import React, { useState } from 'react';
import { Card, Tabs, Upload, Button, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import QRCode from 'qrcode.react';
import { api } from '../services/api';

const Scanner: React.FC = () => {
  const [imgUrl, setImgUrl] = useState<string>('');
  const [analysis, setAnalysis] = useState<any>(null);

  const props = {
    beforeUpload: async (file: File) => {
      const form = new FormData();
      form.append('file', file);
      try {
        const res = await api.post('/api/ai-detect', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setAnalysis(res.data);
        setImgUrl(URL.createObjectURL(file));
      } catch (e) {
        message.error('Analysis failed');
      }
      return false; // prevent upload
    }
  };

  return (
    <Card title="QR Scan / Damage Recognition">
      <Tabs
        items={[
          {
            key: 'scan',
            label: 'Scan QR',
            children: (
              <div>
                <p>Show this QR on the instrument for quick lookup:</p>
                <QRCode value="SN-EXAMPLE-123" size={180} />
                <p style={{ marginTop: 12 }}>Integrate camera scanning via a library such as react-qr-reader.</p>
              </div>
            )
          },
          {
            key: 'upload',
            label: 'Upload Image',
            children: (
              <div>
                <Upload {...(props as any)} maxCount={1} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
                {imgUrl && (
                  <div style={{ marginTop: 16 }}>
                    <Image src={imgUrl} alt="uploaded" width={240} />
                  </div>
                )}
                {analysis && (
                  <pre style={{ marginTop: 16 }}>{JSON.stringify(analysis, null, 2)}</pre>
                )}
              </div>
            )
          }
        ]}
      />
    </Card>
  );
};

export default Scanner;
