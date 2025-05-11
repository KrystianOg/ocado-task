import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatting";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

// TODO: change list to table
// FIXME: calculates sum wrongly

/**
 *  - [ ] - display items with quantity selector, item total
 *  - [x] - edit quantity, remove item
 *  - [ ] - shows subtotal and total
 *  - [ ] - links to product list and order summary
 */
function CartPage() {
  const { items, total, updateQuantity } = useCart();
  return (
    <div>
      <div>
        <a href="/products">Powrót do produktów</a>

        <a href="/order"></a>
      </div>

      <h1>Cart</h1>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          >
            <h2>{item.name}</h2>
            <p>
              {item.price.main}.{item.price.fractional}
            </p>
            <p>Ilosc: {item.quantity}</p>
            <div>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <input
                type="number"
                value={item.quantity.toString()}
                min={0}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
              />
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
            </div>
            <p>Sum: {item.quantity * item.price.fractional}</p>
          </li>
        ))}
      </ul>
      <div>
        <h2>Subtotal</h2>
        <p>{formatPrice(total)}</p>
        <h2>Total</h2>
        <p>{formatPrice(total)}</p>
      </div>
      <a href="/order">Podsumowanie zamówienia</a>
    </div>
  );
}
