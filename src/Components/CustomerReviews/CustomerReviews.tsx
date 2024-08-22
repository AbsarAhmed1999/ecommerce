import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO of Example Corp",
    review:
      "This product exceeded my expectations. Excellent quality and fantastic customer service!",
    rating: 5,
    // avatar: "/path/to/avatar1.jpg", // Replace with actual paths or URLs
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Marketing Director",
    review:
      "Highly recommend this! The results were impressive and the support team was top-notch.",
    rating: 4,
    // avatar: "/path/to/avatar2.jpg",
  },
  // Add more reviews as needed
];

export default function CustomerReviews() {
  return (
    <section className="customer-reviews py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-800">
            Customer Reviews
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="review-card p-8 bg-[#333333] text-white rounded-lg shadow-lg border border-gray-700 transition-transform transform hover:scale-105"
            >
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-600 mr-4">
                  <Image
                    src={""}
                    // src={review.avatar}
                    alt={`${review.name}'s avatar`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {review.name}
                  </h3>
                  <p className="text-gray-300">{review.role}</p>
                </div>
              </div>
              <p className="text-gray-200 mb-4">{review.review}</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
