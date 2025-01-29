const express = require("express");
const cors = require("cors");
const session = require("express-session");
const config = require("./config");
const docusignRoutes = require("./routes/docusign.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(session(config.session));

app.use("/api/docusign", docusignRoutes);

app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);
