import * as React from "react";

interface AvatarProps {
  profileImage: string | null; // Accepting string or null as the type
}

export default function Avatar({ profileImage }: AvatarProps) {
  return (
    <img
      className="w-10 h-10 rounded-full"
      src={`${profileImage}`}
      alt="Rounded avatar"
    />
  );
}
