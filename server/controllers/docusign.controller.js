const config = require("../config");
const docusignService = require("../services/docusign.service");

class DocusignController {
  async getConsentUrl(req, res) {
    try {
      const consentUrl = await docusignService.getConsentUrl();
      res.json({ consentUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createSigningUrl(req, res) {
    try {
      const { name, email, address, documentType } = req.body;
      const envelope = await docusignService.createEnvelope(
        name,
        email,
        address,
        documentType
      );
      const clientUserId = `${name}-${email}`;
      const signingUrl = await docusignService.createSigningUrl(
        envelope.envelopeId,
        email,
        name,
        clientUserId
      );

      res.json({
        signingUrl: signingUrl.url,
        envelopeId: envelope.envelopeId,
        clientUserId,
        name,
        email,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }

  async downloadSignedDocument(req, res) {
    try {
      const { envelopeId } = req.params;
      if (!envelopeId) {
        return res.status(400).json({ error: "Envelope ID is required." });
      }

      const document = await docusignService.downloadSignedDocument(envelopeId);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="signed_document_${envelopeId}.pdf"`
      );
      res.send(Buffer.from(document, "binary"));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  handleCallback(req, res) {
    try {
      const queryParams = new URLSearchParams(req.query);
      const redirectUrl = `${config.client}?${queryParams.toString()}`;
      res.redirect(redirectUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  handleConsentCallback(req, res) {
    res.send("Consent successful! You can close this window.");
  }
}

module.exports = new DocusignController();
