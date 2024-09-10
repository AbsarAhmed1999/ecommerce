import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuthCheck = (redirectOnFail: boolean = true) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("/api/check-token", {
          credentials: "include",
        });
        if (response.ok) {
          setAuthenticated(true);
        } else if (redirectOnFail) {
          router.push("/login");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        if (redirectOnFail) router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, [router, redirectOnFail]);

  return { loading, authenticated };
};
