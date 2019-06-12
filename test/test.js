const RequestPromise = require('request-promise');
const Chai = require('chai');

let url = "http://localhost:3000/v1"


describe("1. User Routes", function () {

    describe("Register", function () {

        it('status', function (done) {

            let body = {
                "firstName": "Sujit",
                "lastName": "kumar",
                "userName": "sujitKumr6",
                "phoneNumber": "9999999094",
                "emailId": "sujit8@gmail.com",
                "password": "12345"
            };


            let options = {

                'uri': `${url}/user/register`,
                'method': 'POST',
                'body': body,
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });


    });
    describe("login", function () {

        it('status', function (done) {

            let body = {
                "emailId": "sujit8@gmail.com",
                "password": "12345"
            };


            let options = {

                'uri': `${url}/user/login`,
                'method': 'POST',
                'body': body,
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });
    });
});



describe("2. Order Routes", function () {

    describe("place Order", function () {

        it('status', function (done) {

            let body =
                {
                    "productId": "1",
                    "form": "rent"
                }



            let options = {

                'uri': `${url}/order/new`,
                'method': 'POST',
                'body': body,
                'headers': {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMTBjYTA1NzVlZmM0NzAzYjQyZWZkYmQ3NGJhZGMwOSIsImlhdCI6MTU2MDI4NDA3MywiZXhwIjoxNTYwMjg3NjczfQ.vUaSRaGd4zpVfGEJ9Axsy2CoDn1rzQ8c4J7HTH6BTQs'
                },
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });


    });
    describe("order details", function () {

        it('status', function (done) {


            let options = {

                'uri': `${url}/order/dce889277ff44d84a10d9c24259de257`,
                'method': 'GET',
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });
    });
});

//rating test
describe("3. Rating Routes", function () {

    describe("Product  Rating", function () {

        it('status', function (done) {

            let body = {
                "productId": "2",
                "rating": 2
            }

            let options = {

                'uri': `${url}/rating`,
                'method': 'POST',
                'body': body,
                'headers': {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMTBjYTA1NzVlZmM0NzAzYjQyZWZkYmQ3NGJhZGMwOSIsImlhdCI6MTU2MDI4NDA3MywiZXhwIjoxNTYwMjg3NjczfQ.vUaSRaGd4zpVfGEJ9Axsy2CoDn1rzQ8c4J7HTH6BTQs'
                },
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });


    });
    describe("Get User's Product Rating", function () {

        it('status', function (done) {


            let options = {

                'uri': `${url}/rating/user/1`,
                'method': 'GET',
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });
    });
    describe("Update product Rating", function () {

        it('status', function (done) {

            let body = {
                "productId": "2",
                "rating": 3
            }

            let options = {

                'uri': `${url}/rating`,
                'method': 'PUT',
                'body': body,
                'headers': {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMTBjYTA1NzVlZmM0NzAzYjQyZWZkYmQ3NGJhZGMwOSIsImlhdCI6MTU2MDI4NDA3MywiZXhwIjoxNTYwMjg3NjczfQ.vUaSRaGd4zpVfGEJ9Axsy2CoDn1rzQ8c4J7HTH6BTQs'
                },
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });
    });

    describe("GET product Rating", function () {

        it('status', function (done) {


            let options = {

                'uri': `${url}/rating/1`,
                'method': 'GET',
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });
    });
});


describe("2. Product Routes", function () {

    describe("get all Product", function () {

        it('status', function (done) {


            let options = {

                'uri': `${url}/product`,
                'method': 'GET',
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });


    });
    describe("get product details", function () {

        it('status', function (done) {


            let options = {

                'uri': `${url}/product/1`,
                'method': 'GET',
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });
    });

    describe("add product", function () {

        it('status', function (done) {


            let options = {

                'uri': `${url}/product/new`,
                'method': 'POST',
                'body': {
                    "name": "casa_one_1",
                    "price": "200",
                    "priceUnit": "rupees",
                    "id": "1"
                },
                'headers': {
                    'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.LKX86Pktpx2NUG3w51UQTq6vSf3wF_RHe0WOjfZjkhI"
                },
                'json': true

            }
            RequestPromise(options)
                .then(function (response) {
                    Chai.expect(response.status.code).to.equal(200);
                    done();
                });
        });
    });
});