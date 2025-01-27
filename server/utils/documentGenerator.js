const documentConfig = {
  nda: {
    template: `
      NON-DISCLOSURE AGREEMENT (NDA)
      
      This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] by 
      and between:
      
      Disclosing Party: The Company 
      Receiving Party: [NAME]
      Address: [ADDRESS]
      
      WHEREAS, the Disclosing Party possesses certain confidential and proprietary information
      ("Confidential Information") that must be protected against unauthorized use and disclosure;
      
      NOW, THEREFORE, the parties agree as follows:
      
      1. Confidential Information. The Receiving Party agrees to protect all Confidential Information
      disclosed by the Disclosing Party and use it only for the purpose of evaluating or engaging in
      discussions regarding.
      2. Term. This Agreement will remain in effect for a period of [Insert Number] years from the date
      of execution.
      3. Governing Law. This Agreement shall be governed by the laws of [Insert Jurisdiction].
      
      IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.
      
      Receiving Party Signature: ________________
      
      Date: [DATE]
    `,
    signHere: {
      pageNumber: "1",
      xPosition: "270",
      yPosition: "410",
    },
  },
  contract: {
    template: `
      CONTRACT AGREEMENT
      
      This Contract Agreement ("Agreement") is entered into as of [DATE] by and between:
      
      Parties: [NAME] and The Company
      Address: [ADDRESS]
      
      WHEREAS, both parties agree to the terms and conditions specified herein;
      
      Now, therefore, both parties agree as follows:
      
      1. Agreement Terms: [Insert Terms]
      2. Term: [Insert Term]
      3. Governing Law: [Insert Jurisdiction]
      
      IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.
      
      Signature: ________________
      
      Date: [DATE]
    `,
    signHere: {
      pageNumber: "1",
      xPosition: "150",
      yPosition: "200",
    },
  },
};

function generateDocumentBase64(documentType, data) {
  const config = documentConfig[documentType];
  if (!config) {
    throw new Error("Unsupported document type");
  }
  let documentContent = config.template;
  // Replace custom fields in the document with the data provided
  for (const field in data) {
    const regex = new RegExp(`\\[${field.toUpperCase()}\\]`, "g");
    documentContent = documentContent.replace(regex, data[field]);
  }

  // Return the document as base64 encoded
  return Buffer.from(documentContent).toString("base64");
}

module.exports = { generateDocumentBase64, documentConfig };
