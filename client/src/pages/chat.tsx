import type { GetServerSideProps, NextPage } from 'next';

import ChatPage from '../modules/chat/ChatPage';

interface PageChatProps {}

const PageChat: NextPage<PageChatProps> = () => {
  return <ChatPage />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default PageChat;
