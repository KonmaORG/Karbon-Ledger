import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./background1.module.css";

const Background1 = ({ className = "" }) => {
  const router = useRouter();

  const onAccordionHeaderClick = useCallback((event) => {
    const element = event.target;

    const accItem = element.closest("[data-acc-item]") || element;
    const accContent = accItem.querySelector("[data-acc-content]");
    const isOpen = accItem.hasAttribute("data-acc-open");
    const nextOuterSibling =
      accItem?.nextElementSibling || accItem?.parentElement?.nextElementSibling;
    const prevOuterSibling =
      accItem?.previousElementSibling ||
      accItem?.parentElement?.previousElementSibling;
    const siblingContainerAccItem = accItem?.hasAttribute("data-acc-original")
      ? accItem?.nextElementSibling ||
        nextOuterSibling?.querySelector("[data-acc-item]") ||
        nextOuterSibling
      : accItem?.previousElementSibling ||
        prevOuterSibling?.querySelector("[data-acc-item]") ||
        prevOuterSibling;
    const siblingAccItem =
      siblingContainerAccItem?.querySelector("[data-acc-item]") ||
      siblingContainerAccItem;

    if (!siblingAccItem) return;
    const originalDisplay = "flex";
    const siblingDisplay = "flex";

    const openStyleObject = {
      "grid-template-rows": "1fr",
    };
    const closeStyleObject = {
      "padding-top": "0px",
      "padding-bottom": "0px",
      "margin-bottom": "0px",
      "margin-top": "0px",
      "grid-template-rows": "0fr",
    };

    function applyStyles(element, styleObject) {
      Object.assign(element.style, styleObject);
    }

    function removeStyles(element, styleObject) {
      Object.keys(styleObject).forEach((key) => {
        element?.style.removeProperty(key);
      });
    }

    if (isOpen) {
      removeStyles(accContent, openStyleObject);
      applyStyles(accContent, closeStyleObject);

      setTimeout(() => {
        if (accItem) {
          accItem.style.display = "none";
          siblingAccItem.style.display = siblingDisplay;
        }
      }, 100);
    } else {
      if (accItem) {
        accItem.style.display = "none";
        siblingAccItem.style.display = originalDisplay;
      }
      const siblingAccContent =
        siblingAccItem?.querySelector("[data-acc-content]");
      setTimeout(() => {
        removeStyles(siblingAccContent, closeStyleObject);
        applyStyles(siblingAccContent, openStyleObject);
      }, 1);
    }
  }, []);

  const onViewProjectTextClick = useCallback(() => {
    router.push("/project-detail-page-admin");
  }, [router]);

  return (
    <div className={[styles.background, className].join(" ")}>
      <div className={styles.backgroundChild} />
      <div className={styles.listingTitle}>
        <h3 className={styles.certificates}>Certificates</h3>
      </div>
      <div className={styles.certificateTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerItems}>
            <div className={styles.headerNames}>
              <div className={styles.project}>Project</div>
            </div>
            <div className={styles.headerNames1}>
              <div className={styles.vintageFrom}>Vintage From</div>
            </div>
            <div className={styles.headerNames2}>
              <div className={styles.vintageTo}>Vintage To</div>
            </div>
            <div className={styles.standardId}>
              <div className={styles.standard}>Standard</div>
              <div className={styles.projectTypeHeader}>
                <div className={styles.vintageTo}>Project Type</div>
              </div>
            </div>
            <div className={styles.standard}>Project ID</div>
            <div className={styles.regionQty}>
              <div className={styles.regionCountry}>Region, Country</div>
              <div className={styles.qty}>Qty</div>
            </div>
            <div className={styles.headerNames3}>
              <div className={styles.project}>Price per unit</div>
            </div>
            <div className={styles.certificationHash}>Certification Hash</div>
          </div>
          <Image
            className={styles.linesIcon}
            width={1100}
            height={1}
            alt=""
            src="/lines1.svg"
          />
        </div>
      </div>
      <div className={styles.projectListing} data-acc-group>
        <div
          className={styles.listing}
          data-acc-item
          data-acc-open
          data-acc-header
          data-acc-original
          data-acc-default-open
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing2}>
            <Image
              className={styles.linesIcon1}
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
            <div className={styles.asiaindia}>Asia/India</div>
            <div className={styles.details}>20,000</div>
            <div
              className={styles.accordionContentaccordionDef}
              data-acc-content
            >
              <div className={styles.container}>
                <div className={styles.type}>
                  <div className={styles.projectType1}>Project Type</div>
                </div>
              </div>
            </div>
            <div className={styles.projectListing1}>
              <Image
                className={styles.linesIcon2}
                width={1102}
                height={1}
                alt=""
                src="/lines-11.svg"
              />
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.projectType2}>Project Type</div>
                  <div
                    className={styles.viewProject}
                    role="button"
                    onClick={onViewProjectTextClick}
                  >
                    View Project
                  </div>
                  <div className={styles.visual}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={33}
                      height={33}
                      alt=""
                      src="/logo-11@2x.png"
                    />
                    <div className={styles.titleContainer}>
                      <div className={styles.projectTitle}>Project Title</div>
                    </div>
                    <div className={styles.date}>
                      <div className={styles.yyyy}>yyyy</div>
                    </div>
                    <div className={styles.period}>
                      <div className={styles.range}>
                        <div className={styles.yyyy1}>yyyy</div>
                        <div className={styles.term}>
                          <div className={styles.standardName}>
                            Standard Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.geolocation}>
                    <div className={styles.pin}>
                      <Image
                        className={styles.pinChild}
                        loading="lazy"
                        width={30}
                        height={30}
                        alt=""
                        src="/ellipse-91@2x.png"
                      />
                    </div>
                    <div className={styles.coordinates}>
                      <div className={styles.place}>00023</div>
                    </div>
                    <div className={styles.asiaindiaContainer}>
                      <div className={styles.asiaindia1}>Asia/India</div>
                    </div>
                    <div className={styles.coordinates2}>
                      <div className={styles.div}>20,000</div>
                    </div>
                  </div>
                </div>
                <div className={styles.currency}>
                  <div className={styles.ada}>20 ADA</div>
                </div>
              </div>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>
                <div className={styles.ada}>20 ADA</div>
              </div>
              <div className={styles.total}>
                <div className={styles.breakdown}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <div className={styles.projectTitle1}>Project Title</div>
            <div className={styles.link}>
              <div
                className={styles.viewProject1}
                role="button"
                onClick={onViewProjectTextClick}
              >
                View Project
              </div>
            </div>
            <Image
              className={styles.logoIcon1}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
            <div className={styles.spacer}>00023</div>
            <div className={styles.yyyy2}>yyyy</div>
            <div className={styles.yyyy3}>yyyy</div>
            <div className={styles.standardName1}>Standard Name</div>
            <div className={styles.amountContainer}>
              <div className={styles.amountDetails}>
                <div className={styles.valueBox}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon1}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <Image
              className={styles.projectListing2Child}
              loading="lazy"
              width={30}
              height={30}
              alt=""
              src="/ellipse-91@2x.png"
            />
          </div>
        </div>
        <div
          className={styles.frame140Close}
          data-acc-item
          data-acc-header
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing6}>
            <div className={styles.frameParent}>
              <div className={styles.projectTypeParent}>
                <div className={styles.projectType3}>Asia/India</div>
                <div
                  className={styles.viewProject2}
                  role="button"
                  onClick={onViewProjectTextClick}
                >
                  View Project
                </div>
                <div className={styles.logoParent}>
                  <Image
                    className={styles.logoIcon}
                    loading="lazy"
                    width={33}
                    height={33}
                    alt=""
                    src="/logo-11@2x.png"
                  />
                  <div className={styles.titleContainer}>
                    <div className={styles.projectTitle}>Project Title</div>
                  </div>
                  <div className={styles.date}>
                    <div className={styles.standardName}>yyyy</div>
                  </div>
                  <div className={styles.period}>
                    <div className={styles.range}>
                      <div className={styles.yyyy1}>yyyy</div>
                      <div className={styles.term}>
                        <div className={styles.standardName}>Standard Name</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameGroup}>
                  <div className={styles.instanceWrapper}>
                    <Image
                      className={styles.pinChild}
                      loading="lazy"
                      width={30}
                      height={30}
                      alt=""
                      src="/ellipse-91@2x.png"
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.place}>00023</div>
                  </div>
                  <div className={styles.asiaindiaWrapper}>
                    <div className={styles.asiaindia1}>Asia/India</div>
                  </div>
                  <div className={styles.frame}>
                    <div className={styles.div}>20,000</div>
                  </div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.frameDiv}>
                  <div className={styles.price}>
                    <div className={styles.ada}>20 ADA</div>
                  </div>
                  <div className={styles.total}>
                    <div className={styles.valueBox}>
                      <div className={styles.x00022580dhmdkd}>
                        x00022580dhmdkd
                      </div>
                    </div>
                    <Image
                      className={styles.copyIcon2}
                      loading="lazy"
                      width={23}
                      height={23}
                      alt=""
                      src="/copy@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Image
              className={styles.linesIcon3}
              loading="lazy"
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
          </div>
          <div className={styles.accordionContent} />
          <div className={styles.div3} />
        </div>
        <div
          className={styles.projectRows}
          data-acc-item
          data-acc-header
          data-acc-original
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing3}>
            <div className={styles.projectInfo}>
              <div className={styles.projectDetails}>
                <div className={styles.projectType4}>Project Type</div>
                <div
                  className={styles.viewProject2}
                  role="button"
                  onClick={onViewProjectTextClick}
                >
                  View Project
                </div>
                <div className={styles.logoParent}>
                  <Image
                    className={styles.logoIcon}
                    loading="lazy"
                    width={33}
                    height={33}
                    alt=""
                    src="/logo-11@2x.png"
                  />
                  <div className={styles.titleContainer}>
                    <div className={styles.projectTitle}>Project Title</div>
                  </div>
                  <div className={styles.date}>
                    <div className={styles.yyyy}>yyyy</div>
                  </div>
                  <div className={styles.period}>
                    <div className={styles.range}>
                      <div className={styles.yyyy1}>yyyy</div>
                      <div className={styles.term}>
                        <div className={styles.standardName}>Standard Name</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.location}>
                <div className={styles.marker}>
                  <Image
                    className={styles.pinChild}
                    loading="lazy"
                    width={30}
                    height={30}
                    alt=""
                    src="/ellipse-9-1@2x.png"
                  />
                </div>
                <div className={styles.separator}>
                  <div className={styles.place}>00023</div>
                </div>
                <div className={styles.region}>
                  <div className={styles.country}>
                    <div className={styles.asiaindia3}>Asia/India</div>
                    <div className={styles.delimiter}>20,000</div>
                  </div>
                </div>
                <div className={styles.value}>
                  <div className={styles.token}>
                    <div className={styles.ada3}>20 ADA</div>
                    <div className={styles.amount}>
                      <div className={styles.valueBox}>
                        <div className={styles.x00022580dhmdkd}>
                          x00022580dhmdkd
                        </div>
                      </div>
                      <Image
                        className={styles.copyIcon3}
                        width={23}
                        height={23}
                        alt=""
                        src="/copy@2x.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Image
              className={styles.linesIcon3}
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
          </div>
        </div>
        <div
          className={styles.frame141Open}
          data-acc-item
          data-acc-open
          data-acc-header
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing2}>
            <Image
              className={styles.linesIcon1}
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
            <div className={styles.asiaindia4}>Project Type</div>
            <div className={styles.details}>20,000</div>
            <div className={styles.accordionContent1} data-acc-content>
              <div className={styles.container}>
                <div className={styles.type}>
                  <div className={styles.projectType1}>Project Type</div>
                </div>
              </div>
            </div>
            <div className={styles.projectListing1}>
              <Image
                className={styles.linesIcon2}
                width={1102}
                height={1}
                alt=""
                src="/lines-11.svg"
              />
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.projectType2}>Project Type</div>
                  <div
                    className={styles.viewProject}
                    role="button"
                    onClick={onViewProjectTextClick}
                  >
                    View Project
                  </div>
                  <div className={styles.visual}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={33}
                      height={33}
                      alt=""
                      src="/logo-11@2x.png"
                    />
                    <div className={styles.titleContainer}>
                      <div className={styles.projectTitle}>Project Title</div>
                    </div>
                    <div className={styles.date}>
                      <div className={styles.yyyy}>yyyy</div>
                    </div>
                    <div className={styles.period}>
                      <div className={styles.range}>
                        <div className={styles.yyyy1}>yyyy</div>
                        <div className={styles.term}>
                          <div className={styles.standardName}>
                            Standard Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.geolocation}>
                    <div className={styles.pin}>
                      <Image
                        className={styles.pinChild}
                        loading="lazy"
                        width={30}
                        height={30}
                        alt=""
                        src="/ellipse-91@2x.png"
                      />
                    </div>
                    <div className={styles.coordinates}>
                      <div className={styles.place}>00023</div>
                    </div>
                    <div className={styles.asiaindiaContainer}>
                      <div className={styles.asiaindia1}>Asia/India</div>
                    </div>
                    <div className={styles.coordinates2}>
                      <div className={styles.div}>20,000</div>
                    </div>
                  </div>
                </div>
                <div className={styles.currency}>
                  <div className={styles.ada}>20 ADA</div>
                </div>
              </div>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>
                <div className={styles.ada}>20 ADA</div>
              </div>
              <div className={styles.total}>
                <div className={styles.breakdown}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <div className={styles.projectTitle1}>Project Title</div>
            <div className={styles.link}>
              <div
                className={styles.viewProject1}
                role="button"
                onClick={onViewProjectTextClick}
              >
                View Project
              </div>
            </div>
            <Image
              className={styles.logoIcon1}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
            <div className={styles.spacer}>00023</div>
            <div className={styles.yyyy2}>yyyy</div>
            <div className={styles.yyyy3}>yyyy</div>
            <div className={styles.standardName1}>Standard Name</div>
            <div className={styles.amountContainer}>
              <div className={styles.amountDetails}>
                <div className={styles.valueBox}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon1}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <Image
              className={styles.projectListing2Child}
              loading="lazy"
              width={30}
              height={30}
              alt=""
              src="/ellipse-91@2x.png"
            />
          </div>
          <div className={styles.accordionContent} />
          <div className={styles.div3} />
        </div>
        <div
          className={styles.projectRows1}
          data-acc-item
          data-acc-header
          data-acc-original
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing3}>
            <div className={styles.frameParent7}>
              <div className={styles.projectTypeParent}>
                <div className={styles.projectType4}>Project Type</div>
                <div
                  className={styles.viewProject2}
                  role="button"
                  onClick={onViewProjectTextClick}
                >
                  View Project
                </div>
                <div className={styles.logoParent}>
                  <Image
                    className={styles.logoIcon}
                    loading="lazy"
                    width={33}
                    height={33}
                    alt=""
                    src="/logo-11@2x.png"
                  />
                  <div className={styles.titleContainer}>
                    <div className={styles.projectTitle}>Project Title</div>
                  </div>
                  <div className={styles.date}>
                    <div className={styles.yyyy}>yyyy</div>
                  </div>
                  <div className={styles.period}>
                    <div className={styles.range}>
                      <div className={styles.yyyy1}>yyyy</div>
                      <div className={styles.term}>
                        <div className={styles.standardName}>Standard Name</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.frameParent8}>
                <div className={styles.instanceFrame}>
                  <Image
                    className={styles.pinChild}
                    loading="lazy"
                    width={30}
                    height={30}
                    alt=""
                    src="/ellipse-9-21@2x.png"
                  />
                </div>
                <div className={styles.wrapper3}>
                  <div className={styles.place}>00023</div>
                </div>
                <div className={styles.frameWrapper3}>
                  <div className={styles.country}>
                    <div className={styles.asiaindia3}>Asia/India</div>
                    <div className={styles.delimiter}>20,000</div>
                  </div>
                </div>
                <div className={styles.frameWrapper4}>
                  <div className={styles.token}>
                    <div className={styles.ada3}>20 ADA</div>
                    <div className={styles.frameParent9}>
                      <div className={styles.valueBox}>
                        <div className={styles.x00022580dhmdkd}>
                          x00022580dhmdkd
                        </div>
                      </div>
                      <Image
                        className={styles.copyIcon3}
                        width={23}
                        height={23}
                        alt=""
                        src="/copy@2x.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Image
              className={styles.linesIcon3}
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
          </div>
        </div>
        <div
          className={styles.frame141Open}
          data-acc-item
          data-acc-open
          data-acc-header
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing2}>
            <Image
              className={styles.linesIcon1}
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
            <div className={styles.asiaindia4}>Project Type</div>
            <div className={styles.details}>20,000</div>
            <div className={styles.accordionContent1} data-acc-content>
              <div className={styles.container}>
                <div className={styles.type}>
                  <div className={styles.projectType1}>Project Type</div>
                </div>
              </div>
            </div>
            <div className={styles.projectListing1}>
              <Image
                className={styles.linesIcon2}
                width={1102}
                height={1}
                alt=""
                src="/lines-11.svg"
              />
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.projectType2}>Project Type</div>
                  <div
                    className={styles.viewProject}
                    role="button"
                    onClick={onViewProjectTextClick}
                  >
                    View Project
                  </div>
                  <div className={styles.visual}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={33}
                      height={33}
                      alt=""
                      src="/logo-11@2x.png"
                    />
                    <div className={styles.titleContainer}>
                      <div className={styles.projectTitle}>Project Title</div>
                    </div>
                    <div className={styles.date}>
                      <div className={styles.yyyy}>yyyy</div>
                    </div>
                    <div className={styles.period}>
                      <div className={styles.range}>
                        <div className={styles.yyyy1}>yyyy</div>
                        <div className={styles.term}>
                          <div className={styles.standardName}>
                            Standard Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.geolocation}>
                    <div className={styles.pin}>
                      <Image
                        className={styles.pinChild}
                        loading="lazy"
                        width={30}
                        height={30}
                        alt=""
                        src="/ellipse-91@2x.png"
                      />
                    </div>
                    <div className={styles.coordinates}>
                      <div className={styles.place}>00023</div>
                    </div>
                    <div className={styles.asiaindiaContainer}>
                      <div className={styles.asiaindia1}>Asia/India</div>
                    </div>
                    <div className={styles.coordinates2}>
                      <div className={styles.div}>20,000</div>
                    </div>
                  </div>
                </div>
                <div className={styles.currency}>
                  <div className={styles.ada}>20 ADA</div>
                </div>
              </div>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>
                <div className={styles.ada}>20 ADA</div>
              </div>
              <div className={styles.total}>
                <div className={styles.breakdown}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <div className={styles.projectTitle1}>Project Title</div>
            <div className={styles.link}>
              <div
                className={styles.viewProject1}
                role="button"
                onClick={onViewProjectTextClick}
              >
                View Project
              </div>
            </div>
            <Image
              className={styles.logoIcon1}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
            <div className={styles.spacer}>00023</div>
            <div className={styles.yyyy2}>yyyy</div>
            <div className={styles.yyyy3}>yyyy</div>
            <div className={styles.standardName1}>Standard Name</div>
            <div className={styles.amountContainer}>
              <div className={styles.amountDetails}>
                <div className={styles.valueBox}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon1}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <Image
              className={styles.projectListing2Child}
              loading="lazy"
              width={30}
              height={30}
              alt=""
              src="/ellipse-91@2x.png"
            />
          </div>
          <div className={styles.accordionContent} />
          <div className={styles.div3} />
        </div>
        <div
          className={styles.record}
          data-acc-item
          data-acc-header
          data-acc-original
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing5}>
            <div className={styles.fields}>
              <div className={styles.data}>
                <div className={styles.valueBox}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon3}
                  loading="lazy"
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
              <div className={styles.metadata}>
                <div className={styles.projectType4}>Project Type</div>
                <div
                  className={styles.viewProject2}
                  role="button"
                  onClick={onViewProjectTextClick}
                >
                  View Project
                </div>
                <div className={styles.logoParent}>
                  <Image
                    className={styles.logoIcon}
                    loading="lazy"
                    width={33}
                    height={33}
                    alt=""
                    src="/logo-11@2x.png"
                  />
                  <div className={styles.titleContainer}>
                    <div className={styles.projectTitle}>Project Title</div>
                  </div>
                  <div className={styles.date}>
                    <div className={styles.yyyy}>yyyy</div>
                  </div>
                  <div className={styles.period}>
                    <div className={styles.range}>
                      <div className={styles.yyyy1}>yyyy</div>
                      <div className={styles.term}>
                        <div className={styles.standardName}>Standard Name</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.pricing}>
                <div className={styles.locationMarker}>
                  <Image
                    className={styles.pinChild}
                    loading="lazy"
                    width={30}
                    height={30}
                    alt=""
                    src="/ellipse-9-31@2x.png"
                  />
                </div>
                <div className={styles.tokenDetails}>
                  <div className={styles.place}>00023</div>
                </div>
                <div className={styles.regionInfo}>
                  <div className={styles.country}>
                    <div className={styles.asiaindia3}>Asia/India</div>
                    <div className={styles.delimiter}>20,000</div>
                  </div>
                </div>
                <div className={styles.tokenDetails1}>
                  <div className={styles.ada}>20 ADA</div>
                </div>
              </div>
            </div>
            <Image
              className={styles.linesIcon3}
              loading="lazy"
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
          </div>
        </div>
        <div
          className={styles.frame141Open}
          data-acc-item
          data-acc-open
          data-acc-header
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing2}>
            <Image
              className={styles.linesIcon1}
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
            <div className={styles.asiaindia10}>x00022580dhmdkd</div>
            <div className={styles.details}>20,000</div>
            <div className={styles.accordionContent1} data-acc-content>
              <div className={styles.container}>
                <div className={styles.type}>
                  <div className={styles.projectType1}>Project Type</div>
                </div>
              </div>
            </div>
            <div className={styles.projectListing1}>
              <Image
                className={styles.linesIcon2}
                width={1102}
                height={1}
                alt=""
                src="/lines-11.svg"
              />
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.projectType2}>Project Type</div>
                  <div
                    className={styles.viewProject}
                    role="button"
                    onClick={onViewProjectTextClick}
                  >
                    View Project
                  </div>
                  <div className={styles.visual}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={33}
                      height={33}
                      alt=""
                      src="/logo-11@2x.png"
                    />
                    <div className={styles.titleContainer}>
                      <div className={styles.projectTitle}>Project Title</div>
                    </div>
                    <div className={styles.date}>
                      <div className={styles.yyyy}>yyyy</div>
                    </div>
                    <div className={styles.period}>
                      <div className={styles.range}>
                        <div className={styles.yyyy1}>yyyy</div>
                        <div className={styles.term}>
                          <div className={styles.standardName}>
                            Standard Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.geolocation}>
                    <div className={styles.pin}>
                      <Image
                        className={styles.pinChild}
                        loading="lazy"
                        width={30}
                        height={30}
                        alt=""
                        src="/ellipse-91@2x.png"
                      />
                    </div>
                    <div className={styles.coordinates}>
                      <div className={styles.place}>00023</div>
                    </div>
                    <div className={styles.asiaindiaContainer}>
                      <div className={styles.asiaindia1}>Asia/India</div>
                    </div>
                    <div className={styles.coordinates2}>
                      <div className={styles.div}>20,000</div>
                    </div>
                  </div>
                </div>
                <div className={styles.currency}>
                  <div className={styles.ada}>20 ADA</div>
                </div>
              </div>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>
                <div className={styles.ada}>20 ADA</div>
              </div>
              <div className={styles.total}>
                <div className={styles.breakdown}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <div className={styles.projectTitle1}>Project Title</div>
            <div className={styles.link}>
              <div
                className={styles.viewProject1}
                role="button"
                onClick={onViewProjectTextClick}
              >
                View Project
              </div>
            </div>
            <Image
              className={styles.logoIcon1}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
            <div className={styles.spacer}>00023</div>
            <div className={styles.yyyy2}>yyyy</div>
            <div className={styles.yyyy3}>yyyy</div>
            <div className={styles.standardName1}>Standard Name</div>
            <div className={styles.amountContainer}>
              <div className={styles.amountDetails}>
                <div className={styles.valueBox}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon1}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <Image
              className={styles.projectListing2Child}
              loading="lazy"
              width={30}
              height={30}
              alt=""
              src="/ellipse-91@2x.png"
            />
          </div>
          <div className={styles.accordionContent} />
          <div className={styles.div3} />
        </div>
        <div
          className={styles.projectItem}
          data-acc-item
          data-acc-header
          data-acc-original
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing6}>
            <div className={styles.frameParent}>
              <div className={styles.projectTypeParent}>
                <div className={styles.projectType4}>Project Type</div>
                <div
                  className={styles.viewProject2}
                  role="button"
                  onClick={onViewProjectTextClick}
                >
                  View Project
                </div>
                <div className={styles.logoParent}>
                  <Image
                    className={styles.logoIcon}
                    loading="lazy"
                    width={33}
                    height={33}
                    alt=""
                    src="/logo-11@2x.png"
                  />
                  <div className={styles.titleContainer}>
                    <div className={styles.projectTitle}>Project Title</div>
                  </div>
                  <div className={styles.date}>
                    <div className={styles.standardName}>yyyy</div>
                  </div>
                  <div className={styles.period}>
                    <div className={styles.range}>
                      <div className={styles.yyyy1}>yyyy</div>
                      <div className={styles.term}>
                        <div className={styles.standardName}>Standard Name</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.frameGroup}>
                  <div className={styles.instanceWrapper}>
                    <Image
                      className={styles.pinChild}
                      loading="lazy"
                      width={30}
                      height={30}
                      alt=""
                      src="/ellipse-91@2x.png"
                    />
                  </div>
                  <div className={styles.wrapper}>
                    <div className={styles.place}>00023</div>
                  </div>
                  <div className={styles.asiaindiaWrapper}>
                    <div className={styles.asiaindia1}>Asia/India</div>
                  </div>
                  <div className={styles.frame}>
                    <div className={styles.div}>20,000</div>
                  </div>
                </div>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.frameDiv}>
                  <div className={styles.price}>
                    <div className={styles.ada}>20 ADA</div>
                  </div>
                  <div className={styles.total}>
                    <div className={styles.valueBox}>
                      <div className={styles.x00022580dhmdkd}>
                        x00022580dhmdkd
                      </div>
                    </div>
                    <Image
                      className={styles.copyIcon2}
                      loading="lazy"
                      width={23}
                      height={23}
                      alt=""
                      src="/copy@2x.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Image
              className={styles.linesIcon3}
              loading="lazy"
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
          </div>
        </div>
        <div
          className={styles.frame141Open}
          data-acc-item
          data-acc-open
          data-acc-header
          role="button"
          onClick={onAccordionHeaderClick}
        >
          <div className={styles.projectListing2}>
            <Image
              className={styles.linesIcon1}
              width={1102}
              height={1}
              alt=""
              src="/lines-11.svg"
            />
            <div className={styles.asiaindia4}>Project Type</div>
            <div className={styles.details}>20,000</div>
            <div className={styles.accordionContent1} data-acc-content>
              <div className={styles.container}>
                <div className={styles.type}>
                  <div className={styles.projectType1}>Project Type</div>
                </div>
              </div>
            </div>
            <div className={styles.projectListing1}>
              <Image
                className={styles.linesIcon2}
                width={1102}
                height={1}
                alt=""
                src="/lines-11.svg"
              />
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.projectType2}>Project Type</div>
                  <div
                    className={styles.viewProject}
                    role="button"
                    onClick={onViewProjectTextClick}
                  >
                    View Project
                  </div>
                  <div className={styles.visual}>
                    <Image
                      className={styles.logoIcon}
                      loading="lazy"
                      width={33}
                      height={33}
                      alt=""
                      src="/logo-11@2x.png"
                    />
                    <div className={styles.titleContainer}>
                      <div className={styles.projectTitle}>Project Title</div>
                    </div>
                    <div className={styles.date}>
                      <div className={styles.yyyy}>yyyy</div>
                    </div>
                    <div className={styles.period}>
                      <div className={styles.range}>
                        <div className={styles.yyyy1}>yyyy</div>
                        <div className={styles.term}>
                          <div className={styles.standardName}>
                            Standard Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.geolocation}>
                    <div className={styles.pin}>
                      <Image
                        className={styles.pinChild}
                        loading="lazy"
                        width={30}
                        height={30}
                        alt=""
                        src="/ellipse-91@2x.png"
                      />
                    </div>
                    <div className={styles.coordinates}>
                      <div className={styles.place}>00023</div>
                    </div>
                    <div className={styles.asiaindiaContainer}>
                      <div className={styles.asiaindia1}>Asia/India</div>
                    </div>
                    <div className={styles.coordinates2}>
                      <div className={styles.div}>20,000</div>
                    </div>
                  </div>
                </div>
                <div className={styles.currency}>
                  <div className={styles.ada}>20 ADA</div>
                </div>
              </div>
            </div>
            <div className={styles.cost}>
              <div className={styles.price}>
                <div className={styles.ada}>20 ADA</div>
              </div>
              <div className={styles.total}>
                <div className={styles.breakdown}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <div className={styles.projectTitle1}>Project Title</div>
            <div className={styles.link}>
              <div
                className={styles.viewProject1}
                role="button"
                onClick={onViewProjectTextClick}
              >
                View Project
              </div>
            </div>
            <Image
              className={styles.logoIcon1}
              loading="lazy"
              width={33}
              height={33}
              alt=""
              src="/logo-11@2x.png"
            />
            <div className={styles.spacer}>00023</div>
            <div className={styles.yyyy2}>yyyy</div>
            <div className={styles.yyyy3}>yyyy</div>
            <div className={styles.standardName1}>Standard Name</div>
            <div className={styles.amountContainer}>
              <div className={styles.amountDetails}>
                <div className={styles.valueBox}>
                  <div className={styles.x00022580dhmdkd}>x00022580dhmdkd</div>
                </div>
                <Image
                  className={styles.copyIcon1}
                  width={23}
                  height={23}
                  alt=""
                  src="/copy@2x.png"
                />
              </div>
            </div>
            <Image
              className={styles.projectListing2Child}
              loading="lazy"
              width={30}
              height={30}
              alt=""
              src="/ellipse-91@2x.png"
            />
          </div>
          <div className={styles.accordionContent} />
          <div className={styles.div3} />
        </div>
      </div>
    </div>
  );
};

Background1.propTypes = {
  className: PropTypes.string,
};

export default Background1;
