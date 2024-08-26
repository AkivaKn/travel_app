import { auth } from "../../../auth";
import ProfilePage from "../components/ProfilePage";

export default async function Profile() {
      const { user } = await auth();
    return <div>
        <ProfilePage user = {user}/>
    </div>
}
