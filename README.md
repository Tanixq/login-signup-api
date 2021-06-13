# login-signup-api

It is a Rest API for login and register user.
Made using Express and MongoDB.

**API End Points -**
- >login End Point - https://login-signup-api-tanixq.herokuapp.com/api/login 
- >signup End Point - https://login-signup-api-tanixq.herokuapp.com/api/signup
- >get all user End Point - https://login-signup-api-tanixq.herokuapp.com/api/get-all-user

# Usage

### Goto Section

- [Usage for Sign Up](#for-sign-up)
- [Usage for Log In](#for-login)
- [Usage for Get All Users](#for-get-all-resgistered-users)

## For Sign Up
Make **POST** Request for sign up on End Point - https://login-signup-api-tanixq.herokuapp.com/api/signup

### Step 1 - 
Set Request type as **POST**

![alt set_request_to_post](https://github.com/Tanixq/images/blob/main/post-request.gif?raw=true)


### Step 2 - 
Set Content-Type as application/json

```
Content-Type: application/json
```

![alt set_content_type](https://github.com/Tanixq/images/blob/main/content-type.gif?raw=true)

### Step 3 - 
Create JSON

Description of JSON:

| Fields      | Description                 | TYPE      | Required  |
| ------------- |:-------------:              | -----:    | -----: |
| email         | Email of the user.          | String    | Yes |
| name          | Name of the user.           |   String  | Yes |
| phone_number  | Phone Number of the user.   |    String | Yes |
| dob           | Date of birth of the user.  |    String | Yes |
| password      | Password of the user.       |   String  | Yes |

An example user object is defined below:
```
{
  "email": "TestUser@test.com",
  "name": "Test User",
  "phone_number": "978456123",
  "dob": "12/05/1998",
  "password": "123456"
}
  ```
![alt create_json](https://github.com/Tanixq/images/blob/main/create-json.gif?raw=true)
### Step 4 - 
Now send **POST** on **End Point - https://login-signup-api-tanixq.herokuapp.com/api/signup**
![alt create_json](https://github.com/Tanixq/images/blob/main/sending_post_req.gif?raw=true)

### After Successful submission you receive Response as JSON

**Response Parameters**
| Fields      | Description         | Example Response                              |
| ------------- |:-------------:    | -----:                                        |
| message        | Message          | Sign Up Successful                            |
| error (if any)          | errors description |      errors{"name": "ValidatorError"}        |

**Example of API Response:**

On Successful Sign Up
```
{
    "message": "Sign Up Successful"
}
```
If User already Exist
```
{
    "message": "Email already registered."
}
```
Error if any field is missing
```
{
    "error": {
        "errors": {
            "dob": {
                "name": "ValidatorError",
                "message": "Path `dob` is required.",
                "properties": {
                    "message": "Path `dob` is required.",
                    "type": "required",
                    "path": "dob"
                },
                "kind": "required",
                "path": "dob"
            }
        },
        "_message": "User validation failed",
        "message": "User validation failed: dob: Path `dob` is required."
    }
}
```

## For Login
Make **POST** Request for login on End Point - https://login-signup-api-tanixq.herokuapp.com/api/login

### Step 1 - 
Set Request type as **POST**

![alt set_request_to_post](https://github.com/Tanixq/images/blob/main/post_req_login.gif?raw=true)


### Step 2 - 
Set Content-Type as application/json

```
Content-Type: application/json
```

![alt set_content_type](https://github.com/Tanixq/images/blob/main/content_type_login.gif?raw=true)

### Step 3 - 
Create JSON

Description of JSON:

| Fields      | Description                 | TYPE         | Required   |
| ------------- |:-------------:              | -----:     | -----:   |
| email         | Email of the user.          | String     | Yes      |
| password      | Password of the user.       |   String   | Yes      |

An example user object is defined below:
```
{
  "email": "TestUser@test.com",
  "password": "123456"
}
```
![alt create_json_login](https://github.com/Tanixq/images/blob/main/create_json_login.gif?raw=true)

### Step 4 - 
Now send **POST** on **End Point - https://login-signup-api-tanixq.herokuapp.com/api/login**
![alt sending_post_req_login](https://github.com/Tanixq/images/blob/main/sending_post_req_login.gif?raw=true)

### After Successful submission you receive Response as JSON

**Response Parameters**

| Fields        | Description                 | Example Response                                                           |
| ------------- |:-------------:              | -----:                                                                     |
| message       | Message                     | Authentication Succesfull/Authentication Failed Check Email or Password!   |                           |
| tokenExpiry   | Expiry of token generated   |      "Token is only valid for 1 Hour"                                      |
| token         | generated token             |      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRlc3RVc2VyQHRlc3   |

**Example of API Response:**

On Successful Login
```
{
    "message": "Authentication Succesfull",
    "tokenExpiry": "Token is only valid for 1 Hour",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRlc3RVc2VyQHRlc3QuY29tIiwidXNlcklkIjoiNWZkNDdkOGIwYTgzMmUwMDE3YmMwN2M1IiwiaWF0IjoxNjA3NzYzNjEyLCJleHAiOjE2MDc3NjcyMTJ9.VCrCz6gjmcF3vUAjAkyihhxC8FH8B1oEacVi73JOX_Y"
}
```
If Credentials are wrong
```
{
    "message": "Authentication Failed Check Email or Password!"
}
```
Error if any
```
{
    "error"
}
```

## For Get All Resgistered Users

### Step 1 - 
Generate Token by Login and Copy it.

![alt generate_token](https://github.com/Tanixq/images/blob/main/generate_token.gif?raw=true)

### Step 2 - 
Set request type as **GET** to **End Point - https://login-signup-api-tanixq.herokuapp.com/api/get-all-user**

![alt set_get_request](https://github.com/Tanixq/images/blob/main/set_get_req.gif?raw=true)

### Step 3 - 
Add token in Header as Authorization
```
Authorization: token_num
```
![alt set_auth_header](https://github.com/Tanixq/images/blob/main/set_auth_header.gif?raw=true)

### Step 4 - 
Now send **GET** on **End Point - https://login-signup-api-tanixq.herokuapp.com/api/get-all-user**

![alt sending_get_all_user](https://github.com/Tanixq/images/blob/main/sending_get_all_user.gif?raw=true)

### After Successful submission you receive Response as JSON


**Example of API Response:**

On Successful 
```
{
    "all_users": {
        "5fd3a65592006e256031ff7a": {
            "email": "test@test.com",
            "name": "test",
            "phone_number": "123456",
            "dob": "1256"
        },
        "5fd3b6d0384338091c5ae87a": {
            "email": "test2@test.com",
            "name": "test",
            "phone_number": "123456",
            "dob": "1256"
        },
    }
}
```
If token is wrong or expired
```
{
    "message": "Auth failed"
}
```
Error if any
```
{
    "error"
}
```

**Description of Response:**

Received JSON have object **all_users**

**Description of all_users:**

| key           | value           | 
| ------------- |:-------------:  | 
| **unique id** | **user_object** |

Example: 
```
{
    "all_users": {
    
        "5fd3d335816e17109402a942": {},
        "5fd3d395a46d0f0017aa83bc": {},
        "5fd47d8b0a832e0017bc07c5": {}
    }
}
```

**Description of user_object:**

| Fields      | Description                   | 
| ------------- |:-------------:              | 
| email         | Email of the user.          | 
| name          | Name of the user.           | 
| phone_number  | Phone Number of the user.   | 
| dob           | Date of birth of the user.  | 

Example: 
```
{
     "all_users": {
     
        "5fd3a65592006e256031ff7a": {
            "email": "test@test.com",
            "name": "test",
            "phone_number": "123456",
            "dob": "1256"
        },
        "5fd3b6d0384338091c5ae87a": {
            "email": "test2@test.com",
            "name": "test",
            "phone_number": "123456",
            "dob": "1256"
        }
    }
}
```
