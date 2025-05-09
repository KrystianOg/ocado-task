import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
// FIXME: how to rename this so i don't have to use "as"
import { Product as ProductType } from "../types";
import { formatPrice } from "../utils/formatting";

export const Route = createFileRoute("/products")({
  component: ProductsList,
});

function Product({ id, name, price }: ProductType) {
  const addToCart = (): void => { };

  return (
    <article style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <p>{id}</p>
      <span>{name}</span>
      <p>{formatPrice(price)}</p>
      <button onClick={addToCart}>Dodaj do koszyka</button>
    </article>
  );
}

/**
 *  - [ ] load static products
 *  - [ ] Each product has name, price, “Add to Cart” button
 *  - [ ] Navigation link to /cart
 */
function ProductsList() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch("/products.json").then(async (res) => {
      const json = (await res.json()) as ProductType[];
      setProducts(json);
    });
  }, []);

  return (
    <>
      <a href="/cart">Do koszyka</a>
      <ul style={{ listStyleType: "none" }}>
        {products.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </ul>
    </>
  );
}
