import {
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
import TextEditor from "../../components/admin/TextEditor";
//   import useAdmin from "../../hooks/useAdmin";
//   import { useTypedDispatch } from "../../store/hooks/useTypedDispatch";
//   import { setAlert } from "../../store/slices/alertSlice";
//   import Loader from "../../UI/Loader";
//   import { technicsTypes } from "../../utils/technicsTypes";
import { categories } from "../../utils/categories";

const AddPicturePage: FC = () => {
  // const { addTechnic, isLoading } = useAdmin();
  // const dispatch = useTypedDispatch();
  const [imgFile, setImgFile] = useState<File>();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const ImageChooseHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setImgFile(event.target.files[0]);
  };

  const uploadHandler = async () => {
    // if (
    //   imgFile &&
    //   price.trim() &&
    //   name.trim() &&
    //   technicsTypes[+type]
    // ) {
    //   return addTechnic(
    //     imgFile,
    //     imgFileDescription,
    //     name,
    //     fullDescription,
    //     shortDescription,
    //     characteristic,
    //     price,
    //     technicsTypes[+type]
    //   );
    // }
    // dispatch(
    //   setAlert({
    //     severity: "error",
    //     message: "Введены не все данные",
    //   })
    // );
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
        <TextEditor text={description} setText={setDescription} />
      </div>
      <div style={{ marginTop: "10px" }}>
        {/* {!isLoading ? (
            <Button
              variant="contained"
              style={{ width: "100%" }}
              onClick={uploadHandler}
            >
              Добавить
            </Button>
          ) : (
            <Loader />
          )} */}
      </div>
    </Paper>
  );
};

export default AddPicturePage;
