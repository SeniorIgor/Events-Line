import { FC } from 'react';

import useTypedSelector from '@/src/hooks/useTypedSelector';
import { selectNotification } from '@/src/store/features/notification';

import Header from '../Header/Header';
import Notification from '../Notification/Notification';

const Layout: FC = ({ children }) => {
  const notification = useTypedSelector(selectNotification);

  return (
    <>
      <Header />
      <main>{children}</main>
      {notification && <Notification {...notification} />}
    </>
  );
};

export default Layout;
