const { google } = require("googleapis");
const fs = require("@cyclic.sh/s3fs");
const stream = require("stream");

// Authenticate your app
const auth = new google.auth.GoogleAuth({
  keyFile: "secret.json",
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

// Create a client for Google Drive API
const drive = google.drive({ version: "v3", auth });

// Read the image file
const imageFile = "image.jpg";

fs.readFile(imageFile, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // ID of the folder where you want to upload the image file
  const folderId = "1SkAK09omCBOFRvK0GRXXOjE5_75FisF2";

  // // Create a new file in Google Drive
  const readable = new stream.PassThrough();
  readable.end(data);

  drive.files.create(
    {
      requestBody: {
        name: "satsaheb.jpg",
        mimeType: "image/jpg",
        parents: [folderId], // Set the ID of the folder where you want to upload the image file
      },
      media: {
        mimeType: "image/jpg",
        body: readable,
      },
    },
    (err, file) => {
      if (err) {
        console.error("Error uploading file:", err);
        return;
      }

      console.log("File uploaded:", file.data.webViewLink);
    }
  );
});
