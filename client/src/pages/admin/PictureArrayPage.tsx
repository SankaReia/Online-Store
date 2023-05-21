import {
  DialogTitle,
  Box,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { Edit, DeleteForever } from "@mui/icons-material/";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import useAdmin from "../../hooks/useAdmin";
// import { useTypedSelector } from "../../store/hooks/useTypedSelector";
// import { TechnicState } from "../../store/slices/technicSlice";
import DeleteModal from "../../UI/DeleteModal";
// import Loader from "../../UI/Loader";
// import { adminConsts } from "../../utils/routsConsts";

import { AdminConsts } from "../../utils/routsConsts";
import { useAppSelector } from "../../hooks/redux";

const PictureArrayPage: React.FC = () => {
  const pictures = useAppSelector((state) => state.pictureReducer);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({ name: "", id: 0 });
  const navigate = useNavigate();

  const deleteHandler = (id: number) => {
    // deleteTechnic(id);
  };

  return (
    <>
      <DialogTitle style={{ textAlign: "center" }}>
        List of pictures
      </DialogTitle>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3}>
          <List>
            {
              // pictures.status !== "pending" ? (
              pictures.map((picture, i) => (
                <ListItem
                  key={picture.id}
                  secondaryAction={
                    <div>
                      <IconButton
                        sx={{ mr: "5px" }}
                        aria-label="edit"
                        onClick={() =>
                          navigate(
                            AdminConsts.EDIT_PICTURE_ROUTE + "/" + picture.id
                          )
                        }
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          setModalInfo({
                            name: picture.title,
                            id: picture.id,
                          });
                          setIsModal(true);
                        }}
                      >
                        <DeleteForever />
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{i + 1}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={picture.title} />
                </ListItem>
              ))
              // ) : (
              //   <Loader />)
            }
          </List>
        </Paper>
      </Box>
      <DeleteModal
        isModal={isModal}
        setIsModal={setIsModal}
        onDelete={deleteHandler}
        title={modalInfo.name} ///////
        id={modalInfo.id} //////////
      />
    </>
  );
};

export default PictureArrayPage;
