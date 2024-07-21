"use client";

import { useEffect, useState } from "react";

export default function ProtectedPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const response = await fetch("/api/protected");
      const result = await response.json();
      setData(result);
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}
