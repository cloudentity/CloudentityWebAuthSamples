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
       clientId: 'your-client-id',
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