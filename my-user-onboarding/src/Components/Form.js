import React, {useState, useEffect} from 'react';
import {Form, Field, withFormik} from 'formik';
import * as Yup from "yup";
import axios from "axios";

const SignForm = ({errors, touched, values, status}) => {
    const [user, setUser] = useState([]);


    useEffect(() => {
        status && setUser(users => [...users, status]);
    }, [status]);

        return (
            <div>
                <h1>Form Title</h1>
                <Form>
                    <Field
                        type="text"
                        name="name"
                        placeholder="placeholder"
                        value={values.name}
                    />
                    {touched.size && errors.name && <p>{errors.size}</p>}
                </Form>   
            </div>
     )
}

const FormikForm = withFormik({
    mapPropsToValues({ name }) {
        return {
            name: name || "",
            email: "",
            password: "",
            terms: false,
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please fill this in."),
        email: Yup.string().required("Please fill this in."),
        password: Yup.string().required("Please fill this in."),
        terms: Yup.bool()
    }),

    handleSubmit(values, {setStatus, resetForm}) {
        console.log("Submitting form:", values);

        axios
            .post("https://reqres.in/api/users/",values)
            .then(res => {
                console.log(res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => {
                console.log("Error", err.response);
            })
    }
})(SignForm);
export default FormikForm;