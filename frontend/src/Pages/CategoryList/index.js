import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.css";

const CategoriesList = () => {
  const navigate = useNavigate();
  const { msg, setMsg, token, selectedFilter, setSelectedFilter } =
    useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [brandCategories, setBrandCategories] = useState([]);
  const [typeCategories, setTypeCategories] = useState([]);
  const [seasonCategories, setSeasonCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);

        const mainCategories = [
          "Premier League",
          "Serie A",
          "La Liga",
          "Bundesliga",
        ];
        const filteredCategories = res.data.category.filter((category) =>
          mainCategories.includes(category.name)
        );

        setCategories(filteredCategories);

        const brandCategoriesList = [
          "Nike",
          "Adidas",
          "Puma",
          "New Balance",
          "Kappa",
        ];
        const filteredBrands = res.data.category.filter((category) =>
          brandCategoriesList.includes(category.name)
        );

        setBrandCategories(filteredBrands);

        const typeCategoriesList = ["Home", "Away", "Third", "GK Home"];
        const filteredTypes = res.data.category.filter((category) =>
          typeCategoriesList.includes(category.name)
        );

        setTypeCategories(filteredTypes);

        const seasonCategoriesList = ["24-25", "23-24", "22-23"];
        const filteredSeasons = res.data.category.filter((category) =>
          seasonCategoriesList.includes(category.name)
        );

        setSeasonCategories(filteredSeasons);
      } catch (err) {
        setMsg(err.response?.data?.message || "Error fetching categories");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  const handleCardClick = (categoryName) => {
    setSelectedFilter(categoryName);
    navigate("/products");
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="container mt-4">
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>Leagues</h2>
      <div className="row">
        {categories.length > 0 ? (
          categories.map((mainCategory) => (
            <div key={mainCategory.id} className="col-md-6 mb-4">
              <Card
                className="category-card h-100 text-center"
                onClick={() => handleCardClick(mainCategory.name)}
              >
                <Card.Body>
                  <Card.Title>{mainCategory.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No league categories found</p>
        )}
      </div>

      <h2>Brands</h2>
      <div className="row">
        {brandCategories.length > 0 ? (
          brandCategories.map((brandCategory) => (
            <div key={brandCategory.id} className="col-md-6 mb-4">
              <Card
                className="category-card h-100 text-center"
                onClick={() => handleCardClick(brandCategory.name)}
              >
                <Card.Body>
                  <Card.Title>{brandCategory.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No brand categories found</p>
        )}
      </div>

      <h2>Types</h2>
      <div className="row">
        {typeCategories.length > 0 ? (
          typeCategories.map((typeCategory) => (
            <div key={typeCategory.id} className="col-md-6 mb-4">
              <Card
                className="category-card h-100 text-center"
                onClick={() => handleCardClick(typeCategory.name)}
              >
                <Card.Body>
                  <Card.Title>{typeCategory.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No type categories found</p>
        )}
      </div>

      <h2>Seasons</h2>
      <div className="row">
        {seasonCategories.length > 0 ? (
          seasonCategories.map((seasonCategory) => (
            <div key={seasonCategory.id} className="col-md-6 mb-4">
              <Card
                className="category-card h-100 text-center"
                onClick={() => handleCardClick(seasonCategory.name)}
              >
                <Card.Body>
                  <Card.Title>{seasonCategory.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No season categories found</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
