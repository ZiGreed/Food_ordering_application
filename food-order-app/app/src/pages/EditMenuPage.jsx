import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

let baseURL = "http://localhost:3001/api/menus/";

function EditMenu() {
  let { id } = useParams();

  const [activeMenu, setActiveMenu] = useState({
    title: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => setActiveMenu(response.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  return (
    <>
      <h1>Edit Menu</h1>
      <Formik
        initialValues={activeMenu}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          axios
            .patch(baseURL + id, values)
            .then((response) => console.log(response.data));
          navigate("/MenuAdministrationPage");
        }}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
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
            <Button variant="secondary" type="submit" disabled={!dirty}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditMenu;
