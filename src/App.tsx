import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import { getBreedList, getDogsImages } from "./http/api";
import { useFormik } from "formik";
import { validation } from "./validations";

function App() {
  const [breedList, setBreedList] = useState([]);
  const [dogsList, setDogsList] = useState([]);

  const formik = useFormik({
    initialValues: {
      breed: "",
      subBreed: "",
      limit: "",
      subBreedList: [],
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      const dogs = await getDogsImages(values.breed, values.subBreed);
      if (dogs.status === "success") setDogsList(dogs.message);
    },
  });

  async function getBreedListFromAPI() {
    const breeds = await getBreedList();
    if (breeds.status === "success") setBreedList(breeds.message);
  }

  useEffect(() => {
    getBreedListFromAPI();
  }, []);

  const subBreedList = useMemo(() => {
    const list = breedList[formik.values.breed] || [];
    formik.setFieldValue("subBreedList", list);
    return list;
  }, [formik.values.breed]);

  console.log(formik);

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack rowGap={2}>
        <Header />
        <Container>
          <Stack direction="row" spacing={2}>
            <Select
              fullWidth
              size="small"
              displayEmpty
              disableUnderline
              name="breed"
              value={formik.values.breed}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.breed && Boolean(formik.errors.breed)}
            >
              <MenuItem disabled value="">
                <em>Select Breed</em>
              </MenuItem>
              {Object.keys(breedList).length
                ? Object.keys(breedList).map((breed) => (
                    <MenuItem value={breed}>{breed}</MenuItem>
                  ))
                : null}
            </Select>
            {subBreedList.length ? (
              <Select
                fullWidth
                size="small"
                displayEmpty
                disableUnderline
                name="subBreed"
                value={formik.values.subBreed}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.subBreed && Boolean(formik.errors.subBreed)
                }
              >
                <MenuItem disabled value="">
                  <em>Select Sub Breed</em>
                </MenuItem>
                {subBreedList.map((subBreed: string) => (
                  <MenuItem value={subBreed}>{subBreed}</MenuItem>
                ))}
              </Select>
            ) : null}
            <TextField
              type="number"
              name="limit"
              value={formik.values.limit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.limit && Boolean(formik.errors.limit)}
              fullWidth
              placeholder="Number of Images"
            />

            <Button fullWidth variant="contained" size="small" type="submit">
              View Images
            </Button>
          </Stack>
          <Grid container spacing={2} marginTop="2rem">
            {dogsList.length ? (
              dogsList
                .slice(0, parseInt(formik.values.limit))
                .map((imageUrl) => (
                  <Grid item>
                    <img src={imageUrl} height="100vh" width="100vw" />
                  </Grid>
                ))
            ) : (
              <Typography>No Dogs Available</Typography>
            )}
          </Grid>
        </Container>
      </Stack>
    </form>
  );
}

export default App;
