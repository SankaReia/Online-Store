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
// import useAdmin from "../../hooks/useAdmin";
// import { useTypedSelector } from "../../store/hooks/useTypedSelector";
// import { TechnicState } from "../../store/slices/technicSlice";
// import Loader from "../../UI/Loader";
// import TextEditor from "../../components/admin/TextEditor";
// import { technicsTypes } from "../../utils/technicsTypes";
import ImageChanger from "../../components/admin/ImageChanger";
import { categories } from "../../utils/categories";

import pictures from "../../pictures";
import TextEditor from "../../components/admin/TextEditor";

const EditPicturePage: React.FC = () => {
  const { id } = useParams();
  // const { technicList, status } = useTypedSelector((state) => state.technic);
  // const { updateTechnic, updateImage, isLoading } = useAdmin();
  // const [defaultValue, setDefaultValue] = useState<TechnicState>();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [imgFile, setImgFile] = useState<File>();

  // useEffect(() => {
  //   const index = technicList.findIndex(
  //     (el: TechnicState) => el.id.toString() === id
  //   );
  //   const technic = technicList[index];
  //   setDefaultValue(technic);
  //   setName(technic.name);
  //   setPrice("" + technic.price);
  //   setShortDescription(technic.shortDescription);
  //   setFullDescription(technic.fullDescription);
  //   setCharacteristic(technic.characteristic);
  //   setType("" + technicsTypes.indexOf(technic.type));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [status]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (!event.target.files) return;
    // const name = event.target.name;
    // switch (name) {
    //   case "Изображение для карточки":
    //     setImgFile(event.target.files[0]);
    //     break;
    //   case "Изображение для описания":
    //     setImgFileDescription(event.target.files[0]);
    //     break;
    // }
  };

  const imageSaveHandler = async (type: "imgname" | "imgFileDescription") => {
    // if (!defaultValue) return;
    // if (type === "imgname") {
    //   if (!imgFile) return;
    //   await updateImage({
    //     technicId: defaultValue.id,
    //     type,
    //     imgFile: imgFile,
    //   });
    // }
    // if (type === "imgFileDescription") {
    //   if (!imgFileDescription) return;
    //   await updateImage({
    //     technicId: defaultValue.id,
    //     type,
    //     imgFile: imgFileDescription,
    //   });
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
    // if (!defaultValue) return;
    // setName(defaultValue.name);
    // setPrice("" + defaultValue.price);
    // setShortDescription(defaultValue.shortDescription);
    // setFullDescription(defaultValue.fullDescription);
    // setCharacteristic(defaultValue.characteristic);
    // setType("" + technicsTypes.indexOf(defaultValue.type));
  };

  // if (status === "pending") return <Loader />;

  return (
    <>
      <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
      <Paper elevation={3} sx={{ p: "15px" }}>
        <FormGroup>
          <TextField
            id="outlined-basic"
            label="название"
            variant="outlined"
            type="text"
            size="small"
            sx={{
              w: "100%",
            }}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <TextField
            id="price"
            label="цена"
            variant="outlined"
            type="number"
            size="small"
            margin="normal"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
          />
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Тип</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Тип"
                onChange={(event: SelectChangeEvent) =>
                  setCategory(event.target.value as string)
                }
                sx={{ mt: 1, height: "40px" }}
              >
                {categories.map(({ title }, i) => (
                  <MenuItem key={title} value={i}>
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
            <TextEditor text={description} setText={setDescription} />
          </div>
        </FormGroup>
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          {!isLoading ? (
            <>
              <Button variant="contained" onClick={clickHandler} size="large">
                Сохранить
              </Button>
              <Button onClick={resetHandler}>Отменить</Button>
            </>
          ) : (
            <Loader />
          )}
        </Box> */}
      </Paper>
      {/* {defaultValue && (
        <Paper
          elevation={3}
          sx={{
            mt: 3,
            p: "15px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <ImageChanger
              imgFile={imgFile}
              changeHandler={changeHandler}
              width={225}
              height={120}
              title={"Изображение для карточки"}
              url={`${process.env.REACT_APP_SERVERURL}/${defaultValue.imgname}`}
            />
            {!isLoading ? (
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => imageSaveHandler("imgname")}
              >
                Сохранить
              </Button>
            ) : (
              <Loader />
            )}
          </div>
          <div>
            <ImageChanger
              imgFile={imgFileDescription}
              changeHandler={changeHandler}
              width={420}
              height={420}
              title={"Изображение для описания"}
              url={`${process.env.REACT_APP_SERVERURL}/${defaultValue.imgFileDescription}`}
            />
            {!isLoading ? (
              <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                onClick={() => imageSaveHandler("imgFileDescription")}
              >
                Сохранить
              </Button>
            ) : (
              <Loader />
            )}
          </div>
        </Paper>
      )} */}
    </>
  );
};

export default EditPicturePage;
