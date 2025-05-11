import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
// FIXME: how to rename this so i don't have to use "as"
import { Product as ProductType } from "../types";
import { formatPrice } from "../utils/formatting";
import { useCart } from "../hooks/useCart";

export const Route = createFileRoute("/products")({
  component: ProductsList,
});

type ProductJSON = Omit<ProductType, "price"> & {
  price: {
    main: number;
    fractional: number;
  };
};

function toProduct(value: ProductJSON): ProductType {
  const v: ProductType = {
    id: value.id,
    name: value.name,
    price: {
      main: value.price.main,
      fractional: value.price.main,
    },
  };

  return v;
}

function Product(product: ProductType) {
  const { id, name, price } = product;
  const { addItem } = useCart();

  return (
    <article style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <p>{id}</p>
      <span>{name}</span>
      <p>{formatPrice(price)}</p>
      <button onClick={() => addItem(product)}>Dodaj do koszyka</button>
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
    void fetch("/products.json").then(async (res) => {
      const json = (await res.json()) as ProductJSON[];
      const products = json.map((value) => toProduct(value));
      setProducts(products);
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
