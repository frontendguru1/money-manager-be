# money-manager-be

# Setup

# Setup - Mongo DB
    - create a new account
    - create a new cluster
    - create a new user
    - copy the connection
    - whitelist IP Address


# Connect mongo DB from node application
    - install mongoose package - npm i mongoose
    - create a new .env file - npm i dotenv


# HTTP Methods and status code
    Code:
    - Informational responses (100 – 199)
    - Successful responses (200 – 299)
    - Redirection messages (300 – 399)
    - Client error responses (400 – 499)
    - Server error responses (500 – 599)

    Methods:
    - HTTP defines a set of request methods to indicate the purpose of the request and what is expected if the request is successful. Although they can also be nouns, these request methods are sometimes referred to as HTTP verbs. Each request method has its own semantics, but some characteristics are shared across multiple methods, specifically request methods can be safe, idempotent, or cacheable.

    GET
    The GET method requests a representation of the specified resource. Requests using GET should only retrieve data and should not contain a request content.

    HEAD
    The HEAD method asks for a response identical to a GET request, but without a response body.

    POST
    The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.

    PUT
    The PUT method replaces all current representations of the target resource with the request content.

    DELETE
    The DELETE method deletes the specified resource.

    CONNECT
    The CONNECT method establishes a tunnel to the server identified by the target resource.

    OPTIONS
    The OPTIONS method describes the communication options for the target resource.

    TRACE
    The TRACE method performs a message loop-back test along the path to the target resource.

    PATCH
    The PATCH method applies partial modifications to a resource.

# Routing

# Express Validation

# Middleware
