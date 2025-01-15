import { useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./frame-component2.module.css";

const FrameComponent2 = ({ className = "" }) => {
  const onConnectWalletClick = useCallback(() => {
    // Please sync "Admin Dashboard - Wallet Pop-up" to the project
  }, []);

  return (
    <header className={[styles.frameParent, className].join(" ")}>
      <div className={styles.logoParent}>
        <Image
          className={styles.logoIcon}
          width={150}
          height={150}
          alt=""
          src="/logo1@2x.png"
        />
        <Image
          className={styles.logoIcon1}
          loading="lazy"
          width={150}
          height={150}
          alt=""
          src="/logo1@2x.png"
        />
      </div>
      <div className={styles.topBar}>
        <div className={styles.walletBar}>
          <div className={styles.walletButton}>
            <Button
              className={styles.connectWallet}
              disableElevation
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "12",
                background: "#0a3834",
                borderRadius: "34.5px",
                "&:hover": { background: "#0a3834" },
                width: 150,
              }}
              onClick={onConnectWalletClick}
            >
              Connect Wallet
            </Button>
            <TextField
              className={styles.searchBar}
              placeholder="Type here..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <img width="15px" height="15px" src="/icon-1.svg" alt="r" />
                ),
              }}
              sx={{
                "& fieldset": { borderColor: "#e2e8f0" },
                "& .MuiInputBase-root": {
                  height: "39.5px",
                  backgroundColor: "#fff",
                  paddingLeft: "11.3px",
                  borderRadius: "15px",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input": {
                  paddingLeft: "11.2px",
                  color: "#a0aec0",
                },
              }}
            />
          </div>
          <div className={styles.notificationBar}>
            <div className={styles.settingsNotification}>
              <div className={styles.settingsNotificationIcons}>
                <Image
                  className={styles.ioniconssettingssharp}
                  width={12}
                  height={12}
                  alt=""
                  src="/ioniconssettingssharp.svg"
                />
                <Image
                  className={styles.ioniconssettingssharp1}
                  loading="lazy"
                  width={12}
                  height={12}
                  alt=""
                  src="/ioniconssettingssharp.svg"
                />
              </div>
              <div className={styles.settingsNotificationIcons}>
                <Image
                  className={styles.ioniconssettingssharp}
                  width={12}
                  height={12}
                  alt=""
                  src="/ioniconnnotificationsdefault.svg"
                />
                <Image
                  className={styles.ioniconssettingssharp1}
                  loading="lazy"
                  width={12}
                  height={12}
                  alt=""
                  src="/ioniconnnotificationsdefault.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
