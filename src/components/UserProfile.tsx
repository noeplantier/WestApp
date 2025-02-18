import { UserProfile } from "@clerk/clerk-react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export default function UserProfilePage() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <UserProfile />
    </div>
  );
}
