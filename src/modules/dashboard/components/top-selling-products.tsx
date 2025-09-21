import { Card } from "@/components/ui/card";
import { TOP_SELLING_PRODUCTS } from "@/modules/dashboard/data/products";

export function TopSellingProducts() {
  return (
    <Card className="bg-dashboard-revenue space-y-1 border-none p-6 shadow-none">
      <h2 className="heading">Top Selling Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-left text-xs leading-4 text-black/40 dark:text-white/40">
            <tr className="border-b border-black/10">
              <th className="py-3 font-normal">Name</th>
              <th className="py-3 font-normal">Price</th>
              <th className="py-3 font-normal">Quantity</th>
              <th className="py-3 font-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* //TODO: get data from zustand */ }
            {TOP_SELLING_PRODUCTS.map((product) => (
              <tr
                key={product.name}
                className="text-xs leading-4 font-normal text-black dark:text-white"
              >
                <td className="py-4 font-normal">{product.name}</td>
                <td className="py-4 font-normal">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-4 font-normal">{product.quantity}</td>
                <td className="py-4 font-normal">
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
