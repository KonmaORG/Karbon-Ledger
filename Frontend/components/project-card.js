import { useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import styles from "./project-card.module.css";

const ProjectCard = ({
  className = "",
  projectCard6Top,
  projectCard6Left,
  imageCard,
  projectDescriptionDisplay,
  projectDescriptionMinWidth,
}) => {
  const projectCard6Style = useMemo(() => {
    return {
      top: projectCard6Top,
      left: projectCard6Left,
    };
  }, [projectCard6Top, projectCard6Left]);

  const projectDescriptionStyle = useMemo(() => {
    return {
      display: projectDescriptionDisplay,
      minWidth: projectDescriptionMinWidth,
    };
  }, [projectDescriptionDisplay, projectDescriptionMinWidth]);

  const onProjectCardClick = useCallback(() => {
    // Please sync "Project Detail Page - User" to the project
  }, []);

  return (
    <div
      className={[styles.projectCard6, className].join(" ")}
      role="button"
      onClick={onProjectCardClick}
      style={projectCard6Style}
    >
      <div className={styles.backgroundCard} />
      <Image
        className={styles.imageCardIcon}
        loading="lazy"
        width={277}
        height={155}
        alt=""
        src={imageCard}
      />
      <div className={styles.noOfAvailable}>No of available units</div>
      <h3 className={styles.projectName}>Project Name</h3>
      <div className={styles.ada}>{`20 ADA `}</div>
      <div className={styles.regionCountry}>Region, Country</div>
      <div
        className={styles.projectDescription}
        style={projectDescriptionStyle}
      >
        Project Description
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  imageCard: PropTypes.string.isRequired,

  /** Style props */
  projectCard6Top: PropTypes.string,
  projectCard6Left: PropTypes.string,
  projectDescriptionDisplay: PropTypes.string,
  projectDescriptionMinWidth: PropTypes.string,
};

export default ProjectCard;
