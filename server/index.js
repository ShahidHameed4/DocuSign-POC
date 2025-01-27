const express = require("express");
const docusign = require("docusign-esign");
const cors = require("cors");
const fs = require("fs");
const session = require("express-session");
const path = require("path");

const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const PORT = 3001;
const ACCOUNT_ID = process.env.DOCUSIGN_ACCOUNT_ID;
const INTEGRATION_KEY = process.env.DOCUSIGN_INTEGRATION_KEY;
const USER_ID = process.env.DOCUSIGN_USER_ID;
const PRIVATE_KEY = fs.readFileSync("./private.key", "utf8");
const {
  documentConfig,
  generateDocumentBase64,
} = require("./utils/documentGenerator");
const { URLSearchParams } = require("url");

const dsApi = new docusign.ApiClient();
dsApi.setOAuthBasePath("account-d.docusign.com");

// async function getConsentUrl() {
//   return dsApi.getJWTUri(
//     INTEGRATION_KEY,
//     "http://localhost:3001/callback",
//     "signature impersonation"
//   );
// }

async function getConsentUrl() {
  return `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=${INTEGRATION_KEY}&redirect_uri=${encodeURIComponent(
    "http://localhost:3001/callback/return"
  )}`;
}

async function getAccessToken() {
  try {
    const response = await dsApi.requestJWTUserToken(
      INTEGRATION_KEY,
      USER_ID,
      ["signature"],
      PRIVATE_KEY,
      3600
    );
    return response.body.access_token;
  } catch (error) {
    if (error.response?.body?.error === "consent_required") {
      const consentUrl = await getConsentUrl();
      throw { message: "consent_required", consentUrl };
    }
    throw error;
  }
}

app.get("/consent", async (req, res) => {
  try {
    const consentUrl = await getConsentUrl();
    res.json({ consentUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/callback/return", (req, res) => {
  res.send("Consent successful! You can close this window.");
});
// async function getAccessToken() {
//   const jwtLifeSec = 3600;
//   const scopes = ["signature"];

//   const dsApi = new docusign.ApiClient();
//   dsApi.setOAuthBasePath("account-d.docusign.com");

//   const response = await dsApi.requestJWTUserToken(
//     INTEGRATION_KEY,
//     USER_ID,
//     scopes,
//     PRIVATE_KEY,
//     jwtLifeSec
//   );

//   return response.body.access_token;
// }

async function getHtmlPreview(accountId, envelopeId, accessToken, doc) {
  const url = `https://demo.docusign.net/restapi/v2.1/accounts/${accountId}/envelopes/${envelopeId}/responsive_html_preview`;

  console.log(doc);
  const data = {
    source: doc, // This tells DocuSign to use the uploaded document for generating the preview
    documentId: "1", // The document ID from your envelope
    displayAnchors: [
      {
        startAnchor: "Start of Section", // Optional: Start anchor text
        endAnchor: "End of Section", // Optional: End anchor text
      },
    ],
    headerLabel: "Header text", // Optional: Header text above the preview
    maxScreenWidth: "1024px", // Optional: Max screen width for mobile view
    removeEmptyTags: "p,br", // Optional: Tags to remove if empty
    showMobileOptimizedToggle: "true", // Optional: Toggle for mobile optimization
  };

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(url, data, config);
    console.log("HTML Preview Response:", response.data);
    return response.data; // Response contains the HTML preview
  } catch (error) {
    console.error(
      "Error generating HTML preview:",
      error.response?.data || error.message
    );
  }
}
function getFormattedDate() {
  const date = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = dayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const dateNum = date.getDate();

  const ordinalSuffix = (n) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  return `${day}, ${dateNum}${ordinalSuffix(
    dateNum
  )} ${month} ${date.getFullYear()}`;
}

// Endpoint to generate a new signing URL for an existing envelope using session data
app.get("/generate-signing-url", async (req, res) => {
  try {
    console.log("Docusign here");
    // Check if session data exists
    // if (!req.session.docusignData) {
    //   return res.status(404).json({
    //     error:
    //       "No Docusign data found in session. Please create an envelope first.",
    //   });
    // }

    // // Retrieve data from the session
    // const { envelopeId, name, email, clientUserId, returnUrl } =
    //   req.session.docusignData;

    // if (!envelopeId || !name || !email || !clientUserId || !returnUrl) {
    //   return res.status(400).json({
    //     error: "Incomplete session data for generating signing URL.",
    //   });
    // }
    const { envelopeId, name, email, clientUserId } = req.query;

    let returnUrl = process.env.DOCUSIGN_REDIRECT_URI;

    // Validate required fields
    if (!envelopeId || !name || !email || !clientUserId || !returnUrl) {
      console.log(envelopeId, name, email, clientUserId, returnUrl);
      return res.status(400).json({
        error: "Incomplete data provided in the request.",
      });
    }

    const accessToken = await getAccessToken();

    const dsApi = new docusign.ApiClient();
    dsApi.setBasePath("https://demo.docusign.net/restapi");
    dsApi.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(dsApi);

    const recipientViewRequest = new docusign.RecipientViewRequest();
    recipientViewRequest.returnUrl = returnUrl; // Redirect after signing
    recipientViewRequest.authenticationMethod = "none";
    recipientViewRequest.email = email;
    recipientViewRequest.userName = name;
    recipientViewRequest.clientUserId = clientUserId; // Ensure this matches the one used in the envelope

    console.log(
      `Generating signing URL for Envelope ID: ${envelopeId}, User: ${name}`
    );
    const signingUrl = await envelopesApi.createRecipientView(
      ACCOUNT_ID, // Replace with your account ID
      envelopeId,
      { recipientViewRequest }
    );
    req.session.docusignData = {
      envelopeId,
    };

    console.log(req.session);
    res.redirect(signingUrl.url);
  } catch (error) {
    console.error("Error generating signing URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// // Callback route to receive data from DocuSign after signing
// app.get("/callback", (req, res) => {
//   try {
//     // Print the received callback data from DocuSign
//     console.log("Received callback data:", req.body);

//     // Print session data
//     console.log("Session data:", req.session.docusignData);

//     // Optionally, process the data (e.g., save it to a database or update session)

//     // Respond to DocuSign to confirm receipt of the data
//     res.status(200).json({ message: "Callback received successfully" });
//   } catch (error) {
//     console.error("Error processing callback:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.get("/callback", async (req, res) => {
  try {
    const data = req.query;

    console.log(data);

    const queryParams = new URLSearchParams(data);

    // Construct the redirect URL with the query parameters
    const redirectUrl = `http://localhost:3000?${queryParams.toString()}`;

    // Redirect to the new URL with the appended query parameters
    res.redirect(redirectUrl);

    return;

    // Retrieve the envelopeId from the session
    const { docusignData } = req.session;

    if (!docusignData || !docusignData.envelopeId) {
      return res.status(400).json({
        error: "No envelope ID found in session. Please try again.",
      });
    }

    const envelopeId = docusignData.envelopeId;
    const accessToken = await getAccessToken();

    const dsApi = new docusign.ApiClient();
    dsApi.setBasePath("https://demo.docusign.net/restapi");
    dsApi.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(dsApi);

    // Get the document(s) associated with the envelope
    const documentList = await envelopesApi.listDocuments(
      ACCOUNT_ID,
      envelopeId
    );

    if (
      !documentList ||
      !documentList.envelopeDocuments ||
      documentList.envelopeDocuments.length === 0
    ) {
      return res
        .status(404)
        .json({ error: "No documents found for this envelope." });
    }

    // Retrieve the first document (or iterate through documents if needed)
    const documentId = documentList.envelopeDocuments[0].documentId;

    // Fetch the signed document
    const document = await envelopesApi.getDocument(
      ACCOUNT_ID, // Replace with your account ID
      envelopeId,
      documentId,
      null // Pass null to get the full document
    );

    // // Set headers for PDF download
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   `attachment; filename="signed_document_${envelopeId}.pdf"`
    // );

    // // Send the document back to the user
    // res.send(Buffer.from(document, "binary"));

    // Define a path to save the file locally

    const savePath = path.join(__dirname, `signed_document_${envelopeId}.pdf`);

    // Save the document locally
    fs.writeFileSync(savePath, Buffer.from(document, "binary"));

    console.log(`Document saved locally at: ${savePath}`);

    // Redirect the user to localhost:3000
    res.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error in callback:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/create-signing-url", async (req, res) => {
  try {
    console.log("here");
    const { name, email, address, documentType } = req.body;
    const accessToken = await getAccessToken();

    const dsApi = new docusign.ApiClient();
    dsApi.setBasePath("https://demo.docusign.net/restapi");
    dsApi.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    console.log(accessToken);

    const envelopeDefinition = new docusign.EnvelopeDefinition();
    envelopeDefinition.emailSubject = "Please sign this document";
    let date = getFormattedDate();
    const documentBase64 = generateDocumentBase64(documentType, {
      name,
      email,
      address,
      date,
    });

    const clientUserId = `${name}-${email}`;

    const doc = new docusign.Document();
    // doc.documentBase64 = Buffer.from(
    //   `
    //   Name: ${name}
    //   Email: ${email}
    //   Address: ${address}

    //   Signature: ________________
    // `
    // ).toString("base64");

    doc.documentBase64 = documentBase64;
    doc.name = "Document";
    doc.fileExtension = "txt";
    doc.documentId = "1";

    const signaturePosition = documentConfig[documentType]?.signHere;

    if (!signaturePosition) {
      throw new Error(
        "Signature position configuration not found for document type."
      );
    }

    envelopeDefinition.documents = [doc];

    const signer = new docusign.Signer();
    signer.email = email;
    signer.name = name;
    signer.recipientId = "1";
    signer.clientUserId = clientUserId;

    const signHere = new docusign.SignHere();
    signHere.documentId = "1";
    signHere.recipientId = "1";
    signHere.pageNumber = signaturePosition.pageNumber; // Page number from config
    signHere.xPosition = signaturePosition.xPosition; // X position from config
    signHere.yPosition = signaturePosition.yPosition; // Y position from config

    const tabs = new docusign.Tabs();
    tabs.signHereTabs = [signHere];
    signer.tabs = tabs;

    const recipients = new docusign.Recipients();
    recipients.signers = [signer];
    envelopeDefinition.recipients = recipients;
    envelopeDefinition.status = "sent";

    const envelopesApi = new docusign.EnvelopesApi(dsApi);
    const envelope = await envelopesApi.createEnvelope(ACCOUNT_ID, {
      envelopeDefinition,
    });

    let envelopeId = envelope.envelopeId;
    console.log("sss", envelope.envelopeId);

    const recipientViewRequest = new docusign.RecipientViewRequest();
    recipientViewRequest.returnUrl = "http://localhost:3001/callback";
    recipientViewRequest.authenticationMethod = "none";
    recipientViewRequest.email = email;
    recipientViewRequest.userName = name;
    recipientViewRequest.clientUserId = clientUserId;

    //let envelopeId = envelope.envelopeId;
    console.log(envelope.envelopeId);

    // Retrieve recipient information for the envelope
    const recipientst = await envelopesApi.listRecipients(
      ACCOUNT_ID,
      envelopeId
    );

    let accountId = ACCOUNT_ID;
    console.log("here1", accountId, envelopeId);
    let documentId = "1";
    let source = "sample string 3";
    // try {
    //   const htmlPreview = await getHtmlPreview(
    //     accountId,
    //     envelopeId,
    //     accessToken,
    //     doc.documentBase64
    //   );
    //   //   console.log("HTML Preview generated successfully:", htmlPreview.html);
    //   //   res.json(htmlPreview);
    // } catch (error) {
    //   console.error(
    //     "Error generating HTML preview:",
    //     error.response?.data || error.message
    //   );
    // }

    // console.log("HTML Preview generated successfully");
    // console.log(htmlPreview);

    // // Print the HTML preview in the console or send it in the response
    // console.log("htmlprev", htmlPreview.html);

    // Print recipient info
    recipientst.signers.forEach((signer) => {
      console.log(`Signer Name: ${signer.name}`);
      console.log(`Signer Email: ${signer.email}`);
      console.log(`Signer Client User ID: ${signer.clientUserId}`);
    });
    const signingUrl = await envelopesApi.createRecipientView(
      ACCOUNT_ID,
      envelope.envelopeId,
      { recipientViewRequest }
    );

    console.log("here end");

    // req.session.docusignData = {
    //   envelopeId,
    //   clientUserId,
    //   name,
    //   email,
    //   returnUrl: "http://localhost:3000",
    // };

    // res.json({ signingUrl: signingUrl.url });
    res.json({
      signingUrl: signingUrl.url,
      envelopeId: envelopeId,
      clientUserId: clientUserId,
      name,
      email,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/download-signed-document/:envelopeId", async (req, res) => {
  const { envelopeId } = req.params;

  if (!envelopeId) {
    return res.status(400).json({ error: "Envelope ID is required." });
  }

  try {
    const accessToken = await getAccessToken();

    const dsApi = new docusign.ApiClient();
    dsApi.setBasePath("https://demo.docusign.net/restapi");
    dsApi.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(dsApi);

    // Get the document(s) associated with the envelope
    const documentList = await envelopesApi.listDocuments(
      ACCOUNT_ID,
      envelopeId
    );

    if (
      !documentList ||
      !documentList.envelopeDocuments ||
      documentList.envelopeDocuments.length === 0
    ) {
      return res
        .status(404)
        .json({ error: "No documents found for this envelope." });
    }

    // Retrieve the first document (or iterate through documents if needed)
    const documentId = documentList.envelopeDocuments[0].documentId;

    const document = await envelopesApi.getDocument(
      ACCOUNT_ID, // Replace with your account ID
      envelopeId,
      documentId,
      null // Pass null to get the full document
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="signed_document_${envelopeId}.pdf"`
    );
    res.send(Buffer.from(document, "binary"));
  } catch (error) {
    console.error("Error downloading signed document:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
