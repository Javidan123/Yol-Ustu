import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";
import "./style.scss";
import Footer from "../../components/Footer";

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    shouldFocusError: true,
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="register">
      <Nav />
      <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>

        <div className="input-group">
          <div className="input-box">
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && <p className="err">{errors.email.message}</p>}
          </div>

          <div className="input-box">
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="text"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="err">{errors.password.message}</p>
            )}
          </div>

          <p className="sign-in">
            Already have an account? <Link to={"/login"}>Sign in!</Link>
          </p>
        </div>

        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
