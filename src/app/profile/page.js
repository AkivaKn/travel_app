import { auth } from "../../../auth";
import ProfilePage from "../components/ProfilePage";

export default async function Profile() {
      const session = await auth();
    return <div>
        <ProfilePage session = {session}/>
    </div>
}
