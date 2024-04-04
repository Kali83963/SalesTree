import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading({ isLoading, children }) {
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

  return (
    <Spin indicator={antIcon} spinning={isLoading} style={{maxHeight:'100vh'}}>
      {children}
    </Spin>
  );
}