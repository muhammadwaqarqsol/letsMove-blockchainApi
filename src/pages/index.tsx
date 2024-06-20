import { Hero } from '~/components/app/Hero';
import { Navbar } from '~/components/app/Navbar';
import { NextPageWithLayout } from '~/pages/_app';

const IndexPage: NextPageWithLayout = () => (
  <>
    <div className="relative w-full !mx-auto">
      <Navbar />
      <Hero />
    </div>
  </>
);

export default IndexPage;
