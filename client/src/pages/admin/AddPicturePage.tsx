import {
  Box,
  Button,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { FC, useState } from "react";
import ImageChanger from "../../components/admin/ImageChanger";
import { categories } from "../../utils/categories";
import { createPicture } from "../../http/pictureApi";
//   import Loader from "../../UI/Loader";

const AddPicturePage: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState("");

  const ImageChooseHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImgFile(event.target.files[0]);
  };

  const uploadHandler = async () => {
    if (imgFile && price.trim() && title.trim() && category) {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("img", imgFile);
      formData.append("description", description);
      formData.append("category", category);

      setMessage("Added successfully");
      setIsAdded(true);
      return createPicture(formData);
    }
    setMessage("Not all data is entered");
    setIsAdded(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsAdded(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Paper elevation={3} sx={{ p: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Add picture</DialogTitle>
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

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <ImageChanger
          imgFile={imgFile}
          changeHandler={ImageChooseHandler}
          width={225}
          height={120}
          title={"Choose Picture"}
        />
      </div>
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
          label="Multiline"
          multiline
          value={description}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        {/* {!isLoading ? (
            <Button
              variant="contained"
              style={{ width: "100%" }}
              onClick={uploadHandler}
            >
              Add
            </Button>
          ) : (
            <Loader />
          )} */}

        <Button variant="contained" fullWidth onClick={uploadHandler}>
          Add
        </Button>
      </div>
      <Snackbar
        open={isAdded}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </Paper>
  );
};

export default AddPicturePage;
