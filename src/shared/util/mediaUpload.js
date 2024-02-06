const ImageUpload = (e, callback) => {
  // console.log(e?.target?.files[0].type.substr(0, 5));
  var Type = e?.target?.files[0]?.type.substr(0, 5);
  if (e?.target?.files[0] === undefined) {
    callback(false);
  } else if (Type === "image") {
    callback(e.target.files[0]);
  } else if (Type === "video") {
    callback(e.target.files[0]);
  } else {
    callback(false);
  }
};
const ArtUploadImage = (e, callback) => {
  // console.log(e?.target?.files[0].type.substr(0, 5));
  var Type = e?.target?.files[0]?.type;
  var MediaType = e?.target?.files[0]?.type.substr(0, 5);
  console.log(MediaType);
  if (SUPPORTED_FORMATS.includes(Type)) {
    callback(true, MediaType);
  } else {
    callback(false, MediaType);
  }
};
// function convertUTCDateToLocalDate() {
//   let newDate = new Date(
//     new Date(singleArtwork?.auction?.endTime).getTime() +
//       new Date(singleArtwork?.auction?.endTime).getTimezoneOffset() *
//         60 *
//         1000
//   );
//   let dates = new Date(singleArtwork?.auction?.endTime).getDate();
//   let offset =
//     new Date(singleArtwork?.auction?.endTime).getTimezoneOffset() / 60;
//   let hours = new Date(singleArtwork?.auction?.endTime).getHours();
//   let computeHour = parseInt(hours) + parseInt(offset);
//   newDate.setDate(dates);
//   newDate.setHours(computeHour);

//   return newDate;
// }
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "video/mp4",
  "video/mp3",
  "video/mov",
  "video/wmv",
  "video/avi",
];
export { ImageUpload, ArtUploadImage };
