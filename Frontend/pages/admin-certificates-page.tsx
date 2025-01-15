import { useCallback } from "react";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import FrameComponent2 from "../components/frame-component2";
import { useRouter } from "next/router";
import Background1 from "../components/background1";
import styles from "./admin-certificates-page.module.css";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox from "../components/help-box";
import CertificateListCard from "../components/certificate-list-card";
import TopMenuBar1 from "@/components/top-menu-bar1";

const AdminCertificatesPage = () => {
  const router = useRouter();

  const onLeftMenuClick = useCallback(() => {
    router.push("/admin-project-page");
  }, [router]);

  const onProfileContainerClick = useCallback(() => {
    router.push("/profile-page-admin");
  }, [router]);

  const onSignOutContainerClick = useCallback(() => {
    router.push("/sign-in-screen-admin");
  }, [router]);

  return (
    <div className={styles.adminCertificatesPage}>
      <TopMenuBar1 />
      <LeftMenuBar />
      <AccountLeftMenu />
      <HelpBox />
      {/* <FrameComponent2 /> */}

      {/* <Background1 /> */}
      <CertificateListCard />
    </div>
  );
};

export default AdminCertificatesPage;
