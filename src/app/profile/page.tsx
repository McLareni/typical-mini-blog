import { UserInfo } from "@/components/UserInfo/UserInfo";
import PrivateRoute from "@/route/PrivateRoute";
export default function Page() {
  console.log("profile");

  return (
    <PrivateRoute>
      <UserInfo />
    </PrivateRoute>
  );
}
