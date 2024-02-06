import * as yup from "yup";

const RegistrationVS = yup.object().shape({
  email: yup
    .string()
    .required("Email Required")
    .email("Invalid Email")
    .label("email"),
  username: yup
    .string()
    .required("Username Required")
    .min(4, "Username Too Short")
    .label("username"),
  role: yup.string().required("Role is Required").label("role"),
});

const EditProfileVS = yup.object().shape({
  bio: yup.string().required("Bio is Required").label("bio"),
});
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "video/mp4",
  "audio/mp3",
  "video/mov",
  "video/wmv",
  "video/avi",
  "audio/mpeg",
];
const CreateCollectionSchema = yup.object().shape({
  profileImage: yup
    .mixed()
    .required("Profile Image is required")
    .test("fileFormat", "Please Add Only Image", function (value) {
      return SUPPORTED_FORMATS.includes(value?.type);
    })
    // .test("fileSize", "File Size is too large", (value) => {
    //   const sizeInBytes = 500000; //0.5MB
    //   return value?.size <= sizeInBytes;
    // })
    .label("profileImage"),
  coverImage: yup
    .mixed()
    .required("Banner Image is required")
    .test("fileFormat", " [Incorrect file tye]", function (value) {
      return SUPPORTED_FORMATS.includes(value?.type);
    })
    // .test("fileSize", "File Size is too large", (value) => {
    //   const sizeInBytes = 500000; //0.5MB
    //   return value?.size <= sizeInBytes;
    // })
    .label("coverImage"),
  name: yup
    .string()
    .required("Collection Name is Required")
    .min(4, "Collection Name Too Short")
    .label("name"),
  symbol: yup
    .string()
    .required("Collection Symbol is Required")
    .min(2, "Collection Symbol Too Short")
    .label("symbol"),
  description: yup
    .string()
    .required("Collection Description is Required")
    .min(4, "Collection Description Too Short")
    .label("description"),
});
const imageWidthAndHeight = (provideFile) => {
  // take the given file (which should be an image) and return the width and height
  const imgDimensions = { width: null, height: null };

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(provideFile);
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;

      img.onload = function () {
        imgDimensions.width = img.width;
        imgDimensions.height = img.height;

        resolve(imgDimensions);
      };
    };
  });
};
const imageDimensionCheck = yup.addMethod(
  yup.mixed,
  "imageDimensionCheck",
  function (message, requiredWidth, requiredHeight) {
    return this.test(
      "image-width-height-check",
      message,
      async function (value) {
        const { path, createError } = this;
        var Type = value?.type.substr(0, 5);
        if (!value) {
          return;
        }
        if (Type == "image") {
          const imgDimensions = await imageWidthAndHeight(value);

          if (imgDimensions.width !== imgDimensions.height) {
            return createError({
              path,
              message: `Image width and height needs to be the same`,
            });
          }
          if (imgDimensions.width <= requiredWidth) {
            return createError({
              path,
              message: `Image width and height must be the greater than ${requiredWidth}px`,
            });
          }
          return true;
        } else {
          return true;
        }

        // if (imgDimensions.height !== requiredHeight) {
        //   return createError({
        //     path,
        //     message: `The file height needs to be the ${requiredHeight}px!`,
        //   });
        // }
      }
    );
  }
);
const SUBMIT_NFT_SCHEMA = yup.object().shape({
  image: yup
    .mixed()
    .required("Art Image is required")
    .test("fileFormat", "Please Provide The Correct Format", function (value) {
      console.log("validation", value);
      return SUPPORTED_FORMATS.includes(value?.type);
    })
    .imageDimensionCheck("test", 200, 200),
  name: yup
    .string()
    .required("Art Name is Required")
    .min(4, "Art Name Too Short")
    .label("name"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price Must Be Greater than 0")
    .label("price"),

  description: yup
    .string()
    .required("Art Description is Required")
    .min(4, "Art Description Too Short")
    .label("description"),
});
const SUPPORT_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .required("Email Required")
    .email("Invalid Email")
    .label("email"),
  message: yup
    .string()
    .required("Message is Required")
    .min(5, "Message Too Short")
    .label("message"),
});
export {
  RegistrationVS,
  EditProfileVS,
  CreateCollectionSchema,
  SUBMIT_NFT_SCHEMA,
  SUPPORT_VALIDATION_SCHEMA,
};
