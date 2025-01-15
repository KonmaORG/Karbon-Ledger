import { Box } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./help-box.module.css";

const HelpBox = ({ className = "" }) => {
  return (
    <div className={[styles.helpBox, className].join(" ")}>
      <div className={styles.background}>
        <div className={styles.backgroundChild} />
      </div>
      <div className={styles.buttonbase}>
        <div className={styles.widthStructure}>
          <div className={styles.heightStructure}>
            <div className={styles.buttonBody}>
              <div className={styles.icon}>
                <div className={styles.div}></div>
              </div>
              <div className={styles.text}>DOCUMENTATION</div>
              <div className={styles.icon}>
                <div className={styles.div}></div>
              </div>
            </div>
          </div>
          <div className={styles.minwidth}>
            <div className={styles.content} />
          </div>
        </div>
      </div>
      <div className={styles.text1}>
        <div className={styles.pleaseCheckOur}>Please check our docs</div>
        <div className={styles.needHelp}>Need help?</div>
      </div>
      <div className={styles.icon2}>
        <div className={styles.helpIconBackground} />
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

HelpBox.propTypes = {
  className: PropTypes.string,
};

export default HelpBox;
