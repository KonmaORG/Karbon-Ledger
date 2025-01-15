import { useCallback } from "react";
import {
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Box,
} from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./top-menu-bar1.module.css";
import WalletConnector from "./WalletConnector/client";

const TopMenuBar1 = ({ className = "" }) => {
  const onConnectWalletClick = useCallback(() => {
    // Please sync "User Dashboard - Wallet Pop-up" to the project
  }, []);

  return (
    <header className={[styles.topMenuBar, className].join(" ")}>
      <Image
        className={styles.logoIcon}
        loading="lazy"
        width={150}
        height={150}
        alt=""
        src="/logo1@2x.png"
      />
      <div className="absolute top-[34%] right-[27.31%] bottom-[42.67%] left-[61.76%] connectWallet">
        <WalletConnector />
      </div>
      <div className={styles.topRightMenuBar}>
        <TextField
          className={styles.searchBar}
          placeholder="Type here..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <img width="15px" height="15px" src="/icon.svg" alt="r" />
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
            width: "199px",
          }}
        />
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

TopMenuBar1.propTypes = {
  className: PropTypes.string,
};

export default TopMenuBar1;
