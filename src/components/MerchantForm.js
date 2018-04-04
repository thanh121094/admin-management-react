import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {NavLink} from 'react-router-dom';

// Merchant form
let MerchantForm = ({onSubmit, submitting, formStatus}) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-lg-4 col-sm-push-3 col-lg-push-4">
                <form onSubmit={ onSubmit } noValidate>
                    <Field name="firstname" component={renderField} type="text"
                           id="first-name" label="First Name"/>
                    <Field name="lastname" component={renderField} type="text"
                           id="last-name" label="Last Name"/>
                    <Field name="avatarUrl" component={renderField} type="url"
                           id="avatar-url" label="Avatar Url"/>
                    <Field name="email" component={renderField} type="email"
                           id="email-address" label="Email Address"/>
                    <Field name="phone" component={renderField} type="tel"
                           id="phone-number" label="Phone Number"/>
                    <Field name="has-premium" component={renderField} type="checkbox"
                        label="Has Premium"
                    />
                    <button type="submit" className="btn btn-primary merchant-submit" disabled={submitting}>Submit</button>
                </form>
                {formStatus === 'success' &&
                <p className="alert alert-success">
                    Merchant successfully saved.
                    <NavLink to="/merchants/1"> Return to merchant list</NavLink>
                </p>}
                {formStatus === 'error' &&
                <p className="alert alert-danger">Saving merchant failed. Please fill in all the fields.</p>}
            </div>
        </div>
    )
};

// Render schema for each field
const renderField = ({
    input,
    label,
    type,
    id,
    meta: {touched, error}
}) => (
    // Render schema for checkbox
    (type === 'checkbox')
        ?
        <div className="checkbox">
            <label>
                <input {...input} type={type}/>
                {label}
            </label>
            {touched &&
            (error &&
            <span className="error-text">
            {error}
          </span>)}
        </div>
        :
        // Render schema for inputs
        <div className="form-group">
            <label htmlFor={id}>
                {label}
            </label>
            <input {...input} id={id} type={type} className="form-control"/>
            {touched &&
            (error &&
            <span className="error-text">
            {error}
          </span>)}
        </div>
);

// Form validation
function validate(formProps) {
    const errors = {};

    if (!formProps.firstname) {
        errors.firstname = 'Please enter a first name';
    }

    if (!formProps.lastname) {
        errors.lastname = 'Please enter a last name';
    }

    if (!formProps.avatarUrl) {
        errors.avatarUrl = 'Please enter an avatar url';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Invalid email address';
    }

    if (!formProps.phone) {
        errors.phone = 'Please enter a phone number';
    } // A more specific phone number validation can be added here

    return errors;
}

MerchantForm = reduxForm({
    form: 'merchant',
    validate,
    enableReinitialize: true
})(MerchantForm);

export default MerchantForm;