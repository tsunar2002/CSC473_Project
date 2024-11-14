import styles from "./login.module.css";
import leavesImage from "../../../public/assets/leaves.jpg";
import Image from "next/image";
import Link from "next/link";

function LogInPage() {
  return (
    <div className={styles.container}>
      {/* Left Image Side */}
      <div className={styles.imageContainer}>
        <Image src={leavesImage} alt="Shopping bag" className={styles.image} />
      </div>

      {/* Right Form Side */}
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Welcome back!</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>

        <p className={styles.signUpText}>
          Don't have an account?{" "}
          <Link href="/auth/signup" className={styles.signUpLink}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogInPage;
