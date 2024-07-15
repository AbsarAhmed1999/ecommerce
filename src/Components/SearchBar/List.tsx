import Data from "../../data/mock-data.json";
export function List(props: any) {
  const { query } = props;
  const filteredData = Data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  const OpenProduct = (event: React.MouseEvent<HTMLDivElement>) => {
    //OuterText gives value
    console.log(event.currentTarget.outerText);
  };
  return (
    <div>
      {query ? (
        <div>
          <ul className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            {filteredData.length > 0 ? (
              filteredData.map((data) => (
                <li
                  key={data.id}
                  className="cursor-pointer text-lg font-semibold text-gray-800 mb-2 hover:text-blue-500 transition-colors duration-300"
                >
                  <div onClick={OpenProduct}>{data.name}</div>
                </li>
              ))
            ) : (
              <li className="text-lg font-semibold text-gray-800 mb-2">
                No results found
              </li>
            )}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
