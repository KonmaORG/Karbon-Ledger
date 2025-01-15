import { useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NavigationMenu from "../components/navigation-menu";
import UserActions from "../components/user-actions";
import FrameComponent from "../components/frame-component";
import styles from "./profile-page-user.module.css";
import TopMenuBar1 from "../components/top-menu-bar1";
import ProjectsCluster from "../components/projects-cluster";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox1 from "../components/help-box1";
import TopMenuBar from "../components/top-menu-bar";

const ProfilePageUser = () => {
  const onConnectWalletClick = useCallback(() => {
    // Please sync "Admin Dashboard - Wallet Pop-up" to the project
  }, []);

  return (
    <div className={styles.projectsPageUser}>
      {/* <div className={styles.profileHeaderWrapper}> */}
      <div className={styles.profileHeader}>
        <div className={styles.profileTitleContainer}>
          <h2 className={styles.myProfile}>My Profile</h2>
        </div>
        <div className={styles.profileImageContainer}>
          <Image
            className={styles.profileImageIcon}
            loading="lazy"
            width={146}
            height={146}
            alt=""
            src="/ellipse-10@2x.png"
          />
          <div className={styles.profileDetails}>
            <div className={styles.profileDetailsChild} />
            <div className={styles.profileInformation}>
              <div className={styles.profileAttributes}>
                <div className={styles.profileData}>
                  <FrameComponent />
                  <FrameComponent />
                  <FrameComponent />
                </div>
              </div>
              <div className={styles.editProfile}>
                <div className={styles.editButtonContainer}>
                  <div className={styles.editButtonWrapper}>
                    <div className={styles.editButtonAction}>
                      <div className={styles.minwidthParent}>
                        <div className={styles.minwidth}>
                          <div className={styles.content} />
                        </div>
                        <div className={styles.edit}>Edit</div>
                      </div>
                    </div>
                    <FrameComponent />
                    <div className={styles.passwordContainerWrapper}>
                      <FrameComponent />
                    </div>
                  </div>
                </div>
                <Image
                  className={styles.editIcon}
                  loading="lazy"
                  width={26}
                  height={25}
                  alt=""
                  src="/edit-icon.svg"
                />
              </div>
            </div>
            <Button
              className={styles.profileDetailsItem}
              disableElevation
              variant="text"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "12",
                borderRadius: "0px 0px 0px 0px",
                width: 176,
                height: 35,
              }}
            >
              Save
            </Button>
          </div>
          {/* </div> */}
        </div>
      </div>
      <TopMenuBar />
      <LeftMenuBar />
      <AccountLeftMenu />
      <HelpBox1 />
    </div>
  );
};

export default ProfilePageUser;
