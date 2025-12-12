'use client';

import { useAppContext } from "@/useContext/context";
import { FriendsList } from "../DashBoardComp/FriendsList";

export function FriendsBucketList() {
    const { friendsData } = useAppContext();
    return (
        <div>
            <FriendsList
                data={friendsData?.friends}
            />

        </div>
    )
}
