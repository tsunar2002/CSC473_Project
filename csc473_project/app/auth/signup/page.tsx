import styles from "./signup.module.css";
import leavesImage from "../../../public/assets/leaves.jpg";
import Image from "next/image";
import Link from "next/link";

function SignUpPage() {
  return (
    <div className={styles.container}>
      {/* Left Image Side */}
      <div className={styles.imageContainer}>
        <Image src={leavesImage} alt="Shopping bag" className={styles.image} />
      </div>

      {/* Right Form Side */}
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Get Started Now</h2>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className={styles.input}
            />
          </div>

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

          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="terms" className={styles.checkbox} />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I agree to the{" "}
              <Link href="#" className={styles.link}>
                terms & policy
              </Link>
            </label>
          </div>

          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </form>

        <p className={styles.logInText}>
          Have an account?{" "}
          <Link href="/auth/login" className={styles.logInLink}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
