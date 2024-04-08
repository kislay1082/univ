import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

export function UserAvatar({ user, ...props }) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <User2 className="h-4 w-4 text-muted-foreground" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}