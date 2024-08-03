import React from "react";

export const List = ({ data }: any) => {
  if (data.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <ul>
      {data.map((item: any) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};
