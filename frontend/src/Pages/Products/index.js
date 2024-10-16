import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { FaFutbol, FaCalendarAlt, FaTshirt } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    selectedFilter,
    shownProducts,
    setShownProducts,
    filters,
    setFilters,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        let productsToSet = res.data.product;

        const filteredProducts = productsToSet.filter((product) => {
          const teamMatch = filters.team
            ? product.team.toLowerCase().includes(filters.team.toLowerCase())
            : true;
          const leagueMatch = filters.league
            ? product.League === filters.league
            : true;
          const brandMatch = filters.brand
            ? product.Brand === filters.brand
            : true;
          const seasonMatch = filters.season
            ? product.Season === filters.season
            : true;
          const typeMatch = filters.type ? product.Type === filters.type : true;
          const priceMatch = filters.maxPrice
            ? product.price <= filters.maxPrice
            : true;

          return (
            teamMatch &&
            leagueMatch &&
            brandMatch &&
            seasonMatch &&
            typeMatch &&
            priceMatch
          );
        });

        const finalFilteredProducts = filteredProducts.filter((product) =>
          selectedFilter
            ? product.team === selectedFilter ||
              product.League === selectedFilter ||
              product.Brand === selectedFilter ||
              product.Season === selectedFilter ||
              product.Type === selectedFilter
            : true
        );

        setProducts(finalFilteredProducts);
        setShownProducts(finalFilteredProducts.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [filters, selectedFilter]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      team: e.target.value,
    }));
  };

  const handleCardClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container">
      <h2>Products</h2>

      <div className="search-section mb-4">
        <h5>Search</h5>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="team"
              className="form-control"
              placeholder="Search by Team"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="filter-section mb-4">
        <h5>Filters</h5>
        <div className="row">
          <div className="col-md-2">
            <select
              name="league"
              className="form-select"
              onChange={handleFilterChange}
            >
              <option value="">Select League</option>
              <option value="Premier League">Premier League</option>
              <option value="Serie A">Serie A</option>
              <option value="La Liga">La Liga</option>
              <option value="Bundesliga">Bundesliga</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="brand"
              className="form-select"
              onChange={handleFilterChange}
            >
              <option value="">Select Brand</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Puma">Puma</option>
              <option value="New Balance">New Balance</option>
              <option value="Kappa">Kappa</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="season"
              className="form-select"
              onChange={handleFilterChange}
            >
              <option value="">Select Season</option>
              <option value="22-23">22-23</option>
              <option value="23-24">23-24</option>
              <option value="24-25">24-25</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="type"
              className="form-select"
              onChange={handleFilterChange}
            >
              <option value="">Select Type</option>
              <option value="Home">Home</option>
              <option value="Away">Away</option>
              <option value="Third">Third</option>
              <option value="GK Home">GK</option>
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="number"
              name="maxPrice"
              className="form-control"
              placeholder="Max Price"
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <button className="back-button mt-3" onClick={() => navigate(-1)}>
        Back
      </button>

      <div>
  <p>
    {selectedFilter && selectedFilter !== ""
      ? `Showing ${shownProducts} products filtered by: ${selectedFilter}`
      : `Showing ${shownProducts} products.`}
  </p>
</div>


      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleCardClick(product._id)}

            >
              <div className="product-img-wrapper">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="product-img"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="product-info">
                  <span className="product-info-icon">
                    <FaFutbol />{" "}
                  </span>
                  <span> {product.team}</span>
                </div>
                <div className="product-info">
                  <span className="product-info-icon">
                    <FaCalendarAlt />{" "}
                  </span>
                  <span> {product.Season}</span>
                </div>
                <div className="product-info">
                  <span className="product-info-icon">
                    <FaTshirt />{" "}
                  </span>
                  <span> {product.Type}</span>
                </div>
              </div>
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
