// пэйдж тэсэикс типо нот фаунд типо да

import { NextPage } from 'next';
import Head from 'next/head';

const NotFound: NextPage = () => {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1>NOT_FOUND</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </>
  );
};

export default NotFound;
