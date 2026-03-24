import { getSession } from '@/app/lib/session';

import HeaderClient from './HeaderClient';

async function HeaderServer() {
  const token = await getSession();

  const userName = token ? token.user.name : '';

  return <HeaderClient userName={userName} />;
}

export default HeaderServer;
