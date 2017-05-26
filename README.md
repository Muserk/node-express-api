# Simple Express JS JSON-API

This is a simple skeleton of a JSON-API that uses Express JS and Mongoose.

## Installation
To get the server up and running:
1. Pull the repository
2. Run `npm install`
3. Run `node ./bin/www`

To get an overview of the endpoints, you can import the included Postman file into Postman.

## Dependencies
The package.json file contains a list of dependencies.
This project uses the following main dependencies:
- [Express](https://github.com/expressjs/express)
- [Express-Validator](https://github.com/ctavan/express-validator)
- [Mongoose](https://github.com/Automattic/mongoose)
- [Morgan](https://github.com/expressjs/morgan)

----------

## Payloads

For a more complete list of available endpoints and example inputs, please import the postman file.

#### Patient Model

    {
        'id':4437c452-3f54-11e7-a919-92ebcb67fe33, 
        'firstName':'Gavin', 
        'lastName':'Servai', 
        'phoneNumber':'6049999999'
    }

#### Appointment Model

    {
        'id':043d24e1-55dd-4108-8a8f-0f041cce4475, 
        'startDate':'2017-10-10', 
        'endDate':'2017-10-20', 
        'patientId':'8954'
    }
    
#### Service Model

    {
        'id':432973d5-c6cd-45f5-8156-aa848e6dc848, 
        'name':'test-service', 
        'duration':'24'
    }
