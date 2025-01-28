const documentConfig = {
  nda: {
    template: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    p {
      margin-bottom: 15px;
    }
    .section {
      margin-bottom: 30px;
    }
    .signature-section {
      margin-top: 50px;
      text-align: center;
      border: 2px dashed #888;
      padding: 50px;
      font-size: 18px;
      color: #555;
    }
  </style>
</head>
<body>
  <h1>NON-DISCLOSURE AGREEMENT (NDA)</h1>
  <p>This Non-Disclosure Agreement ("Agreement") is entered into as of <strong>[DATE]</strong> by and between:</p>
  
  <div class="section">
    <p><strong>Disclosing Party:</strong> Sample Company Inc.<br>
    Address: 456 Business Ave, Cityville, CA, USA</p>
  </div>
  
  <div class="section">
    <p><strong>Receiving Party:</strong> [NAME]<br>
    Address: [ADDRESS]</p>
  </div>
  
  <hr>
  
  <div class="section">
    <p><strong>WHEREAS</strong>, the Disclosing Party possesses certain confidential and proprietary information ("Confidential Information") that must be protected against unauthorized use and disclosure;</p>
    <p><strong>NOW, THEREFORE</strong>, the parties agree as follows:</p>
    <ol>
      <li><strong>Confidential Information:</strong> The Receiving Party agrees to protect all Confidential Information disclosed by the Disclosing Party and use it only for the purpose of evaluating or engaging in discussions regarding a potential business relationship.</li>
      <li><strong>Term:</strong> This Agreement will remain in effect for a period of 2 years from the date of execution.</li>
      <li><strong>Governing Law:</strong> This Agreement shall be governed by the laws of the State of California.</li>
    </ol>
  </div>
  
  <div class="signature-section">
    <p><strong>Signature of Receiving Party:</strong></p>
    <br/>
    <p>_____________________________</p>
    <p>[NAME]</p>
  </div>
</body>
</html>
`,
    signHere: {
      pageNumber: "1", // This refers to the first page of the document.
      xPosition: "260", // Adjust X-axis position for the signature field.
      yPosition: "500", // Adjust Y-axis position for the signature field.
    },
  },
  contract: {
    template: `
CONTRACT AGREEMENT

This Contract Agreement ("Agreement") is entered into as of [DATE] by and between:

Party A: The Company
Address: 123 Business Rd, City, Country

Party B: [NAME]
Address: [ADDRESS]

----------------------------------------------------------------------------
WHEREAS, both parties agree to the terms and conditions specified herein;

NOW, THEREFORE, the parties agree as follows:

1. Agreement Terms.
Party A agrees to provide services, and Party B agrees to pay for said services.

2. Term.
This Agreement shall remain in effect for a period of 1 year from the date of execution.

3. Governing Law.
This Agreement shall be governed by the laws of the State of California.

---------------------------------------------------------------------------
IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

Party A:                                   Party B:
___________________________                ___________________________
The Company                                [NAME]
Date: [DATE]                  Date: [DATE]
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
