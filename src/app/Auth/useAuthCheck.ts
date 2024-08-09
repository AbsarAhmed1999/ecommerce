import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/protected", {
          credentials: "include",
        });
        if (!response.ok) {
          router.push("/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        router.push("/login");
      }
    })();
  }, [router]);
  return loading;
}
