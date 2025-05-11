import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/formatting";
import "../assets/cart-page.css";
import { mult } from "../utils/currency";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

// TODO: change list to table
// FIXME: calculates sum wrongly

function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  return (
    <div className="cart-container">
      <div className="cart-nav">
        <Link to="/products">Powrót do produktów</Link>
      </div>

      <h1>Koszyk</h1>

      {items.length === 0 && <p>No items in cart</p>}
      {items.length > 0 && (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Suma</th>
                <th>Akcje</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)}</td>
                  <td style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td>{formatPrice(mult(item.price, item.quantity))}</td>
                  <td>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </td>
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
          <Link to="/order">Podsumowanie zamówienia</Link>
        </>
      )}
    </div>
  );
}
