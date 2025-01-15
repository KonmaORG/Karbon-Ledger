"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Paper, styled, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./project-list-card.module.css";
import { useWallet } from "@/context/walletContext";
import { Data, toText, UTxO } from "@lucid-evolution/lucid";
import { PID_MINTER, VALIDATOR_CONTRACT_ADDRESS } from "@/config/constants";
import { acceptProject, rejectProject } from "@/lib/transactions";
import { KarbonDatum } from "@/types/cardano";
import Link from "next/link";

const PROJECTS = [
  {
    id: "00023",
    title: "Project Title 1",
    type: "Project Type",
    location: "Asia/India",
    area: "20,000",
    price: "20 ADA",
    vintageFrom: "2022",
    vintageTo: "2023",
    standard: "Standard Name",
    logoSrc: "/logo-11@2x.png",
  },
  // Add more sample projects here...
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  width: "1132px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 17,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 3.5px 5.5px rgba(0, 0, 0, 0.02)",
    backgroundColor: theme.palette.background.paper,
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: "bold",
  lineHeight: "150%",
  color: theme.palette.text.secondary,
}));

const CertificateListCard = () => {
  const router = useRouter();

  const onViewProject = useCallback(
    (id: string) => {
      router.push("/project-detail-page-admin");
    },
    [router],
  );

  const onApprove = useCallback((id: string) => {
    console.log(`Approved project ${id}`);
  }, []);

  const onReject = useCallback((id: string) => {
    console.log(`Rejected project ${id}`);
  }, []);

  // ==============================================
  const [walletConnection] = useWallet();
  const { lucid } = walletConnection;
  const [projects, setProjects] = useState<UTxO[]>([]);

  useEffect(() => {
    if (!lucid) return;
    const fetchUtxos = async () => {
      const utxos = await lucid.utxosAt(VALIDATOR_CONTRACT_ADDRESS);
      const filteredUtxos = utxos.filter((utxo) => {
        const assets = utxo.assets;
        return Object.keys(assets).some((key) => key.startsWith(PID_MINTER));
      });

      setProjects(utxos);
    };
    fetchUtxos();
  }, [lucid]);

  return (
    <div className={styles.projectListCard}>
      {projects.map((utxo) => {
        return (
          <div key={utxo.txHash + utxo.outputIndex} className="space-x-2">
            <span>
              {utxo.txHash}#{utxo.outputIndex}
            </span>
          </div>
        );
      })}
      <StyledPaper elevation={3}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ position: "relative", zIndex: 1 }}
        >
          Projects
        </Typography>
        <Box
          display="flex"
          fontWeight="bold"
          py={2}
          borderBottom="2px solid #000"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <HeaderTypography sx={{ width: "20%" }}>Project</HeaderTypography>
          <HeaderTypography sx={{ width: "10%" }}>
            Project Type
          </HeaderTypography>
          <HeaderTypography sx={{ width: "10%" }}>Standard</HeaderTypography>
          <HeaderTypography sx={{ width: "10%" }}>
            Vintage From
          </HeaderTypography>
          <HeaderTypography sx={{ width: "10%" }}>Vintage To</HeaderTypography>
          <HeaderTypography sx={{ width: "10%" }}>
            Region, Country
          </HeaderTypography>
          <HeaderTypography sx={{ width: "5%" }}>Qty</HeaderTypography>
          <HeaderTypography sx={{ width: "5%" }}>
            Price per unit
          </HeaderTypography>
          <HeaderTypography sx={{ width: "10%" }}>
            Certificate Hash
          </HeaderTypography>
        </Box>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {projects.map((project, i) => (
            <ProjectItem key={i} project={project} />
          ))}
        </Box>
      </StyledPaper>
    </div>
  );
};

export default CertificateListCard;

interface ProjectItemProps {
  project: UTxO;
}

const ItemTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  lineHeight: "140%",
  color: theme.palette.text.secondary,
}));

const ActionButton = styled(Button)(({ theme, color }) => ({
  borderRadius: theme.shape.borderRadius,
  fontSize: theme.typography.pxToRem(12),
  padding: theme.spacing(0.5, 1),
  minWidth: 76,
  height: 26,
}));

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [walletConnection] = useWallet();
  const { lucid } = walletConnection;
  const [rejecting, setRejecting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [datum, setDatum] = useState<KarbonDatum | undefined>(undefined);
  // async function handleReject(utxo: UTxO) {
  //   setRejecting(true);
  //   try {
  //     await rejectProject(walletConnection, utxo);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setRejecting(false);
  // }

  // async function handleAccept(utxo: UTxO) {
  //   setSubmitting(true);
  //   try {
  //     await acceptProject(walletConnection, utxo);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   setSubmitting(false);
  // }

  useEffect(() => {
    async function fetchDatum() {
      if (!lucid) return;
      const data = await lucid.datumOf(project);
      const datum = Data.castFrom(data, KarbonDatum);
      console.log(datum);
      setDatum(datum);
    }
    fetchDatum();
  }, [lucid]);
  return (
    datum && (
      <Box
        display="flex"
        alignItems="center"
        py={2}
        borderBottom="1px solid #e0e0e0"
      >
        <Box sx={{ width: "20%", display: "flex", alignItems: "center" }}>
          <Image
            src={PROJECTS[0].logoSrc}
            alt={PROJECTS[0].title}
            width={30}
            height={30}
            style={{ borderRadius: "4px" }}
          />
          <ItemTypography ml={1}>{toText(datum.asset_name)}</ItemTypography>
        </Box>
        <ItemTypography sx={{ width: "10%" }}>
          {toText(datum.categories)}
        </ItemTypography>
        <ItemTypography sx={{ width: "10%" }}>
          {PROJECTS[0].standard}
        </ItemTypography>
        <ItemTypography sx={{ width: "10%" }}>
          {PROJECTS[0].vintageFrom}
        </ItemTypography>
        <ItemTypography sx={{ width: "10%" }}>
          {PROJECTS[0].vintageTo}
        </ItemTypography>
        <ItemTypography sx={{ width: "10%" }}>
          {PROJECTS[0].location}
        </ItemTypography>
        <ItemTypography sx={{ width: "5%" }}>{PROJECTS[0].area}</ItemTypography>
        <ItemTypography sx={{ width: "5%" }}>
          {Number(datum.fees_amount) / 1000000}
        </ItemTypography>
        <Box
          sx={{
            width: "10%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link
            href={`https://preview.cexplorer.io/tx/${project.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ItemTypography sx={{ width: "10%" }}>
              {project.txHash.slice(0, 13)}
            </ItemTypography>
          </Link>
          {/* <ActionButton
            variant="contained"
            onClick={() => handleAccept(project)}
            disabled={submitting}
          >
            {submitting ? "Accepting..." : "Accept"}
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="error"
            onClick={() => {
              handleReject(project);
            }}
            disabled={rejecting}
          >
            {rejecting ? "Rejecting..." : "Reject"}
          </ActionButton> */}
          {/* <ActionButton
          variant="contained"
          color="primary"
          onClick={() => PROJECTS[0].onApprove(id)}
        >
          Approve
        </ActionButton>
        <ActionButton
          variant="outlined"
          color="secondary"
          onClick={() => PROJECTS[0].onReject(id)}
        >
          Reject
        </ActionButton> */}
        </Box>
      </Box>
    )
  );
};
