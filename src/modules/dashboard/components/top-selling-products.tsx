"use client";

import { Card } from "@/components/ui/card";

// Revenue data for different locations

const topSellingProducts = [
  {
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  { name: "Half Sleeve Shirt", price: 39.99, quantity: 64, amount: 2559.36 },
  { name: "Lightweight Jacket", price: 20.0, quantity: 184, amount: 3680.0 },
  { name: "Marco Shoes", price: 79.49, quantity: 64, amount: 1965.81 },
];

export default function TopSellingProducts() {
  return (
        <Card className="w-3xl border-none bg-gray-50 p-6">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Top Selling Products
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left font-medium text-gray-500">
                    Name
                  </th>
                  <th className="py-3 text-left font-medium text-gray-500">
                    Price
                  </th>
                  <th className="py-3 text-left font-medium text-gray-500">
                    Quantity
                  </th>
                  <th className="py-3 text-left font-medium text-gray-500">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product) => (
                  <tr key={product.name} className="border-b border-gray-100">
                    <td className="py-4 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="py-4 text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="py-4 text-gray-900">{product.quantity}</td>
                    <td className="py-4 text-gray-900">
                      $
                      {product.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
  );
}
