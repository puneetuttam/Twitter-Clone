# Twitter App

This is a social media App which is similar to Twitter.com or X.com

## 1. Project Setup

Create Backend and frontend Folder

### Frontend (/twitter/frontend/)
Inside frontend Folder
``` 
    npm create vite@latest 
```

### Backend

For better developer experience we are not going to install our packages inside backend rather we will install in out root directory "/twitter/"

```
npm init -y
npm install express mongoose jsonwebtoken bcryptjs dotevn cors cookie-parser cloudinary
```

-   Now make the type to module inside  package.json
    ```
    "type":"module"
    ```
-   Add script : 
    ```
    "dev":"nodemon backend/server.js"
    "start": "node backent/server.js"
    ```
- Change main entry file to server.js 
    ```
    "main": "backend/server.js"
    ```