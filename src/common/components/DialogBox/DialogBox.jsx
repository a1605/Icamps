import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, OutlinedInput } from "@mui/material";
import { useNavigate } from "react-router";
import "./DialogBox.scss";
import { useAuth } from "../../hooks/useAuth";

export default function DialogBox({
  open,
  handleClose,
  DialogBoxTitle,
  InputFeildTitle,
  handleSubmitDialogBox,
  placeholder,
  DialogBoxValue,
  setDialogBoxValue,
  name,
}) {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const handleCloseBox = () => navigate(handleClose);
  return (
    <div className="dialog-box-container">
      <Dialog open={open} onClose={handleCloseBox} fullWidth>
        <Box>
          <DialogTitle sx={{ fontWeight: 600 }}>{DialogBoxTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ paddingBottom: "5px" }}>
              {InputFeildTitle}
            </DialogContentText>
            <OutlinedInput
              autoFocus
              id="outlined-basic"
              variant="outlined"
              placeholder={placeholder}
              size="small"
              fullWidth
              value={DialogBoxValue}
              autoComplete="off"
              name={name}
              onChange={(e) =>
                setDialogBoxValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                color: "#6567dc",
                marginBottom: "20px",
                textTransform: "capitalize",
                minWidth: "100px",
                height: "40px",
              }}
              onClick={handleCloseBox}
            >
              Cancel
            </Button>
            <Button
              className="submit-button-dialogBox"
              variant="contained"
              onClick={handleSubmitDialogBox}
              disabled={DialogBoxValue === ""}
            >
              {loading ? (
                <CircularProgress
                  color="inherit"
                  size="18px"
                  variant="indeterminate"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
