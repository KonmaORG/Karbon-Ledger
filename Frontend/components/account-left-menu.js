import { useCallback } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./account-left-menu.module.css";

const AccountLeftMenu = ({ className = "" }) => {
  const router = useRouter();

  const onProfileContainerClick = useCallback(() => {
    router.push("/profile-page-admin");
  }, [router]);

  const onSignOutContainerClick = useCallback(() => {
    router.push("/sign-up-screen-admin");
  }, [router]);

  return (
    <div className={[styles.accountLeftMenu, className].join(" ")}>
      <div
        className={styles.profile}
        onClick={onProfileContainerClick}
        role="button"
      >
        <div className={styles.profileBackground} />
        <Image
          className={styles.ioniconppersondefault}
          loading="lazy"
          width={15}
          height={15}
          alt=""
          src="/ioniconppersondefault.svg"
        />
        <div className={styles.profile1}>Profile</div>
      </div>
      <div
        className={styles.signOut}
        onClick={onSignOutContainerClick}
        role="button"
      >
        <div className={styles.profileBackground} />
        <div className={styles.signOut1}>Sign Out</div>
        <Image
          className={styles.logOutOutlineIcon}
          loading="lazy"
          width={19}
          height={20}
          alt=""
          src="/logoutoutline.svg"
        />
      </div>
      <div className={styles.accountPages}>ACCOUNT PAGES</div>
    </div>
  );
};

AccountLeftMenu.propTypes = {
  className: PropTypes.string,
};

export default AccountLeftMenu;
