import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styles from "../pages/admin-dashboard.module.css";
import Image from "next/image";

const AdminDashboardPage = () => {
  const router = useRouter();

  const onConnectWalletClick = useCallback(() => {
    // Please sync "Admin Dashboard - Wallet Pop-up" to the project
  }, []);

  const onViewProjectTextClick = useCallback(() => {
    router.push("/project-detail-page-admin");
  }, [router]);
  return (
    <div className={styles.accountHeader}>
      <div className={styles.data}>
        <div className={styles.background}>
          <div className={styles.backgroundChild} />
          <div className={styles.dataContent}>
            <div className={styles.projectStatus}>
              <div className={styles.projectHeaders}>
                <div className={styles.status}>5</div>
              </div>
              <div className={styles.projectHeaders1}>
                <div className={styles.div}>5</div>
              </div>
              <div className={styles.projectHeaders2}>5</div>
              <div className={styles.projectHeaders2}>5</div>
            </div>
          </div>
          <div className={styles.projectFilter}>
            <div className={styles.filterOptions}>
              <h2 className={styles.activeProjects}>Active Projects</h2>
            </div>
            <div className={styles.filterOptions1}>
              <h2 className={styles.inReviewProjectsContainer}>
                <p className={styles.inReview}>In review</p>
                <p className={styles.inReview}>Projects</p>
              </h2>
            </div>
            <h2 className={styles.acceptedProjects}>
              <p className={styles.inReview}>Accepted</p>
              <p className={styles.inReview}>Projects</p>
            </h2>
            <h2 className={styles.rejectedProjects}>
              <p className={styles.inReview}>Rejected</p>
              <p className={styles.inReview}>Projects</p>
            </h2>
          </div>
        </div>
        <div className={styles.background1}>
          <div className={styles.backgroundItem} />
          <div className={styles.tradeInfo}>
            <h2 className={styles.tradeOverview}>Trade overview</h2>
            <div className={styles.tradeDescription}>{`(+5) `}</div>
          </div>
          <div className={styles.tradeChart}>
            <div className={styles.chartContent}>
              <div className={styles.chartData}>
                <div className={styles.chartValues}>
                  <div className={styles.values}>500</div>
                  <div className={styles.values}>400</div>
                  <div className={styles.values}>300</div>
                  <div className={styles.values3}>200</div>
                  <div className={styles.values3}>100</div>
                  <div className={styles.chartLabel}>
                    <div className={styles.chartTitle}>0</div>
                  </div>
                </div>
                <div className={styles.chartDataInner}>
                  <div className={styles.lineParent}>
                    <div className={styles.frameChild} />
                    <div className={styles.frameChild} />
                    <div className={styles.frameChild} />
                    <div className={styles.frameChild} />
                    <div className={styles.frameChild} />
                    <div className={styles.frameChild2} />
                    <Image
                      className={styles.linesIcon}
                      loading="lazy"
                      width={467}
                      height={189}
                      alt=""
                      src="/lines.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.months}>
              <div className={styles.jan}>Jan</div>
              <div className={styles.feb}>Feb</div>
              <div className={styles.jan}>Mar</div>
              <div className={styles.feb}>Apr</div>
              <div className={styles.jan}>May</div>
              <div className={styles.jan}>Jun</div>
              <div className={styles.jul}>Jul</div>
              <div className={styles.jan}>Aug</div>
              <div className={styles.jan}>Sep</div>
              <div className={styles.feb}>Oct</div>
              <div className={styles.jan}>Nov</div>
              <div className={styles.jan}>Dec</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.background2}>
        <div className={styles.backgroundInner} />
        <div className={styles.projectListContent}>
          <div className={styles.projectListHeader}>
            <h2 className={styles.projects3}>Projects</h2>
          </div>
          <div className={styles.projectCount}>
            <div className={styles.projects4}>PROJECTS</div>
          </div>
          <div className={styles.typeLabel}>
            <div className={styles.type}>TYPE</div>
          </div>
          <div className={styles.statusLabel}>
            <div className={styles.statusHeader}>
              <div className={styles.regionCountry}>REGION/ COUNTRY</div>
              <div className={styles.qty}>QTY</div>
            </div>
          </div>
          <div className={styles.statusIconWrapper}>
            <div className={styles.statusIcon}>
              <div className={styles.status1}>STATUS</div>
            </div>
            <Image
              className={styles.icon}
              loading="lazy"
              width={20}
              height={18}
              alt=""
              src="/icon-1.svg"
            />
          </div>
        </div>
        <div className={styles.projectList}>
          <Image
            className={styles.linesIcon1}
            width={1012}
            height={1}
            alt=""
            src="/lines-1.svg"
          />
          <div className={styles.projectsListing}>
            <div className={styles.projectListing1}>
              <div className={styles.projectWrapper}>
                <div className={styles.projectContent}>
                  <div className={styles.projectLogo}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={41}
                      height={37}
                      alt=""
                      src="/logo-1@2x.png"
                    />
                  </div>
                  <div className={styles.projectDetails}>
                    <h3 className={styles.projectTitle}>Project Title</h3>
                    <div
                      role="button"
                      className={styles.viewProject}
                      onClick={onViewProjectTextClick}
                    >
                      View Project
                    </div>
                  </div>
                </div>
                <div className={styles.typeIconWrapper}>
                  <Image
                    className={styles.typeIconWrapperChild}
                    loading="lazy"
                    width={37}
                    height={37}
                    alt=""
                    src="/ellipse-9@2x.png"
                  />
                  <div className={styles.typeLabelWrapper}>
                    <h3 className={styles.projectTitle}>Project Type</h3>
                  </div>
                </div>
                <div className={styles.region}>
                  <h3 className={styles.projectTitle}>Asia/India</h3>
                </div>
                <div className={styles.quantity}>
                  <div className={styles.statusWrapper}>20,000</div>
                </div>
                <div className={styles.statusButtonWrapper}>
                  <div className={styles.statusButton}>
                    <div className={styles.statusButtonChild} />
                    <h3 className={styles.reviewed}>Reviewed</h3>
                  </div>
                </div>
              </div>
              <Image
                className={styles.linesIcon2}
                width={1012}
                height={1}
                alt=""
                src="/lines-2.svg"
              />
            </div>
            <div className={styles.projectListing1}>
              <div className={styles.projectWrapper}>
                <div className={styles.projectContent}>
                  <div className={styles.projectLogo}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={41}
                      height={37}
                      alt=""
                      src="/logo-1@2x.png"
                    />
                  </div>
                  <div className={styles.projectDetails}>
                    <h3 className={styles.projectTitle}>Project Title</h3>
                    <div
                      role="button"
                      className={styles.viewProject1}
                      onClick={onViewProjectTextClick}
                    >
                      View Project
                    </div>
                  </div>
                </div>
                <div className={styles.typeIconWrapper}>
                  <Image
                    className={styles.ellipseIcon}
                    loading="lazy"
                    width={37}
                    height={37}
                    alt=""
                    src="/ellipse-9@2x.png"
                  />
                  <div className={styles.typeLabelWrapper}>
                    <h3 className={styles.projectTitle}>Project Type</h3>
                  </div>
                </div>
                <div className={styles.region}>
                  <h3 className={styles.projectTitle}>Asia/India</h3>
                </div>
                <div className={styles.quantity}>
                  <div className={styles.statusWrapper}>20,000</div>
                </div>
                <div className={styles.statusButtonContainer}>
                  <div className={styles.statusButton1}>
                    <div className={styles.statusButtonItem} />
                    <h3 className={styles.inReview1}>In-Review</h3>
                  </div>
                </div>
              </div>
              <Image
                className={styles.linesIcon2}
                width={1012}
                height={1}
                alt=""
                src="/lines-2.svg"
              />
            </div>
            <div className={styles.projectListing3}>
              <div className={styles.projectWrapper}>
                <div className={styles.frameDiv}>
                  <div className={styles.projectLogo}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={41}
                      height={37}
                      alt=""
                      src="/logo-1@2x.png"
                    />
                  </div>
                  <div className={styles.projectDetails}>
                    <h3 className={styles.projectTitle}>Project Title</h3>
                    <div
                      role="button"
                      className={styles.viewProject1}
                      onClick={onViewProjectTextClick}
                    >
                      View Project
                    </div>
                  </div>
                </div>
                <div className={styles.instanceParent}>
                  <Image
                    className={styles.typeIconWrapperChild}
                    loading="lazy"
                    width={37}
                    height={37}
                    alt=""
                    src="/ellipse-9-2@2x.png"
                  />
                  <div className={styles.typeLabelWrapper}>
                    <h3 className={styles.projectTitle}>Project Type</h3>
                  </div>
                </div>
                <div className={styles.asiaindiaContainer}>
                  <h3 className={styles.projectTitle}>Asia/India</h3>
                </div>
                <div className={styles.container}>
                  <div className={styles.statusWrapper}>20,000</div>
                </div>
                <div className={styles.statusButtonWrapper}>
                  <div className={styles.statusButton2}>
                    <div className={styles.statusButtonChild} />
                    <h3 className={styles.reviewed1}>Reviewed</h3>
                  </div>
                </div>
              </div>
              <Image
                className={styles.linesIcon2}
                loading="lazy"
                width={1012}
                height={1}
                alt=""
                src="/lines-2.svg"
              />
            </div>
            <div className={styles.projectListing3}>
              <div className={styles.projectWrapper}>
                <div className={styles.frameDiv}>
                  <div className={styles.projectLogo}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={41}
                      height={37}
                      alt=""
                      src="/logo-1@2x.png"
                    />
                  </div>
                  <div className={styles.projectDetails}>
                    <h3 className={styles.projectTitle}>Project Title</h3>
                    <div
                      className={styles.viewProject1}
                      onClick={onViewProjectTextClick}
                      role="button"
                    >
                      View Project
                    </div>
                  </div>
                </div>
                <div className={styles.instanceParent}>
                  <Image
                    className={styles.typeIconWrapperChild}
                    loading="lazy"
                    width={37}
                    height={37}
                    alt=""
                    src="/ellipse-9-3@2x.png"
                  />
                  <div className={styles.typeLabelWrapper}>
                    <h3 className={styles.projectTitle}>Project Type</h3>
                  </div>
                </div>
                <div className={styles.asiaindiaContainer}>
                  <h3 className={styles.projectTitle}>Asia/India</h3>
                </div>
                <div className={styles.container}>
                  <div className={styles.statusWrapper}>20,000</div>
                </div>
                <div className={styles.statusButtonWrapper}>
                  <div className={styles.statusButton2}>
                    <div className={styles.statusButtonChild} />
                    <h3 className={styles.reviewed1}>Reviewed</h3>
                  </div>
                </div>
              </div>
              <Image
                className={styles.linesIcon2}
                loading="lazy"
                width={1012}
                height={1}
                alt=""
                src="/lines-2.svg"
              />
            </div>
            <div className={styles.projectListing3}>
              <div className={styles.projectWrapper}>
                <div className={styles.frameDiv}>
                  <div className={styles.projectLogo}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={41}
                      height={37}
                      alt=""
                      src="/logo-1@2x.png"
                    />
                  </div>
                  <div className={styles.projectDetails}>
                    <h3 className={styles.projectTitle}>Project Title</h3>
                    <div
                      role="button"
                      className={styles.viewProject1}
                      onClick={onViewProjectTextClick}
                    >
                      View Project
                    </div>
                  </div>
                </div>
                <div className={styles.instanceParent}>
                  <Image
                    className={styles.typeIconWrapperChild}
                    loading="lazy"
                    width={37}
                    height={37}
                    alt=""
                    src="/ellipse-9-4@2x.png"
                  />
                  <div className={styles.typeLabelWrapper}>
                    <h3 className={styles.projectTitle}>Project Type</h3>
                  </div>
                </div>
                <div className={styles.asiaindiaContainer}>
                  <h3 className={styles.projectTitle}>Asia/India</h3>
                </div>
                <div className={styles.container}>
                  <div className={styles.statusWrapper}>20,000</div>
                </div>
                <div className={styles.statusButtonWrapper}>
                  <div className={styles.statusButton2}>
                    <div className={styles.statusButtonChild} />
                    <h3 className={styles.reviewed1}>Reviewed</h3>
                  </div>
                </div>
              </div>
              <Image
                className={styles.linesIcon2}
                loading="lazy"
                width={1012}
                height={1}
                alt=""
                src="/lines-2.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
