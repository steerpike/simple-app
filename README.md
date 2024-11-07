# Simple App

## Overview

Simple App consists of three applications:

1. **simple-app-client**: A Next.js client application with a landing page that plays a video using a React video player.
2. **simple-app-identity**: A Nest.js identity service that returns a randomly generated NUID or `0`.
3. **simple-app-api**: A Nest.js API service that provides different video URLs based on the user's login status.

## How It Works

1. The client application calls the identity service to determine if the user is logged in.
2. The identity service returns a NUID from a static JSON file or `0` if not logged in.
3. The client application uses the NUID to request a video URL from the API service.
4. The API service returns a video URL based on the user's login status.
5. The client application plays the video using a React video player.


## How to Run the Services

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Setting Up Environment Variables
1. Create a `.env.local` in each of the application directories
2. Add your Honeycomb API key to the .env.local file:
`NEXT_PUBLIC_HONEYCOMB_API_KEY=your_actual_api_key_here`

### Running the Client Application
1. Navigate to the `simple-app-client` directory:
`cd simple-app-client`
2. Install dependencies:
`npm install`
3. Start the development server:
`npm run dev`
4. Open your browser and navigate to `http://localhost:3000` to see the client application

### Running the Identity Service
1. Navigate to the simple-app-identity directory:
`cd simple-app-identity`
2. Install dependencies:
`npm install`
3. Start the service:
`npm run start`
4. The identity service will be running at `http://localhost:3001`

### Running the API Service
1. Navigate to the simple-app-api directory:
`cd simple-app-api`
2. Install dependencies:
`npm install`
3. Start the service:
`npm run start`
4. The api service will be running at `http://localhost:3002`

## Seeing the Results
1. Ensure that all three services (client, identity, and API) are running.
2. Open your browser and navigate to http://localhost:3000.
3. The client application will call the identity service to determine the user's login status.
4. Based on the login status, the client application will request a video URL from the API service.
5. The client application will play the video using a React video player.

## D2 Diagram

```d2
ClientApp: simple-app-client
IdentityService: simple-app-identity
ApiService: simple-app-api

ClientApp -> IdentityService: Get NUID
ClientApp -> ApiService: Get Video URL with NUID
ClientApp -> VideoPlayer: Play Video
```
