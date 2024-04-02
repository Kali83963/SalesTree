import { Spin } from 'antd';

const PageLoader = () => {
  return (
    <div className="absolute left-1/2 top-1/2 w-32 h-38 transform -translate-x-1/2 -translate-y-1/2">
      <Spin size="large" />
    </div>
  );
};
export default PageLoader;