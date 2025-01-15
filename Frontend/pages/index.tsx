import { useCallback } from "react";
import { Box } from "@mui/material";
import ProjectsCluster from "../components/projects-cluster";
import TopMenuBar1 from "../components/top-menu-bar1";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox1 from "../components/help-box1";
import styles from "./index.module.css";
import AdminDashboardPage from "../components/admin-dashboard";

const ProjectsPageUser = () => {
  const onConnectWalletClick = useCallback(() => {
    // Please sync "Project Creation Page - User" to the project
  }, []);

  return (
    <div className={styles.projectsPageUser}>
      <button className={styles.connectWallet} onClick={onConnectWalletClick}>
        <div className={styles.widthStructure}>
          <div className={styles.heightStructure}>
            <div className={styles.buttonBody}>
              <div className={styles.icon}>
                <div className={styles.div}></div>
              </div>
              <div className={styles.text}>Create New Project +</div>
              <div className={styles.icon}>
                <div className={styles.div}></div>
              </div>
            </div>
          </div>
          <div className={styles.minwidth}>
            <div className={styles.content} />
          </div>
        </div>
      </button>
      {/* <ProjectsCluster /> */}
      <AdminDashboardPage />
      <TopMenuBar1 />
      <LeftMenuBar />
      <AccountLeftMenu />
      <HelpBox1 />
    </div>
  );
};

export default ProjectsPageUser;
