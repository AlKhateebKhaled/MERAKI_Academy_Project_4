import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import ProductCard from "../../components/ProductCard";
import "./style.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const {
    formData,
    setFormData,
    msg,
    setMsg,
    token,
    setToken,
    selectedFilter,
    setSelectedFilter,
  } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        if (selectedFilter) {
          const filteredProducts = res.data.product.filter(
            (product) => product.League === selectedFilter
          );
          console.log("filteredProducts: ", filteredProducts);
          setProducts(filteredProducts);
        } else {
          setProducts(res.data.product);
        }
        console.log("All Products: ", res.data.product);
        console.log("selectedFilter: ", selectedFilter);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
