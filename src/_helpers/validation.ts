import * as Yup from "yup";

const requiredString = Yup.string().required();
const requiredNumber = Yup.number().required();

export const formSchema = Yup.object().shape({
  isIntermediate: Yup.boolean(),
  originCity: requiredString,
  intermediateCities: Yup.array().when("isIntermediate", {
    is: true,
    then: Yup.array().min(1).required(),
  }),
  destinationCity: requiredString,
  date: Yup.string().required(),
  numberOfPeople: requiredNumber,
});
