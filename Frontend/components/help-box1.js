import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./help-box1.module.css";

const HelpBox1 = ({ className = "" }) => {
  return (
    <div className={[styles.helpBox, className].join(" ")}>
      <div className={styles.background}>
        <div className={styles.helpBackgroundItems} />
      </div>
      <Button
        className={styles.buttonbase}
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#2d3748",
          fontSize: "12",
          background: "#fff",
          borderRadius: "12px",
          "&:hover": { background: "#fff" },
          width: 195.4,
          height: 35,
        }}
      >
        DOCUMENTATION
      </Button>
      <div className={styles.text}>
        <div className={styles.pleaseCheckOur}>Please check our docs</div>
        <h3 className={styles.needHelp}>Need help?</h3>
      </div>
      <div className={styles.icon}>
        <div className={styles.helpIconBg} />
        <Image
          className={styles.ioniconhhelpcircle}
          loading="lazy"
          width={25}
          height={24}
          alt=""
          src="/ioniconhhelpcircle.svg"
        />
      </div>
    </div>
  );
};

HelpBox1.propTypes = {
  className: PropTypes.string,
};

export default HelpBox1;
