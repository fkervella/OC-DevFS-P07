import { getSession } from '@/app/lib/session';

import HeaderClient from './HeaderClient';

async function Header() {
  const token = await getSession();

  const userName = token ? token.user.name : '';

  return <HeaderClient userName={userName} />;
}

export default Header;
