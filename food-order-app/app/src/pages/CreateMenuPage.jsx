import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let baseURL = "http://localhost:3001/api/menus";

export default function CreateMenuPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <h1>Create new Menu</h1>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          axios
            .post(baseURL, values)
            .then((response) => console.log(response.data));
          resetForm();
          setSubmitted(true);
        }}
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
      {submitted && <h6>New Menu successfuly created!</h6>}
    </>
  );
}
