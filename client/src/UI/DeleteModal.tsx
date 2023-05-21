import React, { useState } from "react";
import { Box, Modal, Fade, Button, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface DeleteModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  id: number;
  onDelete: (id: number) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isModal,
  setIsModal,
  title,
  id,
  onDelete,
}) => {
  const [deleteIsActive, setDeleteIsActive] = useState(false);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModal}
      onClose={() => setIsModal(false)}
      closeAfterTransition
    >
      <Fade in={isModal}>
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete Picture
            </Typography>
            <Close onClick={() => setIsModal(false)} />
          </div>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Are you sure? The &#171;{title}&#187; picture will be deleted
            forever
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteIsActive}
                  onChange={() => setDeleteIsActive((prev) => !prev)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Delete the picture"
            />
          </Typography>
          <div style={{ marginTop: "20px", float: "right" }}>
            <Button
              size="small"
              style={{ marginRight: "10px" }}
              onClick={() => setIsModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              disabled={!deleteIsActive}
              onClick={() => {
                onDelete(id);
                setDeleteIsActive(false);
                setIsModal(false);
              }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
