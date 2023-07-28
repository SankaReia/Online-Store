import {
  AlertColor,
  Box,
  Button,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { FC, useState } from "react";
import ImageChanger from "../../components/admin/ImageChanger";
import { categories } from "../../utils/categories";
import { pictureAPI } from "../../services/PictureService";
import MySnackbar from "../../UI/MySnackbar";

const AddPicturePage: FC = () => {
  const [createPicture, {}] = pictureAPI.useCreatePictureMutation();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("success");

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
      setAlertType("success");
      setIsAdded(true);

      await createPicture(formData);
    } else {
      setMessage("Not all data is entered");
      setAlertType("warning");
      setIsAdded(true);
    }
  };

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
          label="Description"
          multiline
          value={description}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" fullWidth onClick={uploadHandler}>
          Add
        </Button>
      </div>

      <MySnackbar
        openSnackbar={isAdded}
        message={message}
        type={alertType}
        setOpenSnackbar={setIsAdded}
      />
    </Paper>
  );
};

export default AddPicturePage;
