import React from "react";
import "./MenuAdministrationPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Meal from "../components/meal/MealAdmin";
import Menu from "../components/menu/MenuAdmin";
import { Table } from "react-bootstrap";

const baseMealURL = "http://localhost:3001/api/meals";
const baseMenuURL = "http://localhost:3001/api/menus";

export default function MenuAdministrationPage() {
  const [meals, setMeals] = useState([]);
  const [deletedMeal, setDeletedMeal] = useState({});

  const [menus, setMenus] = useState([]);
  const [deletedMenu, setDeletedMenu] = useState({});

  useEffect(() => {
    axios
    .get(baseMealURL)
    .then((response) => setMeals(response.data))
    .catch((err) => console.log(err));

  axios
    .get(baseMenuURL)
    .then((response) => setMenus(response.data))
    .catch((err) => console.log(err));
}, [deletedMeal, deletedMenu]);

  let mealsjsx = meals.map((meal, index) => (
    <Meal
      meal={meal}
      setDeletedMeal={setDeletedMeal}
      key={index}
    />
  ));

  let menusjsx = menus.map((menu, index) => (
    <Menu
      menu={menu}
      setDeletedMenu={setDeletedMenu}
      key={index}
    />
  ));

  return (
    <div>
      <div className="linkDiv">
        <Link to="/CreateMenuPage" className="linkBtn">
          Create Menu
        </Link>
        <Link to="/CreateMealPage" className="linkBtn">
          Create Meal
        </Link>
      </div>
      <>
        <h1>Menu list</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{menusjsx}</tbody>
        </Table>
      </>
      <>
        <h1>Meal list</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{mealsjsx}</tbody>
        </Table>
      </>
    </div>
  );
}
