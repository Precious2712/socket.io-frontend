import { useAppContext } from "@/useContext/context";
import { OfflineUsersList } from "../DashBoardComp/offline-users";

export function OfflinePage() {
  const { absent } = useAppContext();

  if (!absent) {
    return (
      <main className="container mx-auto p-6 md:p-8 lg:p-12">
        <p className="text-muted-foreground">Loading offline users...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6 md:p-8 lg:pt-22">
      <OfflineUsersList data={absent} />
    </main>
  );
}
