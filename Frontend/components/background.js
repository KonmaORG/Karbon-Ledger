import { useCallback } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import Image from "next/image";
import FrameComponent from "./frame-component";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./background.module.css";

const Background = ({ className = "" }) => {
  const router = useRouter();

  const onAlreadyHaveAnClick = useCallback(() => {
    router.push("/sign-in-screen-admin");
  }, [router]);

  return (
    <form className={[styles.background, className].join(" ")}>
      <div className={styles.backgroundChild} />
      <div className={styles.registerOptions}>
        <div className={styles.registerWith}>Register with</div>
      </div>
      <div className={styles.socialLogin}>
        <div className={styles.socialButtons}>
          <div className={styles.facebookLogin}>
            <div className={styles.facebookName}>
              <div className={styles.name}>Name</div>
              <Image
                className={styles.facebookIcon}
                loading="lazy"
                width={75}
                height={75}
                alt=""
                src="/facebook.svg"
              />
            </div>
            <div className={styles.appleGoogleLogin}>
              <div className={styles.appleLogin}>
                <Image
                  className={styles.appleIcon}
                  loading="lazy"
                  width={75}
                  height={75}
                  alt=""
                  src="/apple.svg"
                />
                <div className={styles.orLabel}>
                  <div className={styles.or}>or</div>
                </div>
              </div>
              <div className={styles.google}>
                <div className={styles.googleChild} />
                <Image
                  className={styles.ioniconllogogoogle}
                  loading="lazy"
                  width={24}
                  height={24}
                  alt=""
                  src="/ioniconllogogoogle.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <TextField
          className={styles.email}
          placeholder="XYZ"
          variant="outlined"
          sx={{
            "& fieldset": { borderColor: "#e2e8f0" },
            "& .MuiInputBase-root": {
              height: "50px",
              backgroundColor: "#fff",
              borderRadius: "15px",
              fontSize: "14px",
            },
            "& .MuiInputBase-input": { color: "#a0aec0" },
          }}
        />
      </div>
      <FrameComponent />
      <div className={styles.passwordInput}>
        <div className={styles.passwordLabel}>
          <div className={styles.password}>Password</div>
        </div>
        <div className={styles.passwordOptions}>
          <TextField
            className={styles.email}
            placeholder="********"
            variant="outlined"
            sx={{
              "& fieldset": { borderColor: "#e2e8f0" },
              "& .MuiInputBase-root": {
                height: "50px",
                backgroundColor: "#fff",
                borderRadius: "15px",
                fontSize: "14px",
              },
              "& .MuiInputBase-input": { color: "#a0aec0" },
            }}
          />
          <div className={styles.rememberMe}>
            <div className={styles.switchbase}>
              <div className={styles.toggleCircle} />
            </div>
            <div className={styles.password}>{`Remember me `}</div>
          </div>
        </div>
      </div>
      <Button
        className={styles.buttonbase}
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "14",
          background: "#0a3834",
          borderRadius: "12px",
          "&:hover": { background: "#0a3834" },
          height: 45,
        }}
      >
        SIGN UP
      </Button>
      <div className={styles.signinPrompt}>
        <div
          className={styles.alreadyHaveAn}
          onClick={onAlreadyHaveAnClick}
          role="button"
        >
          Already have an account? Sign in
        </div>
      </div>
    </form>
  );
};

Background.propTypes = {
  className: PropTypes.string,
};

export default Background;
