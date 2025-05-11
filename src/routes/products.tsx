import { createFileRoute, Link } from "@tanstack/react-router";
// FIXME: how to rename this so i don't have to use "as"
import { Product as ProductType } from "../types";
import { formatPrice } from "../utils/formatting";
import { useCart } from "../hooks/useCart";

import products from "../assets/products.json";

export const Route = createFileRoute("/products")({
  component: ProductsList,
});

export function Product(product: ProductType) {
  const { name, price } = product;
  const { addItem } = useCart();

  return (
    <tr>
      <td>{name}</td>
      <td>{formatPrice(price)}</td>
      <td>
        <button onClick={() => addItem(product)}>Dodaj do koszyka</button>
      </td>
    </tr>
  );
}

function ProductsList() {
  const typedProducts: ProductType[] = products;

  return (
    <>
      <Link to="/cart">Przejdź do koszyka</Link>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Cena</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {typedProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </tbody>
      </table>
    </>
  );
}
