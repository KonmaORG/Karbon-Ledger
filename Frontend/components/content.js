import { useCallback } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./content.module.css";

const Content = ({ className = "" }) => {
  const router = useRouter();

  const onLeftMenuClick = useCallback(() => {
    router.push("/admin-certificates-page");
  }, [router]);

  return (
    <div className={[styles.content, className].join(" ")}>
      <div className={styles.header}>
        <div className={styles.branding}>
          <Image
            className={styles.logoIcon}
            loading="lazy"
            width={150}
            height={150}
            alt=""
            src="/logo1@2x.png"
          />
        </div>
        <div className={styles.dashboard}>
          <div className={styles.dashboardChild} />
          <div className={styles.homeLink}>
            <Image
              className={styles.homeLinkChild}
              width={30}
              height={30}
              alt=""
              src="/rectangle-3.svg"
            />
            <Image
              className={styles.homeIcon}
              loading="lazy"
              width={21}
              height={21}
              alt=""
              src="/home.svg"
            />
          </div>
          <div className={styles.pageHeader}>
            <div className={styles.dashboard1}>Dashboard</div>
          </div>
        </div>
      </div>
      <div className={styles.projectsLink}>
        <div className={styles.projectNavigation}>
          <div className={styles.projectsIcon}>
            <div className={styles.projectsIconChild} />
            <Image
              className={styles.leafIcon}
              loading="lazy"
              width={17}
              height={16}
              alt=""
              src="/leaf.svg"
            />
          </div>
          <div className={styles.projectHeader}>
            <div className={styles.projects}>Projects</div>
          </div>
        </div>
      </div>
      <div className={styles.leftMenu}>
        <div
          className={styles.leftMenu1}
          onClick={onLeftMenuClick}
          role="button"
        >
          <div className={styles.projectsIcon}>
            <div className={styles.projectsIconChild} />
            <Image
              className={styles.newspaperIcon}
              loading="lazy"
              width={20}
              height={20}
              alt=""
              src="/newspaper.svg"
            />
          </div>
          <div className={styles.projectHeader}>
            <div className={styles.projects}>Certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
