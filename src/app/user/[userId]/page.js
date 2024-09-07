import UserDetails from "@/app/components/UserDetails";
import { getUserById } from "@/app/lib/data/users";

export default async function ViewUserProfile({ params }) {
  const { userId } = params;
  const user = await getUserById(userId);

  return <UserDetails user={user} userId={userId} />;
}
