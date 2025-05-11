import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "../hooks/useCart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

/**
 *  - [ ] - display items with quantity selector, item total
 *  - [x] - edit quantity, remove item
 *  - [ ] - shows subtotal and total
 *  - [ ] - links to product list and order summary
 */
function CartPage() {
  const { items } = useCart();
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {items.map((item) => (
          <div key={item.product.id}>
            <h2>{item.product.name}</h2>
            <p>
              {item.product.price.main}.{item.product.price.fractional}
            </p>
            <p>Ilosc: {item.count}</p>
            <div>
              <button>+</button>
              <input type="number" value={item.count} min={0} />
              <button>-</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Subtotal</h2>
        <p>
          {items.reduce(
            (acc, item) => acc + item.product.price.main * item.count,
            0,
          )}
        </p>
        <h2>Total</h2>
        <p>
          {items.reduce(
            (acc, item) => acc + item.product.price.main * item.count,
            0,
          )}
        </p>
      </div>
    </div>
  );
}
