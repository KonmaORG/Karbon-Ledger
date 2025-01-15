import { useCallback } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./user-dashboard.module.css";
import TopMenuBar1 from "../components/top-menu-bar1";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox1 from "../components/help-box1";
import UserDashboardPage from "../components/user-dashboard-page";

const UserDashboard = () => {
  const router = useRouter();

  const onConnectWalletClick = useCallback(() => {
    // Please sync "Admin Dashboard - Wallet Pop-up" to the project
  }, []);

  const onViewProjectTextClick = useCallback(() => {
    router.push("/project-detail-page-admin");
  }, [router]);

  return (
    <div className={styles.projectsPageUser}>
      <UserDashboardPage />
      <TopMenuBar1 />
      <LeftMenuBar />
      <AccountLeftMenu />
      <HelpBox1 />
    </div>
  );
};

export default UserDashboard;
