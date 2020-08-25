## Cloudentity Web Auth Samples

Cloudentity Web Auth client for Javascript Single Page Apps usage examples.

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
