import { useCallback } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./frame-component1.module.css";

const FrameComponent1 = ({ className = "" }) => {
  const onConnectWalletClick = useCallback(() => {
    // Please sync "Admin Dashboard - Wallet Pop-up" to the project
  }, []);

  return (
    <div className={[styles.projectDetailPageAdminInner, className].join(" ")}>
      <div className={styles.frameParent}>
        <div className={styles.logoParent}>
          <Image
            className={styles.logoIcon}
            loading="lazy"
            width={150}
            height={150}
            alt=""
            src="/logo1@2x.png"
          />
          <div className={styles.projectTitleWrapper}>
            <h1 className={styles.projectTitle}>Project Title</h1>
          </div>
        </div>
        <div className={styles.connectWalletParentWrapper}>
          <div className={styles.connectWalletParent}>
            <div className={styles.connectWalletGrandparent}>
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
                    <img width="15px" height="15px" src="/icon.svg" alt="" />
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
            <div className={styles.settingsNotificationsWrapper}>
              <div className={styles.settingsNotifications}>
                <Image
                  className={styles.ioniconssettingssharp}
                  loading="lazy"
                  width={12}
                  height={12}
                  alt=""
                  src="/ioniconssettingssharp.svg"
                />
                <Image
                  className={styles.ioniconssettingssharp}
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
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
