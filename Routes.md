## Routes

# Auth
 - POST /register
    - firstName
    - lastName
    - email
    - phone
    - city
    - state
    - zipcode
    - country
    - password

 - POST /login
 - POST /forgotPassword
 - POST /logout

# User
 - GET /profile
 - PUT /profile/update

# Group
- POST /groups – Create a new group
   Payload: {name: "group name", description: "group description"}

- GET /groups – List all groups current user belongs to

- GET /groups/:groupId – Get group details

- PATCH /groups/:groupId – Update group (name, description.)

- DELETE /groups/:groupId – Delete group (owner only)


# Invite

# Budget

# Transaction
