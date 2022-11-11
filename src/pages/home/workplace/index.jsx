import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Tooltip, Popover, Button, Menu } from 'antd';
import { Link, useModel, useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import EditableLinkGroup from './components/EditableLinkGroup';
import styles from './style.less';
import { queryProjectNotice, queryActivities, fakeChartData } from './service';
import { EditOutlined, FormOutlined, LoadingOutlined, PayCircleOutlined, ShopOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import PendingStepGroup from './components/PendingStepGroup';
import SyntheticImages from '@/components/SyntheticImages';
const links = [
  {
    title: '沉香小程序',
    href: '',
  },
  {
    title: '华卓小程序',
    href: '',
  },
  {
    title: '一当小程序',
    href: '',
  }
];

const PageHeaderContent = (props) => {
  const { userInfo: currentUser } = JSON.parse(localStorage.getItem('loginUserData'))
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          欢迎，
          {currentUser.username}
          ，祝你开心每一天！
        </div>
        <div>
          Hi~ o(*￣▽￣*)ブヾ(•ω•`)o
        </div>
      </div>
    </div>
  );
};

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="推广用户" value={5} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="待认证" value={8} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="下级分销员" value={2} />
    </div>
  </div>
);

const Workplace = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const { loading: projectLoading, data: projectNotice = [] } = useRequest(queryProjectNotice);
  const { loading: activitiesLoading, data: activities = [] } = useRequest(queryActivities);
  const { data } = useRequest(fakeChartData);


  return (
    <PageContainer
      header={{
        title: null
      }}
      content={<PageHeaderContent currentUser={currentUser || {}} />}
      extraContent={<ExtraContent />}
    >
      <SyntheticImages canvaswidth={500} canvasheight={300} />

    </PageContainer>
  );
};

export default Workplace;
