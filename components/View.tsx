import { STARTUP_VIEWS_QUERY } from '@/lib/queries';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';

const View = async ({ id }: { id: string }) => {
  // useCdn: false -> this disables Sanity's global CDN cache and it always fetches the freshest data
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // TODO: Update the number of views

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
