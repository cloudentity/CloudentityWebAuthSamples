## Cloudentity Web Auth Samples

This repository contains examples for using the Cloudentity Web Auth library used to facilitate authentication with [Cloudentity](https://cloudentity.com "Cloudentity - Developer Self Service for Identity, API and Microservice Security").
Setting up authentication for your application couldn’t been easier and only requires these simple steps below.
Try it out using the [Cloudentity demo](https://www.cloudentity.com/demo "Try Cloudentity online demo"). After starting your trial, create your JS Single Page App in the [Cloudentity developer self service](https://demo.cloudentity.com/user/#/developer/applications "Go to the your developer self care portal at Cloudentity public demo") and follow the steps there to see how easy it is.

### Usage

To play with each example project:

1. Go to it's directory and install all dependencies:

    ```bash
    npm install
    ```

2. Update `settings.js` file with your Cloudentity domain and client id:

    ```javascript
     var CLOUDENTITY_SETTINGS = {
       domain: 'your-domain',       // e.g. 'example.demo.cloudentity.com'
       tenantId: 'your-tenant-id',
       authorizationServerId: 'your-authorization-server-id',
       clientId: 'your-client-id',
       redirectUri: 'http://localhost:8000',
       scopes: ['profile', 'email', 'openid', 'revoke_tokens'] // 'revoke_tokens' scope must be present for 'logout' action to revoke token! Without it, token will only be deleted from browser's local storage.
     };
    ```

3. Make sure you have `http://localhost:8000` added to your Redirect URLs in Application Settings.

4. Start example server:    

    ```bash    
    npm start
    ```

5. Open following URL in your browser:

    ```
    http://localhost:8000 
    ```
