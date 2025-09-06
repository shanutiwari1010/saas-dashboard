import { Card } from "@/components/ui/card";
import topSellingProducts from "../data/top-selling-products";

// Revenue data for different locations

export default function TopSellingProducts() {
  return (
    <Card className="w-3xl border-none bg-gray-50 p-6">
      <h2 className="heading mb-6">Top Selling Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/10 bg-gray-50">
              <th className="py-3 text-left font-light text-black/40">Name</th>
              <th className="py-3 text-left font-light text-black/40">Price</th>
              <th className="py-3 text-left font-light text-black/40">
                Quantity
              </th>
              <th className="py-3 text-left font-light text-black/40">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {topSellingProducts.map((product) => (
              <tr key={product.name} className="border-b border-gray-100">
                <td className="py-4 font-light ">
                  {product.name}
                </td>
                <td className="py-4 font-light">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-4 font-light">{product.quantity}</td>
                <td className="py-4 font-light">
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
