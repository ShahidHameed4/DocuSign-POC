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
  <h1>SERVICE AGREEMENT</h1>
  <p>This Service Agreement ("Agreement") is entered into as of <strong>[DATE]</strong> by and between:</p>
  
  <div class="section">
    <p><strong>Service Provider:</strong> The Company</p>
    <p><strong>Client:</strong> [NAME]</p>
    <p><strong>Client Address:</strong> [ADDRESS]</p>
  </div>
  
  <hr>
  
  <div class="section">
    <p><strong>WHEREAS</strong>, the Service Provider agrees to perform services for the Client under the terms of this Agreement;</p>
    <p><strong>NOW, THEREFORE</strong>, the parties agree as follows:</p>
    <ul>
      <li><strong>Payment:</strong> The Client agrees to pay the Service Provider.</li>
      <li><strong>Termination:</strong> Either party may terminate this Agreement with 30 days’ notice.</li>
    </ul>
  </div>
  
  <div class="signature-section">
    <p><strong>Signature:</strong></p>
    <br/>
    <p>_____________________________</p>
    <p>[NAME]</p>
    <p>Date: [DATE]</p>
  </div>
</body>
</html>
`,
    signHere: {
      pageNumber: "1", // This refers to the first page of the document.
      xPosition: "290", // Adjust X-axis position for the signature field.
      yPosition: "443", // Adjust Y-axis position for the signature field.
    },
  },
  lease: {
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
  <h1>LEASE AGREEMENT</h1>
  <p>This Lease Agreement ("Agreement") is made and entered into as of <strong>[DATE]</strong> by:</p>
  
  <div class="section">
    <p><strong>Lessee:</strong> [NAME]</p>
    <p><strong>Lessee Address:</strong> [ADDRESS]</p>
  </div>
  
  <hr>
  
  <div class="section">
    <p><strong>WHEREAS</strong>, the Lessor agrees to lease the property to the Lessee;</p>
    <p><strong>NOW, THEREFORE</strong>, the parties agree as follows:</p>
    <ul>
      <li><strong>Lease Term:</strong> The lease term shall commence on [DATE] and continue until April 1st, 2024.</li>
      <li><strong>Rent:</strong> The Lessee agrees to pay monthly rent as agreed.</li>
      <li><strong>Governing Law:</strong> This Agreement shall be governed by the laws of California.</li>
    </ul>
  </div>
  
  <div class="signature-section">
    <p><strong>Signature:</strong></p>
    <br/>
    <p>_____________________________</p>
    <p>[NAME]</p>
    <p>Date: [DATE]</p>
  </div>
</body>
</html>
`,
    signHere: {
      pageNumber: "1", // This refers to the first page of the document.
      xPosition: "280", // Adjust X-axis position for the signature field.
      yPosition: "420", // Adjust Y-axis position for the signature field.
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
