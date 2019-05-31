import React from 'react';

const Form = (props) => {
    return (
        <form className="controls-form mt-4 pt-2 row">
            <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                defaultValue={props.firstName}
                className="form-control mt-3" />
            <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                defaultValue={props.lastName}
                className="form-control mt-3" />
            <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={props.email}
                className="form-control mt-3" />
            <input
                type="number"
                name="mobile"
                placeholder="Contact"
                defaultValue={props.contact}
                className="form-control mt-3" />
            <div className="controls mt-4">
                <p className="text-left">Submit your form by saying <b>'Submit'</b></p>
                <p className="text-left">Reset your form by saying <b>'Reset'</b></p>
                <p>You can stop recording by saying <b>'Stop or Pause'</b></p>
            </div>
            {props.isSubmit && <div className="alert alert-success w-100 mt-4">Thanks for submitting details !</div>}
        </form>
    );
};

export default Form;