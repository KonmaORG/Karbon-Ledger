import { useCallback } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./top-menu-bar.module.css";
import { useRouter } from "next/router";

const TopMenuBar = ({ className = "" }) => {
  const router = useRouter();
  const onConnectWalletContainerClick = useCallback(() => {
    // Please sync "Admin Dashboard - Wallet Pop-up" to the project
  }, []);
  const onLogoClick = useCallback(() => {
    // Please sync "Admin Dashboard - Wallet Pop-up" to the project
    router.push("/");
  }, [router]);

  return (
    <header className={[styles.topMenuBar, className].join(" ")}>
      <Image
        className={styles.logoIcon}
        loading="lazy"
        width={150}
        height={150}
        alt=""
        src="/logo1@2x.png"
        onClick={onLogoClick}
      />
      <div
        className={styles.connectWallet}
        role="button"
        onClick={onConnectWalletContainerClick}
      >
        <div className={styles.widthStructure}>
          <div className={styles.heightStructure}>
            <div className={styles.buttonBody}>
              <div className={styles.icon}>
                <div className={styles.div}></div>
              </div>
              <div className={styles.text}>Connect Wallet</div>
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
      <div className={styles.topRightMenuBar}>
        <div className={styles.searchBar}>
          <div className={styles.autoAddedFrame}>
            <div className={styles.addon}>
              <Image
                className={styles.icon2}
                loading="lazy"
                width={15}
                height={15}
                alt=""
                src="/icon.svg"
              />
              <div className={styles.addons}>Addons</div>
            </div>
          </div>
          <div className={styles.inputfieldtext}>
            <div className={styles.typeHere}>Type here...</div>
            <Image
              className={styles.passwordTextIcon}
              width={35}
              height={4}
              alt=""
              src="/password-text.svg"
            />
            <div className={styles.minwidth1}>
              <div className={styles.content1} />
            </div>
          </div>
        </div>
        <Image
          className={styles.ioniconssettingssharp}
          loading="lazy"
          width={12}
          height={12}
          alt=""
          src="/ioniconssettingssharp.svg"
        />
        <Image
          className={styles.ioniconnnotificationsdefaul}
          loading="lazy"
          width={12}
          height={12}
          alt=""
          src="/ioniconnnotificationsdefault.svg"
        />
      </div>
    </header>
  );
};

TopMenuBar.propTypes = {
  className: PropTypes.string,
};

export default TopMenuBar;
