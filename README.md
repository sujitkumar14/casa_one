
<b>casa one is a platform to provide furniture on rent</b>

- <b>Requirements</b>

    This project requires node >=8.0.0 and npm >=6

- <b>Getting Started</b>

    To get started, clone the repo and install the dependencies and start the server.

    ```js
    npm install
    npm start
    ```

<b> API Documentation </b>

- <b> API URL</b>
    ```js
        http://localhost:3000/v1
    ```


- <b>Success Response</b>

    ```js
        'success': true,
        'message': "",
        'data': {}, 
        'status': {
            'code': 200
            'description': ""
        }
    ```

- <b>Error Response</b>

    ```js
        'success': false,
        'message': "",
        'status': {
            'code': 200
            'description': ""
        }
    ```

<b>User Endpoints</b>

- <b>Register</b>

    Register endpoint is called whenever a new user wants to register on casa one.

    <b>Route:</b> /user/register <br>
    <b>Method:</b> POST

    <b>Body</b>
    1. firstName
    2. lastName (optional)
    3. userName (unique)
    4. phoneNumber (unique)
    5. emailId (unique)
    6. password (strong)

- <b>Login</b>

    Login on a casa one platform

    <b>Route:</b> /user/login <br>
    <b>Method:</b> POST

    <b>Body</b>
    1. emailId
    2. password

    <b>Response</b>
    ```js
        data = {
            'jwt': eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMTBjYTA1NzVlZmM0NzAzYjQyZWZkYmQ3NGJhZGMwOSIsImlhdCI6MTU2MDI4NDA3MywiZXhwIjoxNTYwMjg3NjczfQ.vUaSRaGd4zpVfGEJ9Axsy2CoDn1rzQ8c4J7HTH6BTQs
        }
    ```

- <b>User Details</b>
    
    <b>Route:</b> /user/ <br>
    <b>Method:</b> GET

    <b>headers</b>
    1. token (Jwt token received from login response)

    <b> Response </b>
    ```js
        "data": {
            "lastName": "kumar",
            "firstName": "Sujit",
            "userName": "sujitKumar",
            "phoneNumber": 9999999999,
            "emailId": "sujit@gmail.com",
            "id": "b10ca0575efc4703b42efdbd74badc09",
            "createdAt": "1560282901239",
            "updatedAt": "1560282901239"
        }
    ```

<b> Product Endpoints </b>

- <b> Add Product </b>
    Add a new Product in Casa one platform

    <b>Route:</b> /product/new<br>
    <b>Method:</b> POST

    <b>headers</b>
    1. token (Jwt token received of admin)

    <b>body</b>

    ```js
    {
        "name": "casa_one_1", 
        "price": "200",
        "priceUnit": "rupees",
        "id": "1" (should be unique)
    }
    ```

    <b>Response</b>
    ```js
        "data":{
            "id": "1" (return the product Id means successfully added)
        }
    ```

- <b> Product Details </b>
    
    <b>Route:</b> /product/:pid (pid is the product Id)<br>
    <b>Method:</b> GET

    <b>Response</b>
    ```js
        "data": {
            "name": "casa_one_1",
            "price": "200",
            "priceUnit": "rupees",
            "id": "1",
            "rating":"4",
            "createdAt": "1560284860373",
            "updatedAt": "1560284860373"
        }
    ``` 

- <b> Get All Product Details </b>

    <b>Route:</b> /product<br>
    <b>Method:</b> GET

    <b>Response</b>
    ```js
        "data": [
            {
            "name": "casa_one_1",
            "price": "200",
            "priceUnit": "rupees",
            "id": "1",
            "rating":"4",
            "createdAt": "1560284860373",
            "updatedAt": "1560284860373"
            }
        ]
    ``` 

<b> Order Endpoint </b>

- <b>Place Order</b><br>
    Place an order to rent a product

    <b>Route:</b> /order/new <br>
    <b>Method:</b> POST

    <b>headers</b>
    1. token (Jwt token received from login response)

    <b>body</b>
    ```js
    {
	    "productId": "1",
	    "form": "rent"
    }
    ```

    <b>Response</b>
    ```js
        "data":{
            "id": "1" (return the order Id, means order placed successfully )
        }
    ```

- <b>Order Details</b><br>
    Return the user order details

    <b>Route:</b> /order/:id <br>
    <b>Method:</b> GET

    <b>headers</b>
    1. token (Jwt token received from login response)

    <b>Response</b>
    ```js
    "data": {
        "userId": "b10ca0575efc4703b42efdbd74badc09",
        "productId": "1",
        "form": "rent",
        "id": "dce889277ff44d84a10d9c24259de257",
        "createdAt": "1560285346022",
        "updatedAt": "1560285346022"
    }
    ```

<b>Ratings</b>
    
- <b>Product Rating</b>
    User rate the product 

    <b>Route:</b> /rating/ <br>
    <b>Method:</b> POST

    <b>headers</b>
    1. token (Jwt token received from login response)

    <b>body</b>
    ```js
    {
        "productId": "1",
        "rating": 2
    }
    ```

    <b>Response</b>
    ```js
    "data": {
        "id": "a2e8809e2c054122bb71fb06c818dbab" (return the Rating Id means successfully rated)
    }
    ```

- <b>Update Product Rating</b>
    User rate the product 

    <b>Route:</b> /rating/ <br>
    <b>Method:</b> PUT

    <b>headers</b>
    1. token (Jwt token received from login response)

    <b>body</b>
    ```js
    {
        "productId": "1",
        "rating": 2
    }
    ```

    <b>Response</b>
    ```js
    "data": {
        "id": "a2e8809e2c054122bb71fb06c818dbab" (return the Rating Id means successfully rated)
    }
    ```

- <b>User's Rating on Product</b>
    What user rated for a product

    <b>Route:</b>/rating/user/:pid (pid is the product Id) <br>
    <b>Method:</b> GET

    <b>headers</b>
    1. token (Jwt token received from login response)

    <b>Response</b>
    ```js
    "data": {
        "verifiedUser": false, (means user rented this product, if yes then true else false)
        "userId": "028d41e71b49424a9381273e21f7b66d",
        "rating": 2,
        "productId": "1",
        "id": "a2e8809e2c054122bb71fb06c818dbab",
        "createdAt": "1560307002525",
        "updatedAt": "1560307002525"
    }
    ```

- <b>Get Product Rating </b>

    <b>Route:</b>/rating/:pid (pid is the product Id) <br>
    <b>Method:</b> GET


    <b>Response</b>
    ```js
    "data": {
        "rating": 2.5, (rating of the product)
        "total": 2, (number of users rated this product)
        "productId": "1" 
    },
    ```













