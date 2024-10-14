import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AppContext } from "../../App";

const SubcategoryPage = () => {
  const { msg, setMsg, token, selectedFilter, setSelectedFilter } =
    useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const predefinedSubcategories = {
    "Premier League": [
      "Arsenal",
      "Liverpool",
      "Manchester United",
      "Manchester City",
      "Chelsea",
    ],
    "Serie A": [
      "Inter Milan",
      "AC Milan",
      "Juventus",
      "AS Roma",
      "Lazio",
      "Napoli",
    ],
    "La Liga": ["Real Madrid", "Atletico Madrid", "Barcelona"],
    Bundesliga: ["Bayern Munich", "Dortmund"],
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/categories/${id}`);
        const fetchedCategoryName = res.data.category.name;

       
        if (predefinedSubcategories[fetchedCategoryName]) {
          setSubcategories(
            predefinedSubcategories[fetchedCategoryName].map((name, index) => ({
              id: index,
              name,
            }))
          );
        } else {
          setSubcategories(res.data.category.subCategories);
        }

        setCategoryName(fetchedCategoryName);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubcategories();
  }, [id]);

  const handleSubcategoryClick = (subcategoryName) => {
    setSelectedFilter(subcategoryName);
    navigate(`/products`);
  };

  if (isLoading) {
    return <p>Loading subcategories...</p>;
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>{categoryName}</h2>
      <div className="row">
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div key={subcategory.id} className="col-md-6 mb-4">
              <Card
                className="category-card h-100 text-center"
                onClick={() => handleSubcategoryClick(subcategory.name)}
              >
                <Card.Body>
                  <Card.Title>{subcategory.name}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No subcategories found</p>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage;
