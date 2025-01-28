const dotenv = require("dotenv");
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  docusign: {
    accountId: process.env.DOCUSIGN_ACCOUNT_ID,
    integrationKey: process.env.DOCUSIGN_INTEGRATION_KEY,
    userId: process.env.DOCUSIGN_USER_ID,
    redirectUri: process.env.DOCUSIGN_REDIRECT_URI,
    oAuthBasePath:
      process.env.DOCUSIGN_OAUTH_BASE_PATH || "account-d.docusign.com",
    restApiBasePath:
      process.env.DOCUSIGN_REST_API_BASE_PATH ||
      "https://demo.docusign.net/restapi",
    callbackUrl:
      process.env.DOCUSIGN_CALLBACK_URL ||
      "http://localhost:3001/api/docusign/callback",
    returnUrl:
      process.env.DOCUSIGN_RETURN_URL ||
      "http://localhost:3001/api/docusign/callback/return",
  },
  session: {
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  },
};

module.exports = config;
