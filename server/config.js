const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  docusign: {
    accountId: process.env.DOCUSIGN_ACCOUNT_ID,
    integrationKey: process.env.DOCUSIGN_INTEGRATION_KEY,
    userId: process.env.DOCUSIGN_USER_ID,
    redirectUri: process.env.DOCUSIGN_REDIRECT_URI,
    oAuthBasePath: "account-d.docusign.com",
    restApiBasePath: "https://demo.docusign.net/restapi",
  },
  session: {
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  },
};

module.exports = config;
