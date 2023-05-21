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
// import Loader from "../../UI/Loader";

import ImageChanger from "../../components/admin/ImageChanger";
import { categories } from "../../utils/categories";
import { fetchOnePicture } from "../../http/pictureApi";
import { PictureI } from "../../store/slices/pictureSlice";

const EditPicturePage: React.FC = () => {
  const { id } = useParams();
  // const { technicList, status } = useTypedSelector((state) => state.technic);
  // const { updateTechnic, updateImage, isLoading } = useAdmin();
  const [defaultValue, setDefaultValue] = useState<PictureI>();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();

  useEffect(() => {
    if (id) {
      fetchOnePicture(id).then(([picture]) => setDefaultValue(picture));
    }
  }, [id]);

  useEffect(() => {
    if (defaultValue) {
      setTitle(defaultValue.title);
      setPrice(defaultValue.price);
      setDescription(defaultValue.description);
      setCategory(defaultValue.category);
    }
  }, [defaultValue]);

  if (!defaultValue) {
    return <div>Loading</div>;
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImgFile(event.target.files[0]);
  };

  const imageSaveHandler = async () => {
    if (!defaultValue) return;
    if (!imgFile) return;
    //   await updateImage({
    //     technicId: defaultValue.id,
    //     type,
    //     imgFile: imgFile,
    // }
  };

  const clickHandler = () => {
    // if (!id) return;
    // updateTechnic(+id, {
    //   name,
    //   characteristic,
    //   fullDescription,
    //   price,
    //   shortDescription,
    //   type: technicsTypes[+type],
    // });
  };

  const resetHandler = () => {
    if (!defaultValue) return;
    setTitle(defaultValue.title);
    setPrice(defaultValue.price);
    setDescription(defaultValue.description);
    setCategory(defaultValue.category);
  };

  // if (status === "pending") return <Loader />;

  return (
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
              setPrice(e.target.value)
            }
          />
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
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
          {/* {!isLoading ? ( */}
          <>
            <Button variant="contained" onClick={clickHandler} size="large">
              Save
            </Button>
            <Button onClick={resetHandler}>Cancel</Button>
          </>
          {/* ) : (
            <Loader />
          )} */}
        </Box>
      </Paper>
      {defaultValue && (
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
          {/* {!isLoading ? ( */}
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 2 }}
            onClick={imageSaveHandler}
          >
            Save
          </Button>
          {/* ) : (
              <Loader />
            )} */}
        </Paper>
      )}
    </>
  );
};

export default EditPicturePage;
