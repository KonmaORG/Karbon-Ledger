import { useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./user1.module.css";

const User1 = ({ className = "" }) => {
  const router = useRouter();

  const onProfileContainerClick = useCallback(() => {
    router.push("/profile-page-admin");
  }, [router]);

  const onSignOutContainerClick = useCallback(() => {
    router.push("/sign-in-screen-admin");
  }, [router]);

  return (
    <nav className={[styles.user, className].join(" ")}>
      <div className={styles.accountTitle}>
        <div className={styles.accountPages}>ACCOUNT PAGES</div>
      </div>
      <div className={styles.userActions}>
        <div
          className={styles.profile}
          role="button"
          onClick={onProfileContainerClick}
        >
          <div className={styles.actionIcons}>
            <div className={styles.actionIconsChild} />
            <Image
              className={styles.ioniconppersondefault}
              loading="lazy"
              width={15}
              height={15}
              alt=""
              src="/ioniconppersondefault.svg"
            />
          </div>
          <div className={styles.actionLabels}>
            <div className={styles.profile1}>Profile</div>
          </div>
        </div>
      </div>
      <div className={styles.userActions1}>
        <div
          className={styles.signOut}
          role="button"
          onClick={onSignOutContainerClick}
        >
          <div className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <Image
              className={styles.logOutOutlineIcon}
              loading="lazy"
              width={19}
              height={20}
              alt=""
              src="/logoutoutline.svg"
            />
          </div>
          <div className={styles.signOutWrapper}>
            <div className={styles.signOut1}>Sign Out</div>
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.backgroundChild} />
        <div className={styles.helpIcon}>
          <div className={styles.icon}>
            <div className={styles.iconChild} />
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
        <div className={styles.helpTitleParent}>
          <div className={styles.helpTitle}>
            <h3 className={styles.needHelp}>Need help?</h3>
          </div>
          <div className={styles.pleaseCheckOur}>Please check our docs</div>
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
            height: 35,
          }}
        >
          DOCUMENTATION
        </Button>
      </div>
    </nav>
  );
};

User1.propTypes = {
  className: PropTypes.string,
};

export default User1;
