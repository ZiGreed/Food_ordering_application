import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

let baseURL = "http://localhost:3001/api/meals/";
const menusURL = "http://localhost:3001/api/menus";

function EditMeal() {
  let { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [activeMeal, setActiveMeal] = useState({
    title: "",
    description: "",
    price: 0.00,
    category: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => setActiveMeal(response.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  useEffect(() => {
    axios
      .get(menusURL)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Edit Meal</h1>
      <Formik
        initialValues={activeMeal}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          console.log(values);
          axios
            .patch(baseURL + id, values)
            .then((response) => console.log(response.data));
          navigate("/MenuAdministrationPage");
        }}
        enableReinitialize
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          dirty,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*,.png,.jpg,.gif,.web"
                onChange={(event) => {
                  handleChange(event);
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => navigate("/MenuAdministrationPage/")}
            >
              Cancel
            </Button>

            <Button variant="secondary" type="submit" disabled={!dirty}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditMeal;
