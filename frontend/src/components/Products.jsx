import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://e-commerce-z2bq.onrender.com/api/products?categor=${cat}`
            : "https://e-commerce-z2bq.onrender.com/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]); //here category is the dependency with which this useEffect is executed.

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item)=>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  // if a category is there setFilteredProducts by filtering through each item and tries to match the filter
  // with every key and value in that object and returns only the matching products

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => b.price - a.price)
      )
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => (<Product item={item} key={item.id} />)) //if there is a category display filteres
        : popularProducts
            .slice(0, 8)
            .map((item) => (<Product item={item} key={item.id}/>))}
    </Container>
  );
};

export default Products;
  