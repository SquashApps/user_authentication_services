**User Authentication Services using Nodejs**

* Database: Mongo
    [1]: https://docs.mongodb.com/manual/tutorial/getting-started/
* ORM: Mongoose
    [1]:  https://mongoosejs.com/docs/guide.html

* Command to install required modules: npm i -S

* Command to run the project: EMAIL=gmail-id PASSWORD=email-password npm start
     > Provide the real gmail id and password in the above command

* To test these API's you ca use __Postmam__ or __Restclient__
     > The above are the chrome extensions.
     > Download and add it to chrome.
           [1]: https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en
           [2]: https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo

* All the API routes must be prefixed with '/api/user'

* Signup API:
    > route: '/'  
    > request type: 'POST'  
    > Request Body: email and password.  
    > This email will be sent to the user only if the correct gmail credentials is passed while starting the APP.  
    > Please enable the toggle under __Allow less secure apps__.  
          [1]: https://myaccount.google.com/security#connectedapps  
    > If you miss the above two steps then the email will not be sent to the signed up user.  

* Login API:
    > route: '/'  
    > request type: 'GET'  
    > Request query params: email and password  

* Verify email API:
    > route: '/verify/:token'  
    > request type: 'GET',  
    > Request params: token of the user  
