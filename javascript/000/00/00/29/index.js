const express = require("express");
var fileupload = require("express-fileupload");

const app = express();

app.use(fileupload());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/update-profile", (req, res) => {
  let username = req.body.username;
  let userPicture = req.files.userPicture;
  console.log(userPicture);
  res.send(`
    Your username is: ${username}
    Uploaded image name is ${userPicture.name}
  `);
});

app.listen(5000, () => {
  console.log("Server started on port 3000");
});
