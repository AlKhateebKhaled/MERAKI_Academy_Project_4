import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";

import ProductCard from "../../components/ProductCard";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const {
    selectedFilter,
    shownProducts,
    setShownProducts,
    filters,
    setFilters,
    setSearchTerm,
  } = useContext(AppContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTeam = queryParams.get("team") || "";
    setFilters((prevFilters) => ({
      ...prevFilters,
      team: searchTeam,
    }));
  }, [location.search]);

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
      team: e.target.value, // Filter by team name
    }));
  };

  return (
    <div className="container">
      <h2>Search Results</h2>

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

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>

      <div>
        <h6>Shown {shownProducts} products</h6>
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

export default Search;