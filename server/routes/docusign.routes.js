const express = require("express");
const router = express.Router();
const docusignController = require("../controllers/docusign.controller");

router.get("/consent", docusignController.getConsentUrl);
router.get("/callback/return", docusignController.handleConsentCallback);
router.get("/callback", docusignController.handleCallback);
router.post("/create-signing-url", docusignController.createSigningUrl);
router.get(
  "/download-signed-document/:envelopeId",
  docusignController.downloadSignedDocument
);

module.exports = router;
