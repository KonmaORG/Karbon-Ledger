import { useCallback } from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import FrameComponent from "./frame-component";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./standards.module.css";

const Standards = ({ className = "" }) => {
  const router = useRouter();

  const onCloseCircleIconClick = useCallback(() => {
    router.push("/admin-project-page");
  }, [router]);

  return (
    <div className={[styles.standards, className].join(" ")}>
      <div className={styles.standardsChild} />
      <div className={styles.standardsContent}>
        <div className={styles.standardDetails}>
          <div className={styles.standardFields}>
            <FrameComponent />
            <div className={styles.registry}>
              <FrameComponent />
            </div>
            <div className={styles.standardLabels}>
              <FrameComponent />
            </div>
            <div className={styles.standardLabels1}>
              <FrameComponent />
            </div>
            <div className={styles.price}>
              <FrameComponent />
            </div>
            <div className={styles.location}>
              <div className={styles.locationData}>Location Data</div>
            </div>
          </div>
        </div>
        <Image
          className={styles.closeCircleIcon}
          loading="lazy"
          width={33}
          height={33}
          alt=""
          src="/closecircle.svg"
          onClick={onCloseCircleIconClick}
        />
      </div>
      <div className={styles.plots}>
        <div className={styles.plotList}>
          <Button
            className={styles.plotListChild}
            disableElevation
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#d9d9d9",
              borderRadius: "12px",
              "&:hover": { background: "#d9d9d9" },
              height: 45,
            }}
          >{`Plot 1
100 sq ft`}</Button>
          <Button
            className={styles.plotListChild}
            disableElevation
            variant="contained"
            sx={{
              textTransform: "none",
              background: "#d9d9d9",
              borderRadius: "12px",
              "&:hover": { background: "#d9d9d9" },
              height: 45,
            }}
          >{`Plot 2
450 sq ft`}</Button>
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <div className={styles.plot3150Container}>
              <p className={styles.plot3}>Plot 3</p>
              <p className={styles.sqFt}>150 sq ft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Standards.propTypes = {
  className: PropTypes.string,
};

export default Standards;
