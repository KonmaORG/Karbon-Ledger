import { Box } from "@mui/material";
import Image from "next/image";
import Background from "../components/background";
import styles from "./sign-up-screen-admin.module.css";

const SignUpScreenAdmin = () => {
  return (
    <div className={styles.signUpScreenAdmin}>
      <Image
        className={styles.logoIcon}
        loading="lazy"
        width={200}
        height={200}
        alt=""
        src="/logo@2x.png"
      />
      <div className={styles.authOptions}>
        <Background />
      </div>
    </div>
  );
};

export default SignUpScreenAdmin;
