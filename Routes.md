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

# Budget
   # Create
   - POST -  /groups/:groupId/budgets
      Payload: {
         "month': 1,
         "year": 2026 (current year + next 5 years),
         "totalBudget": 35000
      }

- GET - /groups/:groupId/budgets
   # List All
   - Check : Fetch all the budgets "isActive: true" of a specific group
   - response -> list of all budgets of a specific group

- PUT - /groups/:groupId/budgets/:budgetId
   # Update Budget
   Payload: {
      "month': 1,
      "year": 2026 (current year + next 5 years),
      "totalBudget": 35000
   }

- DELETE - /groups/:groupId/budgets/:budgetId (Soft delete)
   # Soft Delete
 - {
      isActive: false
   }

# Category

# Transaction

<!-- # Invite -->