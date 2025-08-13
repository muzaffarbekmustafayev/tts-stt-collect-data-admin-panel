import { CONFIG } from 'src/config-global';

import { SentenceView } from 'src/sections/sentence/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Sentences - ${CONFIG.appName}`}</title>

      <SentenceView />
    </>
  );
}
