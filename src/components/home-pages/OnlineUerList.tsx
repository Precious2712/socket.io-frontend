import { useAppContext } from "@/useContext/context";
import { OnlineUsersList } from "../DashBoardComp/online-users";

export function OnlinePage() {
    const { status } = useAppContext();

    if (!status) {
        return (
            <main className="container mx-auto p-6 md:p-8 lg:p-12">
                <p className="text-muted-foreground">Loading online users...</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto p-6 md:p-8 lg:pt-22">
            <OnlineUsersList data={status} />
        </main>
    );
}
