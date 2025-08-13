import { CONFIG } from 'src/config-global';

import { AdminView } from 'src/sections/admin/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Admin - ${CONFIG.appName}`}</title>

      <AdminView />
    </>
  );
}
