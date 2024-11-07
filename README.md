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

## D2 Diagram

```d2
ClientApp: simple-app-client
IdentityService: simple-app-identity
ApiService: simple-app-api

ClientApp -> IdentityService: Get NUID
ClientApp -> ApiService: Get Video URL with NUID
ClientApp -> VideoPlayer: Play Video
```
