import React from "react";
import pageNotFound from "../../images/404.svg";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css"


function PageNotFound() {
  return (
    <>

      <div className={styles.not__found}>
        <img
          className={styles.img__notFound}
          src={pageNotFound}
          alt="Page not found"
        />
        <h2 className={styles.pageNotFound}>Page Not Found</h2>

        <p className={styles.txt__notFound}>
          We're sorry, the page you requested could not be found.
        </p>
        <p className={styles.txt__notFound}>Please go back to the homepage.</p>

        <Link to="/">
          <button className={styles.btn__GoHome}>Go Home</button>
        </Link>
      </div>

    </>
  );
}

export default PageNotFound;
