import React from "react";
import { useForm } from "react-hook-form";
import { sameAs } from "helpers/validators";

// eslint-disable-next-line
const EMAIL_PATTERN =
  // eslint-disable-next-line
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors, getValues } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          ref={register({ required: true })}
          name="username"
          type="text"
          className="form-control"
          id="username"
        />
        {errors.username && (
          <div className="alert alert-danger">
            {errors.username.type === "required" && (
              <span>Username is required</span>
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          ref={register({ required: true, pattern: EMAIL_PATTERN })}
          name="email"
          type="email"
          className="form-control"
          id="email"
        />
        {errors.email && (
          <div className="alert alert-danger">
            {errors.email.type === "required" && <span>Email is required</span>}
            {errors.email.type === "pattern" && (
              <span>Not a valid email format</span>
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          ref={register({ required: true, minLength: 8 })}
          name="password"
          type="password"
          className="form-control"
          id="password"
        />
        {errors.password && (
          <div className="alert alert-danger">
            {errors.password.type === "required" && (
              <span>Password is required</span>
            )}
            {errors.password.type === "minLength" && (
              <span>Minimum length of the password is 8 characters</span>
            )}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          ref={register({
            required: true,
            minLength: 8,
            validate: { sameAs: sameAs("password", getValues) },
          })}
          name="passwordConfirmation"
          type="password"
          className="form-control"
          id="passwordConfirmation"
        />
        {errors.passwordConfirmation && (
          <div className="alert alert-danger">
            {errors.passwordConfirmation.type === "required" && (
              <span>Password Confirmation is required</span>
            )}
            {errors.passwordConfirmation.type === "minLength" && (
              <span>
                Minimum length of the password confirmation is 8 characters
              </span>
            )}
            {errors.passwordConfirmation.type === "sameAs" && (
              <span>Passwords don't match</span>
            )}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-bwm-main">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
