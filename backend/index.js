const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
//Available routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Inotebook:Backend listening at http://localhost:${port}`);
});
