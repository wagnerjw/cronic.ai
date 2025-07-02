import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AgentPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Supabase Auth Check
  // This function checks if the user is authenticated and redirects if not
  // It also checks if the authenticated user's username matches the URL slug
  // If the username doesn't match, it redirects to the home page
  // Create a Supabase client instance
  const supabase = await createClient();
  // Attempt to get the currently authenticated user
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  // Pull the username from Supabase user metadata
  const username = data.user.user_metadata?.username;
  // await Params, then Pull the username from the URL slug
  const urlParams = await params;
  const urlUsername = urlParams.username;
  // If the authenticated user's username doesn't match the URL slug, redirect to home
  if (username !== urlUsername) {
    redirect('/');
  }
  // end auth check
  // If the user is authenticated and the username matches, render the page

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-3 h-screen">
        <p>Agent ID screen</p>
      </div>
    </>
  );
}
