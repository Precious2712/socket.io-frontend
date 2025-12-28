"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserStatusResponse } from "@/data/user/user-status"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MailIcon, UserIcon } from "lucide-react"

interface OnlineUsersListProps {
    data: UserStatusResponse
}

export function OnlineUsersList({ data }: OnlineUsersListProps) {
    const users = data.offlineOrOnline

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    if (!data) {
        return (
            <Card className="w-full">
                <CardContent className="flex items-center justify-center p-8">
                    <p className="text-muted-foreground">{"Failed to load users"}</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Online Users</h2>
                    <p className="text-muted-foreground mt-1">
                        {users.length} {users.length === 1 ? "user" : "users"} currently online
                    </p>
                </div>
                <Badge variant="secondary" className="h-8 px-4 text-base">
                    Total: {users.length}
                </Badge>
            </div>

            {users.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center p-12">
                        <UserIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium">No offline users</p>
                        <p className="text-sm text-muted-foreground mt-1">All users are currently online</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <Card key={user._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="text-lg font-semibold">
                                            {getInitials(user.firstName, user.lastName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg truncate">
                                            {user.firstName} {user.lastName}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-1 mt-1">
                                            <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground" />
                                            Offline
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <MailIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="truncate text-muted-foreground">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <UserIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="text-muted-foreground capitalize">{user.gender}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="text-muted-foreground text-xs">Last updated: {formatDate(user.updatedAt)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
