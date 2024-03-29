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
import DeleteModal from "../../components/DeleteModal";
import Loader from "../../UI/Loader";
import { AdminConsts } from "../../utils/routsConsts";
import { pictureAPI } from "../../services/PictureService";

const PictureArrayPage: React.FC = () => {
  const [deletePicture, {}] = pictureAPI.useDeletePictureMutation();

  const { data: pictures, isLoading } = pictureAPI.useFetchAllPicturesQuery("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState({ name: "", id: 0 });
  const navigate = useNavigate();

  const deleteHandler = (id: number) => {
    try {
      deletePicture(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogTitle style={{ textAlign: "center" }}>
        List of pictures
      </DialogTitle>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3}>
          {isLoading && <Loader />}
          <List sx={{ mb: 5 }}>
            {pictures?.map((picture, i) => (
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
            ))}
          </List>
        </Paper>
      </Box>
      <DeleteModal
        isModal={isModal}
        setIsModal={setIsModal}
        onDelete={deleteHandler}
        title={modalInfo.name}
        id={modalInfo.id}
      />
    </>
  );
};

export default PictureArrayPage;
