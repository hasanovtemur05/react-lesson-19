import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Field, Form , ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./../../utils/notification";
import { ToastContainer } from "react-toastify";
import { auth } from "@service";
import { signInvAalidationSchema } from "../../utils/validation";


const Index = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();



  const initialValues = {
    phone_number: "",
    password: "",
  };


  const handleSubmit = async (values) => {
    try {
      const response = await auth.sign_in(values)
      let access_token = response?.data?.data?.tokens?.access_token
      localStorage.setItem("access_token", access_token)
      navigate("./admin-layout")
      
    } catch (error) {
      console.log(error);
    }
  
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row mt-5">
        <div className="col-md-6 offset-3">
          <div className="card">
            <div className="card-header">
              <h1 className="text-center">Sign-In</h1>
            </div>
            <div className="card-body">
             

              <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={signInvAalidationSchema}>
                <Form id="form">
                  <Field
                    name="phone_number"
                    as={TextField}
                    fullWidth
                    label="phone number"
                    type="text"
                    helperText={
                      <ErrorMessage
                        name="phone_number"
                        component='p'
                        className="text-red-600 text-[15px]"
                      />
                    }
                  />
                   <Field
                    name="password"
                    as={TextField}
                    fullWidth
                    label="password"
                    type="password"
                    helperText={
                      <ErrorMessage
                        name="password"
                        component='p'
                        className="text-red-600 text-[15px]"
                      />
                    }
                  />
                  
                </Form>
              </Formik>
            </div>
            <div className="card-footer">
              <Button form="form" type="submit" variant="contained">
                save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
