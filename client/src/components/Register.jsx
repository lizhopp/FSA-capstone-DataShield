import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate()

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const firstname = formData.get('first-name')
    const lastname = formData.get('last-name')
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ firstname, lastname, email, password });
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <main className="page auth-page">
      <h1 className="page-title">Register for an account</h1>
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          tryRegister(new FormData(e.target));
        }}
      >
        <label className="form-group">
          First Name
          <input type="text" name="first-name" required />
        </label>
        <label className="form-group">
          Last Name
          <input type="text" name="last-name" required />
        </label>
        <label className="form-group">
          Email
          <input type="email" name="email" required />
        </label>
        <label className="form-group">
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit" className="btn btn-primary">Register</button>
        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
      <p className="auth-footer"><Link to="/login">Already have an account? Log in here.</Link></p>
    </main>
  );
}
