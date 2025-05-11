import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatting";
import { createOrder } from "../utils/order";

export const Route = createFileRoute("/order")({
  component: OrderSummaryPage,
});

/**
 *  - [ ] - read-only view of cart
 *  - [ ] - final total + itemized list
 *  - [ ] - "Place Order" button
 *  - [ ] - Link back to cart
 */
function OrderSummaryPage() {
  const { items } = useCart();

  const handleCreateOrder = () => {
    const order = createOrder(items);

    window.location.href = `/confirmation?orderId=${encodeURIComponent(order.id)}`;
  };

  return (
    <div>
      <header>
        <Link to="/cart"> Powrót do koszyka</Link>
      </header>
      <main>
        <h1>Podsumowanie</h1>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            >
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              <p>{formatPrice(item.price)}</p>
            </li>
          ))}
        </ul>
        TODO: koncowa laczna kwota zamowiniea
        <button onClick={handleCreateOrder}>Złóż zamówienie</button>
      </main>
    </div>
  );
}
