import * as yup from "yup";

export const validation = yup.object().shape({
  breed: yup.string().required("breed is required"),
  subBreed: yup.string().when("subBreedList", (subBreedList, schema) => {
    if (subBreedList.length) {
      return yup.string().required("Sub breed is required");
    }
  }),
  limit: yup.number().required("Number of images is required"),
});
