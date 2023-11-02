import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <p style={styles.errorText}>404 ERROR</p>
      <p style={styles.message}>Page not found</p>
      <p style={styles.navigation}>
        Go back to <Link to="/">WebSite</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "50px",
  },
  errorText: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  message: {
    fontSize: "20px",
  },
  navigation: {
    fontSize: "18px",
    marginTop: "20px",
  },
};
