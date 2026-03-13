import Link from 'next/link';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';

const NotFoundPage: FC = () => {
  return (
    <>
      <h1 className="text-4xl font-bold my-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button type="button">Return to Home</Button>
      </Link>
    </>
  );
};
export default NotFoundPage;
