import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";

import "./style.css";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [shownproducts, setShownProducts] = useState([]);
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
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        let productsToSet = res.data.product;
        console.log("productsToSet: ", productsToSet);
        console.log("selectedFilter: ", selectedFilter);
        if (selectedFilter) {
          const filteredProducts = productsToSet.filter(
            (product) =>
              product.League === selectedFilter ||
              product.Brand === selectedFilter ||
              product.Season === selectedFilter ||
              product.Type === selectedFilter
          );
          console.log("filteredProducts: ", filteredProducts);
          setProducts(
            filteredProducts.length ? filteredProducts : productsToSet
          );
          setShownProducts(filteredProducts.length);
          console.log("Shown Products: ", products);
        } else {
          setProducts(productsToSet);
        }
        console.log("Shown Products: ", products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [selectedFilter]);
  const handleFilterChangeTest = () => {};

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="mb-4">
        <h5>Filters</h5>
        <div className="row">
          <div className="col-md-2">
            <select
              name="league"
              className="form-select"
              onChange={handleFilterChangeTest}
            >
              <option value="">Select League</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              name="brand"
              className="form-select"
              onChange={handleFilterChangeTest}
            >
              <option value="">Select Brand</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              name="season"
              className="form-select"
              onChange={handleFilterChangeTest}
            >
              <option value="">Select Season</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              name="type"
              className="form-select"
              onChange={handleFilterChangeTest}
            >
              <option value="">Select Type</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Max Price"
              onChange={handleFilterChangeTest}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <div>
        <h6>Shown {shownproducts} products</h6>
      </div>
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
