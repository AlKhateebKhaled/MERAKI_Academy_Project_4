import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./style.css";

const CategoryCard = ({ category }) => {
  const defaultImage = "path/to/default/image.jpg"; 
  const imageUrl = category.imageUrl || defaultImage;

  return (
    <Card className="category-card h-100 text-center">
      <Card.Img variant="top" src={imageUrl} alt={category.name} />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        {category.subCategories && category.subCategories.length > 0 ? (
          <Card.Text>
            <strong>{category.subCategories.length}</strong> Subcategories
          </Card.Text>
        ) : (
          <Card.Text>No subcategories</Card.Text>
        )}
        <Button variant="primary" className="mt-3">
          View More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
