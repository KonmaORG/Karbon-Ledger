import { useCallback } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import FrameComponent1 from "../components/frame-component1";
import { useRouter } from "next/router";
import UserActions from "../components/user-actions";
import FrameComponent from "../components/frame-component";
import Standards from "../components/standards";
import styles from "./project-detail-page-admin.module.css";
import TopMenuBar from "../components/top-menu-bar";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox from "../components/help-box";

const ProjectDetailPageAdmin = () => {
  const router = useRouter();

  const onLeftMenuClick = useCallback(() => {
    router.push("/admin-certificates-page");
  }, [router]);

  return (
    <div className={styles.projectsPageUser}>
      <TopMenuBar />
      <LeftMenuBar />
      <AccountLeftMenu />
      <HelpBox />

      <div className={styles.accountHeader}>
        <h3>Project Title</h3>
        <div className={styles.leftMenuParent}>
          <div className={styles.frameParent}>
            <div className={styles.projectNameContainerWrapper}>
              <div className={styles.projectNameContainer}>
                <div className={styles.rectangleContainer}>
                  <Image
                    className={styles.rectangleIcon}
                    width={381}
                    height={200}
                    alt=""
                    src="/rectangle-54@2x.png"
                  />
                  <div className={styles.uploadWrapper}>
                    <div className={styles.upload}>Upload</div>
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
                <div className={styles.rectangleParent1}>
                  <div className={styles.rectangleDiv} />
                  <FrameComponent />
                  <div className={styles.regionCountry}>
                    <div className={styles.regionInput}>
                      <div className={styles.projectDescription}>
                        Project Description
                      </div>
                    </div>
                    <textarea
                      className={styles.name}
                      placeholder="A project focused on Miyawaki style tree plantation in urban areas with minimal spaces. The project has planted 1 lakh trees."
                      rows={8}
                      cols={18}
                    />
                  </div>
                  <div className={styles.projectTypeInputParent}>
                    <FrameComponent />
                    <FrameComponent />
                  </div>
                  <FrameComponent />
                </div>
              </div>
            </div>
          </div>
          <Standards />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPageAdmin;
