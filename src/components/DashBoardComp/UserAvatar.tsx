type UserAvatarProps = {
  gender: string;
  firstName: string;
  lastName: string;
};

export function UserAvatar({ gender, firstName }: UserAvatarProps) {
  const initial = firstName.charAt(0).toUpperCase();
  const bgColor =
    gender.toLowerCase() === "male" ? "bg-blue-600" : "bg-pink-600";

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${bgColor}`}
    >
      {initial}
    </div>
  );
}
