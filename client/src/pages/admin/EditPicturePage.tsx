import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader";
import ImageChanger from "../../components/admin/ImageChanger";
import { categories } from "../../utils/categories";
import { PictureI } from "../../utils/models";
import { pictureAPI } from "../../services/PictureService";

const EditPicturePage: React.FC = () => {
  const { id } = useParams();
  const { data: picture } = pictureAPI.useFetchOnePictureQuery(id as string);
  const [updatePicture, {}] = pictureAPI.useUpdatePictureMutation();

  const [defaultValue, setDefaultValue] = useState<PictureI>();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();

  useEffect(() => {
    if (picture) {
      setDefaultValue(picture);
      setTitle(picture.title);
      setPrice(picture.price);
      setDescription(picture.description);
      setCategory(picture.category);
    }
  }, [picture]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImgFile(event.target.files[0]);
  };

  const imageSaveHandler = async () => {
    if (!defaultValue) return;
    if (!imgFile) return;
  };

  const clickHandler = async () => {
    if (title.trim() && price && category) {
      const formData = new FormData();

      formData.append("id", `${id}`);
      formData.append("title", title);
      formData.append("price", `${price}`);
      formData.append("description", description);
      formData.append("category", category);

      await updatePicture(formData);
      console.log("yes");
    } else {
      console.log("no");
    }
  };

  const resetHandler = () => {
    if (!defaultValue) return;
    setTitle(defaultValue.title);
    setPrice(defaultValue.price);
    setDescription(defaultValue.description);
    setCategory(defaultValue.category);
  };

  return (
    <>
      {picture ? (
        <>
          <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
          <Paper elevation={3} sx={{ p: "15px" }}>
            <FormGroup>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                type="text"
                size="small"
                fullWidth
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
              <TextField
                id="price"
                label="Price"
                variant="outlined"
                type="number"
                size="small"
                margin="normal"
                fullWidth
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(+e.target.value)
                }
              />
              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={(event: SelectChangeEvent) =>
                      setCategory(event.target.value as string)
                    }
                    sx={{ mt: 1, height: "40px" }}
                  >
                    {categories.map(({ title }) => (
                      <MenuItem
                        key={title}
                        value={title}
                        sx={{ textTransform: "uppercase" }}
                      >
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <div style={{ marginTop: "20px", padding: "15px" }}>
                <DialogTitle
                  style={{
                    textAlign: "center",
                    margin: "0 0 5px 0",
                  }}
                >
                  Description
                </DialogTitle>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  value={description}
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </div>
            </FormGroup>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <>
                <Button variant="contained" onClick={clickHandler} size="large">
                  Save
                </Button>
                <Button onClick={resetHandler}>Cancel</Button>
              </>
            </Box>
          </Paper>
          {/* {defaultValue && (
            <Paper
              elevation={3}
              sx={{
                mt: 3,
                p: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ImageChanger
                imgFile={imgFile}
                changeHandler={changeHandler}
                width={225}
                height={120}
                title={"Choose Picture"}
                url={process.env.REACT_APP_API_URL + defaultValue.img}
              />
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                onClick={imageSaveHandler}
              >
                Save
              </Button>
            </Paper>
          )} */}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EditPicturePage;
