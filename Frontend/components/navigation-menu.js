import { useCallback } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./navigation-menu.module.css";

const NavigationMenu = ({ className = "" }) => {
  const router = useRouter();

  const onLeftMenuClick = useCallback(() => {
    router.push("/admin-project-page");
  }, [router]);

  const onLeftMenuClick1 = useCallback(() => {
    router.push("/admin-certificates-page");
  }, [router]);

  return (
    <div className={[styles.navigationMenu, className].join(" ")}>
      <div className={styles.pageHeader}>
        <Image
          className={styles.logoIcon}
          loading="lazy"
          width={150}
          height={150}
          alt=""
          src="/logo1@2x.png"
        />
        <div className={styles.headerRight}>
          <div className={styles.navigationLinks}>
            <div className={styles.homeLinkContainer}>
              <Image
                className={styles.homeLinkContainerChild}
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
            <div className={styles.dashboardLinkContainer}>
              <div className={styles.dashboard}>Dashboard</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.menuOptions}>
        <div
          className={styles.leftMenu2}
          role="button"
          onClick={onLeftMenuClick}
        >
          <div className={styles.homeLinkContainer}>
            <div className={styles.nestedMenuItemChild} />
            <Image
              className={styles.leafIcon}
              loading="lazy"
              width={17}
              height={16}
              alt=""
              src="/leaf.svg"
            />
          </div>
          <div className={styles.certificatesWrapper}>
            <div className={styles.projects}>Projects</div>
          </div>
        </div>
      </div>
      <div className={styles.menuOptions1}>
        <div
          className={styles.leftMenu2}
          role="button"
          onClick={onLeftMenuClick1}
        >
          <div className={styles.homeLinkContainer}>
            <div className={styles.nestedMenuItemChild} />
            <Image
              className={styles.newspaperIcon}
              loading="lazy"
              width={20}
              height={20}
              alt=""
              src="/newspaper.svg"
            />
          </div>
          <div className={styles.certificatesWrapper}>
            <div className={styles.projects}>Certificates</div>
          </div>
        </div>
      </div>
    </div>
  );
};

NavigationMenu.propTypes = {
  className: PropTypes.string,
};

export default NavigationMenu;
