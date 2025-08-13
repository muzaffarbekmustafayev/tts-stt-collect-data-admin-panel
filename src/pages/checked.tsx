import { CONFIG } from 'src/config-global';

import { CheckedAudioView } from 'src/sections/checked/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Checked Audios - ${CONFIG.appName}`}</title>

      <CheckedAudioView />
    </>
  );
}
