import Spinner from '@/components/spinner';
import { cn } from '@/lib/utils';

const Loading = () => {
  return (
    <div className={cn('flex h-screen items-center justify-center')}>
      <Spinner />
    </div>
  );
};

export default Loading;
