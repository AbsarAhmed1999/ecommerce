import { useState } from "react";
import Link from "next/link";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-dropdown">
      <button onClick={toggleDropdown}>Profile</button>
      {isOpen && (
        <div className="dropdown-menu">
          <Link href="/cart">Cart</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/settings">Settings</Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
