require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());

// built-in middleware for json
app.use(express.json({ limit: "25mb" }));

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "./views", "index.html"));
});

require("./routes")(app);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message;

  return res.status(status).json({ message: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Listening on port ${PORT}...`));
