import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ProjectCard from "./project-card";
import PropTypes from "prop-types";
import styles from "./projects-cluster.module.css";

const ProjectsCluster = ({ className = "" }) => {
  const onProjectCardClick = useCallback(() => {
    // Please sync "Project Detail Page - User" to the project
  }, []);

  return (
    <div className={[styles.projectsCluster, className].join(" ")}>
      <ProjectCard imageCard="/image-card@2x.png" />
      <ProjectCard
        projectCard6Top="463px"
        projectCard6Left="328px"
        imageCard="/image-card@2x.png"
        projectDescriptionDisplay="unset"
        projectDescriptionMinWidth="unset"
      />
      <ProjectCard
        projectCard6Top="463px"
        projectCard6Left="0px"
        imageCard="/image-card@2x.png"
        projectDescriptionDisplay="unset"
        projectDescriptionMinWidth="unset"
      />
      <div
        className={styles.projectCard3}
        role="button"
        onClick={onProjectCardClick}
      >
        <div className={styles.backgroundCard} />
        <Image
          className={styles.imageCardIcon}
          loading="lazy"
          width={277}
          height={155}
          alt=""
          src="/image-card@2x.png"
        />
        <div className={styles.noOfAvailable}>No of available units</div>
        <div className={styles.ada}>{`20 ADA `}</div>
        <div className={styles.regionCountry}>Region, Country</div>
        <div className={styles.projectNameParent}>
          <h3 className={styles.projectName}>{`Project Name `}</h3>
          <div className={styles.projectDescription}>Project Description</div>
        </div>
      </div>
      <ProjectCard
        projectCard6Top="128px"
        projectCard6Left="328px"
        imageCard="/image-card@2x.png"
        projectDescriptionDisplay="inline-block"
        projectDescriptionMinWidth="101.9px"
      />
      <ProjectCard
        projectCard6Top="128px"
        projectCard6Left="0px"
        imageCard="/image-card@2x.png"
        projectDescriptionDisplay="unset"
        projectDescriptionMinWidth="unset"
      />
      <h1 className={styles.projects}>Projects</h1>
    </div>
  );
};

ProjectsCluster.propTypes = {
  className: PropTypes.string,
};

export default ProjectsCluster;
