import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./project-list-card.module.css";

const CertificateListCard = ({ className = "" }) => {
  const router = useRouter();

  const onViewProjectTextClick = useCallback(() => {
    router.push("/project-detail-page-admin");
  }, [router]);

  return (
    <section className={[styles.projectListCard, className].join(" ")}>
      <div className={styles.background}>
        <div className={styles.backgroundChild} />
      </div>
      <div className={styles.projectListing}>
        <div className={styles.projectListing6}>
          <Image
            className={styles.linesIcon}
            loading="lazy"
            width={1102}
            height={1}
            alt=""
            src="/lines-11.svg"
          />
          <div className={styles.asiaindia}>Asia/India</div>
          <div className={styles.area}>20,000</div>
          <div className={styles.ada}>20 ADA</div>
          <div className={styles.projectType}>
            <div className={styles.project_type}>Project Type</div>
          </div>
          <div className={styles.projectTitle}>
            <div className={styles.project_title}>Project Title</div>
            <div
              className={styles.viewProject}
              role="button"
              onClick={onViewProjectTextClick}
            >
              View Project
            </div>
            <Image
              className={styles.logoIcon}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
          </div>
          <div className={styles.hashCode}>
            <div className={""}>x00022580dhmdkd</div>
            <Image
              className={""}
              width={23}
              height={23}
              alt=""
              src="/copy@2x.png"
            />
          </div>
          <div className={styles.div}>00023</div>
          <div className={styles.yyyy}>yyyy</div>
          <div className={styles.yyyy1}>yyyy</div>
          <div className={styles.standardName}>Standard Name</div>
          <Image
            className={styles.projectListing6Child}
            loading="lazy"
            width={30}
            height={30}
            alt=""
            src="/ellipse-91@2x.png"
          />
        </div>
        <div className={styles.projectListing5}>
          <Image
            className={styles.linesIcon1}
            loading="lazy"
            width={1102}
            height={1}
            alt=""
            src="/lines-11.svg"
          />
          <div className={styles.asiaindia}>Asia/India</div>
          <div className={styles.country}>20,000</div>
          <div className={styles.ada}>20 ADA</div>
          <div className={styles.projectType2}>
            <div className={styles.project_type}>Project Type</div>
          </div>
          <div className={styles.projectTitle2}>
            <div className={styles.project_title}>Project Title</div>
            <div
              className={styles.viewProject}
              role="button"
              onClick={onViewProjectTextClick}
            >
              View Project
            </div>
            <Image
              className={styles.logoIcon}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
          </div>
          <div className={styles.hashCode}>
            <div className={""}>x00022580dhmdkd</div>
            <Image
              className={""}
              width={23}
              height={23}
              alt=""
              src="/copy@2x.png"
            />
          </div>
          <div className={styles.div1}>00023</div>
          <div className={styles.yyyy2}>yyyy</div>
          <div className={styles.yyyy}>yyyy</div>
          <div className={styles.standardName}>Standard Name</div>
          <Image
            className={styles.projectListing5Child}
            loading="lazy"
            width={30}
            height={30}
            alt=""
            src="/ellipse-9-31@2x.png"
          />
        </div>
        <div className={styles.projectListing4}>
          <Image
            className={styles.linesIcon1}
            width={1102}
            height={1}
            alt=""
            src="/lines-11.svg"
          />
          <div className={styles.asiaindia}>Asia/India</div>
          <div className={styles.country}>20,000</div>
          <div className={styles.ada}>20 ADA</div>
          <div className={styles.projectType2}>
            <div className={styles.project_type}>Project Type</div>
          </div>
          <div className={styles.projectTitle2}>
            <div className={styles.project_title}>Project Title</div>
            <div
              className={styles.viewProject}
              role="button"
              onClick={onViewProjectTextClick}
            >
              View Project
            </div>
            <Image
              className={styles.logoIcon}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
          </div>
          <div className={styles.hashCode}>
            <div className={""}>x00022580dhmdkd</div>
            <Image
              className={""}
              width={23}
              height={23}
              alt=""
              src="/copy@2x.png"
            />
          </div>
          <div className={styles.div1}>00023</div>
          <div className={styles.yyyy2}>yyyy</div>
          <div className={styles.yyyy}>yyyy</div>
          <div className={styles.standardName}>Standard Name</div>
          <Image
            className={styles.projectListing4Child}
            loading="lazy"
            width={30}
            height={30}
            alt=""
            src="/ellipse-9-21@2x.png"
          />
        </div>
        <div className={styles.projectListing3}>
          <Image
            className={styles.linesIcon1}
            width={1102}
            height={1}
            alt=""
            src="/lines-11.svg"
          />
          <div className={styles.asiaindia}>Asia/India</div>
          <div className={styles.country}>20,000</div>
          <div className={styles.ada}>20 ADA</div>
          <div className={styles.projectType2}>
            <div className={styles.project_type}>Project Type</div>
          </div>
          <div className={styles.projectTitle2}>
            <div className={styles.project_title}>Project Title</div>
            <div
              className={styles.viewProject}
              role="button"
              onClick={onViewProjectTextClick}
            >
              View Project
            </div>
            <Image
              className={styles.logoIcon}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
          </div>
          <div className={styles.hashCode}>
            <div className={""}>x00022580dhmdkd</div>
            <Image
              className={""}
              width={23}
              height={23}
              alt=""
              src="/copy@2x.png"
            />
          </div>
          <div className={styles.div1}>00023</div>
          <div className={styles.yyyy2}>yyyy</div>
          <div className={styles.yyyy}>yyyy</div>
          <div className={styles.standardName}>Standard Name</div>
          <Image
            className={styles.projectListing3Child}
            loading="lazy"
            width={30}
            height={30}
            alt=""
            src="/ellipse-9-1@2x.png"
          />
        </div>
        <div className={styles.projectListing2}>
          <Image
            className={styles.linesIcon1}
            width={1102}
            height={1}
            alt=""
            src="/lines-11.svg"
          />
          <div className={styles.asiaindia}>Asia/India</div>
          <div className={styles.country}>20,000</div>
          <div className={styles.ada}>20 ADA</div>
          <div className={styles.projectType2}>
            <div className={styles.project_type}>Project Type</div>
          </div>
          <div className={styles.projectTitle2}>
            <div className={styles.project_title}>Project Title</div>
            <div
              className={styles.viewProject}
              role="button"
              onClick={onViewProjectTextClick}
            >
              View Project
            </div>
            <Image
              className={styles.logoIcon}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
          </div>
          <div className={styles.hashCode}>
            <div className={""}>x00022580dhmdkd</div>
            <Image
              className={""}
              width={23}
              height={23}
              alt=""
              src="/copy@2x.png"
            />
          </div>
          <div className={styles.div1}>00023</div>
          <div className={styles.yyyy2}>yyyy</div>
          <div className={styles.yyyy}>yyyy</div>
          <div className={styles.standardName}>Standard Name</div>
          <Image
            className={styles.projectListing2Child}
            loading="lazy"
            width={30}
            height={30}
            alt=""
            src="/ellipse-91@2x.png"
          />
        </div>
        <div className={styles.projectListing1}>
          <Image
            className={styles.linesIcon5}
            width={1102}
            height={1}
            alt=""
            src="/lines-11.svg"
          />
          <div className={styles.asiaindia2}>Asia/India</div>
          <div className={styles.location}>20,000</div>
          <div className={styles.ada2}>20 ADA</div>
          <div className={styles.projectType6}>
            <div className={styles.project_type}>Project Type</div>
          </div>
          <div className={styles.projectTitle6}>
            <div className={styles.project_title}>Project Title</div>
            <div
              className={styles.viewProject}
              role="button"
              onClick={onViewProjectTextClick}
            >
              View Project
            </div>
            <Image
              className={styles.logoIcon}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
          </div>
          <div className={styles.hashCode}>
            <div className={""}>x00022580dhmdkd</div>
            <Image
              className={""}
              width={23}
              height={23}
              alt=""
              src="/copy@2x.png"
            />
          </div>
          <div className={styles.div2}>00023</div>
          <div className={styles.yyyy4}>yyyy</div>
          <div className={styles.yyyy5}>yyyy</div>
          <div className={styles.standardName2}>Standard Name</div>
          <Image
            className={styles.projectListing1Child}
            loading="lazy"
            width={30}
            height={30}
            alt=""
            src="/ellipse-91@2x.png"
          />
        </div>
      </div>
      <div className={styles.list}>
        <Image
          className={styles.linesIcon6}
          width={1100}
          height={1}
          alt=""
          src="/lines1.svg"
        />
        <div className={styles.titles}>
          <div className={styles.acceptReject}>Certification Hash</div>
          <div className={styles.pricePerUnit}>Price per unit</div>
          <div className={styles.qty}>Qty</div>
          <div className={styles.regionCountry}>Region, Country</div>
          <div className={styles.projectId}>Project ID</div>
          <div className={styles.projectType7}>Project Type</div>
          <div className={styles.standard}>Standard</div>
          <div className={styles.vintageTo}>Vintage To</div>
          <div className={styles.vintageFrom}>Vintage From</div>
          <div className={styles.project}>Project</div>
        </div>
      </div>
      <div className={styles.cardTitle}>
        <h3 className={styles.project1}>Certificates</h3>
      </div>
    </section>
  );
};

CertificateListCard.propTypes = {
  className: PropTypes.string,
};

export default CertificateListCard;
