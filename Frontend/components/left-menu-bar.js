import { useCallback } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./left-menu-bar.module.css";

const LeftMenuBar = ({ className = "" }) => {
  const router = useRouter();

  const onLeftMenuClick = useCallback(() => {
    router.push("/admin-certificates-page");
  }, [router]);

  const onDashboardClickAdmin = useCallback(() => {
    router.push("/admin-dashboard");
  }, [router]);

  const onProjectPageAdmin = useCallback(() => {
    router.push("/admin-project-page");
  }, [router]);

  return (
    <div className={[styles.leftMenuBar, className].join(" ")}>
      <div
        className={styles.leftMenu3}
        role="button"
        onClick={onDashboardClickAdmin}
      >
        <div className={styles.dashboard}>
          <div className={styles.dashboardBackground} />
          <Image
            className={styles.dashboardChild}
            width={30}
            height={30}
            alt=""
            src="/rectangle-3.svg"
          />
          <div className={styles.dashboard1}>Dashboard</div>
        </div>
        <Image
          className={styles.homeIcon}
          loading="lazy"
          width={21}
          height={21}
          alt=""
          src="/home.svg"
        />
      </div>
      <div
        className={styles.leftMenu2}
        role="button"
        onClick={onProjectPageAdmin}
      >
        <div className={styles.dashboard}>
          <div className={styles.menuIconBackground} />
          <div className={styles.projects}>Projects</div>
        </div>
        <Image
          className={styles.leafIcon}
          loading="lazy"
          width={17}
          height={16}
          alt=""
          src="/leaf.svg"
        />
      </div>
      <div className={styles.leftMenu1} role="button" onClick={onLeftMenuClick}>
        <div className={styles.dashboard}>
          <div className={styles.menuIconBackground} />
          <div className={styles.projects}>Certificates</div>
        </div>
        <Image
          className={styles.newspaperIcon}
          width={20}
          height={20}
          alt=""
          src="/newspaper.svg"
        />
      </div>
    </div>
  );
};

LeftMenuBar.propTypes = {
  className: PropTypes.string,
};

export default LeftMenuBar;
