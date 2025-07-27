import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { writeClient } from '@/sanity/lib/write-client';
import { after } from 'next/server';

const View = async ({ id }: { id: string }) => {
  // useCdn: false -> this disables Sanity's global CDN cache and it always fetches the freshest data
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // PATCH - update the number of views
  // -> this request and the one above it will execute sequentially and the UI won't load until they are done
  // -> after() helps us fix this by running the call after the first request above is finished and without blocking the UI
  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
