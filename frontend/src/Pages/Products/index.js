import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    team: "",
    league: "",
    brand: "",
    season: "",
    type: "",
    maxPrice: "",
  });

  const { setShownProducts, selectedFilter, setIsLoading } =
    useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
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
            ? product.price <= parseFloat(filters.maxPrice)
            : true;

          const selectedFilterMatch = selectedFilter
            ? [
                product.team,
                product.League,
                product.Brand,
                product.Season,
                product.Type,
              ]
                .map((field) => field?.toLowerCase())
                .includes(selectedFilter.toLowerCase())
            : true;

          return (
            teamMatch &&
            leagueMatch &&
            brandMatch &&
            seasonMatch &&
            typeMatch &&
            priceMatch &&
            selectedFilterMatch
          );
        });

        setProducts(filteredProducts);
        setShownProducts(filteredProducts.length);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
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

      <div className="d-flex justify-content-center mb-4">
        <button
          className="categories-list__back-button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div>
    <div className="product-count">
        Showing{" "}
        <strong className="product-count__number">{products.length}</strong>{" "}
        products.
    </div>
    {selectedFilter && (
        <div className="filter-message">
            These products are filtered by:{" "}
            <strong className="filter-message__text">{selectedFilter}</strong>
        </div>
    )}
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
