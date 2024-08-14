import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProfileDropdownProps {
  isOpen: boolean;
  toggleDropdown: () => void;
}

const ProfileDropdown = ({ isOpen, toggleDropdown }: ProfileDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-transparent"
          onClick={toggleDropdown} // Optional: Close dropdown on clicking outside
        >
          <ul className="space-y-3 px-5 py-3 dark:text-white">
            <li className="font-medium">
              <Link
                href="/cart"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:border-r-4 hover:border-indigo-700 dark:hover:border-indigo-700 transition-colors duration-200"
              >
                <div className="mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                Cart
              </Link>
            </li>
            <li className="font-medium">
              <Link
                href="/profile"
                className="flex items-center p-2 text-gray-900 dark:text-white hover:border-r-4 hover:border-indigo-700 dark:hover:border-indigo-700 transition-colors duration-200"
              >
                <div className="mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                Profile
              </Link>
            </li>
            <hr className="dark:border-gray-700" />
            <li className="font-medium">
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-600 transition-colors duration-200"
              >
                <div className="mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
