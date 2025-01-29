const docusign = require("docusign-esign");
const fs = require("fs");
const config = require("../config");
const {
  documentConfig,
  generateDocumentBase64,
} = require("../utils/documentGenerator");

class DocusignService {
  constructor() {
    this.privateKey = fs.readFileSync("./private.key", "utf8");
    this.dsApi = new docusign.ApiClient();
    this.dsApi.setOAuthBasePath(config.docusign.oAuthBasePath);
  }

  async getConsentUrl() {
    return `https://${
      config.docusign.oAuthBasePath
    }/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=${
      config.docusign.integrationKey
    }&redirect_uri=${encodeURIComponent(config.docusign.redirectUri)}`;
  }

  async getAccessToken() {
    try {
      const response = await this.dsApi.requestJWTUserToken(
        config.docusign.integrationKey,
        config.docusign.userId,
        ["signature"],
        this.privateKey,
        3600
      );
      return response.body.access_token;
    } catch (error) {
      if (error.response?.body?.error === "consent_required") {
        const consentUrl = await this.getConsentUrl();
        throw { message: "consent_required", consentUrl };
      }
      throw error;
    }
  }

  async createEnvelope(name, email, address, documentType) {
    const accessToken = await this.getAccessToken();
    const dsApi = new docusign.ApiClient();
    dsApi.setBasePath(config.docusign.restApiBasePath);
    dsApi.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    const envelopeDefinition = this._createEnvelopeDefinition(
      name,
      email,
      address,
      documentType,
      documentConfig
    );

    const envelopesApi = new docusign.EnvelopesApi(dsApi);
    return await envelopesApi.createEnvelope(config.docusign.accountId, {
      envelopeDefinition,
    });
  }

  async createSigningUrl(envelopeId, email, name, clientUserId) {
    const accessToken = await this.getAccessToken();
    const dsApi = new docusign.ApiClient();
    dsApi.setBasePath(config.docusign.restApiBasePath);
    dsApi.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(dsApi);
    const recipientViewRequest = new docusign.RecipientViewRequest();
    recipientViewRequest.returnUrl = config.docusign.callbackUrl;
    recipientViewRequest.authenticationMethod = "none";
    recipientViewRequest.email = email;
    recipientViewRequest.userName = name;
    recipientViewRequest.clientUserId = clientUserId;

    return await envelopesApi.createRecipientView(
      config.docusign.accountId,
      envelopeId,
      { recipientViewRequest }
    );
  }

  async downloadSignedDocument(envelopeId) {
    const accessToken = await this.getAccessToken();
    const dsApi = new docusign.ApiClient();
    dsApi.setBasePath(config.docusign.restApiBasePath);
    dsApi.addDefaultHeader("Authorization", `Bearer ${accessToken}`);

    const envelopesApi = new docusign.EnvelopesApi(dsApi);
    const documentList = await envelopesApi.listDocuments(
      config.docusign.accountId,
      envelopeId
    );

    if (!documentList?.envelopeDocuments?.length) {
      throw new Error("No documents found for this envelope.");
    }

    const documentId = documentList.envelopeDocuments[0].documentId;
    return await envelopesApi.getDocument(
      config.docusign.accountId,
      envelopeId,
      documentId,
      null
    );
  }

  _createEnvelopeDefinition(
    name,
    email,
    address,
    documentType,
    documentConfig
  ) {
    const envelopeDefinition = new docusign.EnvelopeDefinition();
    envelopeDefinition.emailSubject = "Please sign this document";

    const clientUserId = `${name}-${email}`;
    const doc = this._createDocument(name, email, address, documentType);
    const signer = this._createSigner(
      email,
      name,
      clientUserId,
      documentType,
      documentConfig
    );

    const recipients = new docusign.Recipients();
    recipients.signers = [signer];

    envelopeDefinition.documents = [doc];
    envelopeDefinition.recipients = recipients;
    envelopeDefinition.status = "sent";

    return envelopeDefinition;
  }

  _createDocument(name, email, address, documentType) {
    const doc = new docusign.Document();
    doc.documentBase64 = generateDocumentBase64(documentType, {
      name,
      email,
      address,
      date: this._getFormattedDate(),
    });
    doc.name = "Document";
    doc.fileExtension = "html";
    doc.documentId = "1";
    return doc;
  }

  _createSigner(email, name, clientUserId, documentType, documentConfig) {
    const signer = new docusign.Signer();
    signer.email = email;
    signer.name = name;
    signer.recipientId = "1";
    signer.clientUserId = clientUserId;

    const signHere = new docusign.SignHere();
    const signaturePosition = documentConfig[documentType]?.signHere;

    signHere.documentId = "1";
    signHere.recipientId = "1";
    signHere.pageNumber = signaturePosition.pageNumber;
    signHere.xPosition = signaturePosition.xPosition;
    signHere.yPosition = signaturePosition.yPosition;

    const tabs = new docusign.Tabs();
    tabs.signHereTabs = [signHere];
    signer.tabs = tabs;

    return signer;
  }

  _getFormattedDate() {
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
}

module.exports = new DocusignService();
