import { useCallback, useState } from "react";
import { Box, TextField, Select, MenuItem, Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import UserActions from "../components/user-actions";
import Standards from "../components/standards";
import styles from "./project-detail-page-user.module.css";
import TopMenuBar from "../components/top-menu-bar";
import LeftMenuBar from "../components/left-menu-bar";
import AccountLeftMenu from "../components/account-left-menu";
import HelpBox from "../components/help-box";
import { submitProject } from "@/lib/transactions";
import { useWallet } from "@/context/walletContext";
import TopMenuBar1 from "@/components/top-menu-bar1";

const ProjectDetailPageUser = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [isUploading, setIsUploading] = useState(false);
  const [walletConnection] = useWallet();
  const onLeftMenuClick = useCallback(() => {
    router.push("/admin-certificates-page");
  }, [router]);

  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit");
        return;
      }
      setFile(selectedFile);
      const hash = await calculateHash(selectedFile);
      setFileHash(hash);
    }
  };

  const dummyApiCall = async (
    file: File,
    category: string,
    title: string,
  ): Promise<void> => {
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(
      `File "${file.name}" with title "${title}" uploaded with category "${category}"`,
    );
  };

  const handleSubmit = async () => {
    if (file && selectedCategory && title) {
      try {
        setIsUploading(true);
        await submitProject(
          walletConnection,
          fileHash,
          selectedCategory,
          title,
        );
        await dummyApiCall(file, selectedCategory, title);
        console.log("File uploaded successfully!");
        setFile(null);
        setFileHash("");
        setTitle("");
        setSelectedCategory("");
      } catch (error) {
        console.error("Error during submission:", error);
      } finally {
        setIsUploading(false);
      }
    } else {
      console.log("Please fill in all fields and upload a file");
    }
  };

  return (
    <div className={styles.projectsPageUser}>
      <TopMenuBar1 />
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
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                  />
                  <Select
                    fullWidth
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value as string)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    margin="dense"
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    <MenuItem value="algae">Algae</MenuItem>
                    <MenuItem value="water">Water</MenuItem>
                    <MenuItem value="forestration">Forestration</MenuItem>
                  </Select>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    style={{ marginTop: "16px" }}
                  >
                    Upload File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {file && <Box mt={2}>Selected file: {file.name}</Box>}
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
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={
                        !file || !selectedCategory || !title || isUploading
                      }
                    >
                      {isUploading ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
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

export default ProjectDetailPageUser;
