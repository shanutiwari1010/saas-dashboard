"use client";

import { Card } from "@/components/ui/card";
import topSellingProducts from "../data/top-selling-products";

// Revenue data for different locations

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
              <th className="py-3 text-left font-medium text-gray-500">Name</th>
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
