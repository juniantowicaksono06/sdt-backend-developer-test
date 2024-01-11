## PT SURYA DIGITAL TEKNOLOGI BACKEND DEVELOPER TEST


### Source Code
In this test i used expressjs as a backend framework and MySQL as a database

To clone this repo you can use the following command:
```bash
git clone https://github.com/juniantowicaksono06/sdt-backend-developer-test
```
### Requirements
Before you run it you need to install Node.JS.
In this test i used Node.JS version v20.10.0

You can get and install Node.JS from <a href="https://nodejs.org/en" target="_blank">here</a>

And after that you can install the required package to run this api and program by using the following command:

```bash
npm install
```

If you want to run the API you can use the following command:

```bash
npm run dev # If you wanted to run it in development mode
npm run start # If you wanted to run it in production mode
```

For the email broadcast service you can run with the following command:
```bash
npm run broadcast
```

### API Endpoint

#### Create User
```API
POST /api/users
```

##### Parameters
```json
{
    "first_name": "Junianto Ichwan",
    "last_name": "Dwi Wicaksono",
    "location": "Surabaya",
    "email": "juniantowicaksono22@gmail.com",
    "event": [{
        "event_type": "BIRTHDAY",
        "initial_date": "1998-06-22"
    }]
}
```
#### Delete User
```API
DELETE /api/users/:user_id
```

#### Update User
```API
UPDATE /api/users/:user_id
```

##### Parameters

```json
{
    "first_name": "Junianto",
    "last_name": "Wicaksono",
    "location": "Surabaya",
    "email": "juniantowicaksono22@gmail.com",
    "event": [{
        "event_type": "BIRTHDAY",
        "initial_date": "1999-06-22"
    }]
}
```

### Unit Test
If you want to try the unit test you can use the following command:
```bash
npm run test:windows # For Windows User
npm run test:linux # For Linux User
```
