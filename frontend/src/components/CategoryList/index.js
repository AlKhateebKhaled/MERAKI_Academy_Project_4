import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const CategoriesList = () => {
  const navigate = useNavigate();
  const { msg, setMsg, token } = useContext(AppContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) {
          setCategories(res.data);
        }
      } catch (err) {
        setMsg(err.response?.data?.message || "Error fetching categories");
      }
    };

    fetchCategories();
  }, [token]);

  return (
    <div>
      {msg && <p style={{ color: "red" }}>{msg}</p>}

      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category._id}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
};

export default CategoriesList;
