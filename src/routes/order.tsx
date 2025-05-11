import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatting";
import { createOrder } from "../utils/order";
import { mult } from "../utils/currency";

export const Route = createFileRoute("/order")({
  component: OrderSummaryPage,
});

/**
 *  - [ ] - read-only view of cart
 *  - [ ] - final total + itemized list
 */
function OrderSummaryPage() {
  const { items, total } = useCart();

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
        <table className="cart-table">
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Cena</th>
              <th>Ilość</th>
              <th>Suma</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{formatPrice(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{formatPrice(mult(item.price, item.quantity))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <p>
            Suma częściowa: <span>{formatPrice(total)}</span>
          </p>
          <p>
            Suma: <span>{formatPrice(total)}</span>
          </p>
        </div>
        <button onClick={handleCreateOrder}>Złóż zamówienie</button>
      </main>
    </div>
  );
}
