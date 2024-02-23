import { cn } from '@/utils/utils';
import { ClassValue } from 'clsx';

function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: ClassValue;
}) {
  return (
    <main
      className={cn(
        'mx-auto w-full max-w-screen-xl px-2.5 md:px-10',
        className,
      )}
    >
      {children}
    </main>
  );
}

export default MaxWidthWrapper;
