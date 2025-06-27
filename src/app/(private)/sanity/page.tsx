import { signOutAction } from '@/app/(auth)/auth/authActions';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const supabase = await createClient();

  // Attempt to get the currently authenticated user
  const { data: auth, error: authError } = await supabase.auth.getUser();
  if (authError || !auth?.user) {
    redirect('/login');
  }
  /* 2 . Pull the current user’s profile row ------------------------------ */
  // Adjust `user_id` (or `id`) to match the FK column in your `user_profiles` table
  const { data: profiles, error: profileError } = await supabase
    .from('user_profiles')
    .select('username')
    .eq('user_id', auth.user.id) // <-- use the auth user’s id as the filter
    .single();
  // Optional: handle the error (log, Sentry, show a fallback, etc.)
  if (profileError) {
    console.log(profileError);
  }

  const now = new Date();
  const currentTime = now.toLocaleTimeString();

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-3 h-screen">
        <p>Username: {profiles?.username}</p>
        <p>Most Recent Login Time: {currentTime}</p>
        <p>Last Login Time: {auth.user.last_sign_in_at}</p>
        <p>Your Role Is: {auth.user.role}</p>

        <Link href="/">
          <Button
            variant={'default'}
            className="text-black hover:bg-black hover:text-white"
          >
            Go Home
          </Button>
        </Link>
        <form action={signOutAction}>
          <Button
            variant={'default'}
            className="hover:text-white hover:bg-black"
          >
            Sign out
          </Button>
        </form>
      </div>
    </>
  );
}
