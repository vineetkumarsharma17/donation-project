# Backend Server

This is the backend server for the Donation Website.

## Setup

1. Open this folder in a terminal:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server runs on `http://localhost:5001`.

## API Endpoints

### POST /api/volunteer/register

Registers a new volunteer.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "availability": "weekends",
  "interest": "teaching",
  "message": "Optional message"
}
```
