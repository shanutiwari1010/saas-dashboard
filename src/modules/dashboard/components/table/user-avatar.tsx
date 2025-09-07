import { memo } from "react";

export interface UserAvatarProps {
  name: string;
  avatar?: string;
  size?: string;
}

export const UserAvatar = memo<UserAvatarProps>(
  ({ name, avatar, size = "h-8 w-8" }) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

    if (avatar) {
      return (
        <img
          src={avatar}
          alt={name}
          className={`${size} rounded-full object-cover`}
        />
      );
    }

    return (
      <div
        className={`${size} flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white`}
      >
        {initials}
      </div>
    );
  }
);

UserAvatar.displayName = "UserAvatar";
