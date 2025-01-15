import ProjectListCard from "../components/project-list-card";
import TopMenuBar from "../components/top-menu-bar";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox from "../components/help-box";
import styles from "./user-project-page.module.css";
import ProjectsCluster from "../components/projects-cluster";

const UserProjectPage = () => {
  return (
    <div className={styles.adminProjectPage}>
      <ProjectsCluster />
      <TopMenuBar />
      <LeftMenuBar />
      <AccountLeftMenu />
      <HelpBox />
    </div>
  );
};

export default UserProjectPage;
