import { UserInfo } from "@/components/UserInfo/UserInfo";
import PrivateRoute from "@/route/PrivateRoute";

export default async function Page() {
  return (
    <PrivateRoute>
      <UserInfo/>
    </PrivateRoute>
  );
}
