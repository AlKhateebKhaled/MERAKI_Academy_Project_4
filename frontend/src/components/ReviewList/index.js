import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";

import "./style.css";

const ReviewList = ({ reviews }) => {
  return (
    <Card className="mt-5 shadow-sm review-list-card">
      <Card.Header className="text-center">
        <h4 className="mb-0">Customer Reviews</h4>
      </Card.Header>
      <ListGroup variant="flush">
        {reviews.length === 0 ? (
          <ListGroup.Item className="text-center text-muted py-4">
            No reviews yet.
          </ListGroup.Item>
        ) : (
          reviews.map((review) => (
            <ListGroup.Item
              key={review._id}
              className="d-flex justify-content-between align-items-start"
            >
              <div>
                <strong className="text-secondary">Rating:</strong>
                <Badge bg="warning" className="ms-2">
                  {review.rating} / 5
                </Badge>
                <p className="mt-2">{review.comment}</p>
              </div>
              <div className="review-avatar ms-3">
                <FaUserAlt
                  size={50}
                  className="rounded-circle"
                  style={{ color: "#f9a825" }}
                />
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default ReviewList;
