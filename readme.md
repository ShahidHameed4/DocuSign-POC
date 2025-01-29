# DocuSign Integration Guide

This project provides a complete solution for integrating DocuSign's electronic signature capabilities into your application. It includes both backend and frontend implementations for a seamless document signing experience.

## Prerequisites

Before getting started, you'll need to:

1. Create a DocuSign Developer Account at [DocuSign Developer](https://developers.docusign.com)
2. Register an application in the DocuSign Developer Console to obtain:
   - Integration Key (Client ID)
   - User ID
   - Account ID
   - OAuth Base Path
   - REST API Base Path
3. Generate and download a private key from DocuSign
4. Grant consent to your application (first-time setup)

## Project Structure

The project consists of two main components:

- Backend server handling DocuSign API interactions
- Frontend interface for document signing

## Installation

### Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the server directory:

```env
DOCUSIGN_INTEGRATION_KEY=your_integration_key
DOCUSIGN_USER_ID=your_user_id
DOCUSIGN_ACCOUNT_ID=your_account_id
DOCUSIGN_OAUTH_BASE_PATH=your_oauth_base_path
DOCUSIGN_REST_API_BASE_PATH=your_rest_api_base_path
DOCUSIGN_REDIRECT_URI=your_redirect_uri
DOCUSIGN_RETURN_URL=your_return_url
```

3. Place your DocuSign private key in the server folder as `private.key`

4. Start the server:

```bash
node index.js
```

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Implement the signing iframe in your application:

```html
<iframe
  id="docusignFrame"
  src="SIGNING_URL"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>
```

## API Endpoints

### Get Consent URL

```
GET /api/docusign/consent
```

Generates authorization URL for the application.

### Create Signing URL

```
GET /api/docusign/create-signing-url
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "address": "123 Main St",
  "documentType": "nda"
}
```

**Response:**

```json
{
  "envelopeId": "12345678-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "signingUrl": "https://..."
}
```

### Download Signed Document

```
GET /api/docusign/download/:envelopeId
```

Retrieves the signed document from DocuSign.

## Core Components

### DocusignService.js

Handles all DocuSign API interactions:

- Authentication and token management
- Envelope creation
- Signing URL generation
- Document download

### DocumentGenerator.js

Manages document templates:

- HTML-based template system
- Dynamic signature field positioning
- Template selection based on document type
- Data placeholder replacement

## Usage Flow

1. **Initial Setup:**

   - Create developer account
   - Register application
   - Generate private key
   - Grant consent

2. **Integration:**

   - Configure environment variables
   - Implement backend endpoints
   - Set up frontend iframe

3. **Document Signing Flow:**
   - Create envelope with document and recipient details
   - Generate signing URL
   - Present signing interface in iframe
   - Track signing progress
   - Download completed document

## Best Practices

- Store sensitive credentials securely
- Implement proper error handling
- Monitor iframe state changes
- Validate user input
- Implement proper logging
- Handle session management

## Requirements

- Node.js 12.x or higher
- npm 6.x or higher
- Modern web browser with iframe support

## Support

For issues related to DocuSign API, consult the [DocuSign API Documentation](https://developers.docusign.com/docs/esign-rest-api).

For project-specific issues, please open an issue in the repository.
