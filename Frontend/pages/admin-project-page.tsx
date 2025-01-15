import ProjectListCard from "../components/project-list-card";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox from "../components/help-box";
import styles from "./admin-project-page.module.css";
import TopMenuBar1 from "@/components/top-menu-bar1";

const AdminProjectPage = () => {
  return (
    <div className={styles.adminProjectPage}>
      <ProjectListCard />
      <TopMenuBar1 />
      <LeftMenuBar />
      <AccountLeftMenu />
      <HelpBox />
    </div>
  );
};

export default AdminProjectPage;

// const CertificateListCard = ({ className = "" }) => {
//   const router = useRouter();

//   const onViewProjectTextClick = useCallback(() => {
//       router.push("/project-detail-page-admin");
//   }, [router]);
