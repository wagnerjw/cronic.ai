import { Button } from '@/components/ui/button';
import Link from 'next/link';

// (your existing Hero component code, updated to accept username prop)
interface HeroProps {
  username: string | null;
}

export default function Hero({ username }: HeroProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl p-15  backdrop-blur-sm">
      <p>Welcome to cronic.ai</p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button className="hover:text-white hover:bg-black">Log In</Button>
        </Link>
        {username ? (
          <Link href={`/${username}`}>
            <Button className="hover:text-white hover:bg-black">
              Go To Account
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            className="bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            Go To Account
          </Button>
        )}
      </div>
    </div>
  );
}
