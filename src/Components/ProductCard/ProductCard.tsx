import { useDispatch } from "react-redux";
import { addItem } from "@/app/redux/slices/Cart/index";

interface ProductProps {
  id: number;
  name: string;
  image: string;
  price: number;
  sentence: string;
  quantity?: number;
}

export function ProductCard({
  id,
  name,
  image,
  price,
  sentence,
  quantity,
}: ProductProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name,
        image,
        price,
        sentence,
        quantity,
      })
    );
  };

  return (
    <div className="relative m-4 flex w-full max-w-[18rem] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 h-48 overflow-hidden rounded-xl"
        href="#"
      >
        {/* Use w-full and h-full to ensure the image fills the container */}
        <img className="object-cover w-full h-full" src={image} alt="product" />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </a>
      <div className="mt-4 px-4 pb-4">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-slate-900">
            {name}
          </h5>
        </a>
        <div className="mt-2 mb-3 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-slate-900">${price}</span>
            <span className="text-sm text-slate-600 line-through ml-2">
              $699
            </span>
          </p>
          <div className="flex items-center">
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
