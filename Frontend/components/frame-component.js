import {
  Box,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import styles from "./frame-component.module.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.emailWrapper}>
        <div className={styles.email}>Email</div>
      </div>
      <TextField
        className={styles.email1}
        placeholder="xyzkarbonledger@gmail.com"
        variant="outlined"
        sx={{
          "& fieldset": { borderColor: "#e2e8f0" },
          "& .MuiInputBase-root": {
            height: "49.3px",
            backgroundColor: "#fff",
            borderRadius: "15px",
            fontSize: "14px",
          },
          "& .MuiInputBase-input": { color: "#a0aec0" },
        }}
      />
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
