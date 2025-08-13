import { CONFIG } from 'src/config-global';

import { AudioView } from 'src/sections/audio/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Audios - ${CONFIG.appName}`}</title>

      <AudioView />
    </>
  );
}
