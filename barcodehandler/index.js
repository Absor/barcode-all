var request = require('request');
var stdin = process.stdin;
stdin.resume();

var bookUserInfo = {
    email: 'test@test.com',
    password: 'test'
};

var foodUserInfo = {
    email: 'test@test.com',
    password: 'test'
};

var command = null;

stdin.on('data', function (data) {
    var trimmed = data.toString().trim();
    if (trimmed === 'reset') {
        command = null;
    } else if (trimmed !== 'reset' && command !== null) {
        switch (command) {
            case 'add book':
                addBook(trimmed);
                break;
            case 'remove book':
                removeBook(trimmed);
                break;
            case 'add food':
                addFood(trimmed);
                break;
            case 'remove food':
                removeFood(trimmed);
                break;
        }
        command = null;
    } else {
        command = trimmed;
    }
});

// BOOKS

var bookServiceToken = null;
var bookServiceTokenRefreshed = Date.now();

function loginToBookService(callback) {
    if (Date.now() - bookServiceTokenRefreshed > 14400000) {
        bookServiceToken = null;
    }

    if (bookServiceToken !== null) {
        callback();
        return;
    }

    request.post(
        {url: 'http://localhost:9000/auth/local', json: bookUserInfo, jar: true},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                bookServiceToken = body.token;
                bookServiceTokenRefreshed = Date.now();
                callback();
            }
        }
    );
}

function addBook(isbn) {
    loginToBookService(function() {
        request.post(
            {
                url: 'http://localhost:9000/api/things',
                json: {isbn: isbn},
                headers: {
                    'Authorization': 'Bearer ' + bookServiceToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 201) {
                    console.log('book added');
                }
            }
        );
    });
}

function removeBook(isbn) {
    loginToBookService(function() {
        request.del(
            {
                url: 'http://localhost:9000/api/things',
                json: {isbn: isbn},
                headers: {
                    'Authorization': 'Bearer ' + bookServiceToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('book deleted');
                }
            }
        );
    });
}

// FOODS

var foodServiceToken = null;
var foodServiceTokenRefreshed = Date.now();

function loginToFoodService(callback) {
    if (Date.now() - foodServiceTokenRefreshed > 14400000) {
        foodServiceToken = null;
    }

    if (foodServiceToken !== null) {
        callback();
        return;
    }

    request.post(
        {url: 'http://food.tassi.fi/auth/local', json: foodUserInfo, jar: true},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                foodServiceToken = body.token;
                foodServiceTokenRefreshed = Date.now();
                callback();
            }
        }
    );
}

function addFood(barcode) {
    loginToFoodService(function() {
        request.post(
            {
                url: 'http://food.tassi.fi/api/products/add',
                json: {code: barcode},
                headers: {
                    'Authorization': 'Bearer ' + foodServiceToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 201) {
                    console.log('food added');
                }
            }
        );
    });
}

function removeFood(barcode) {
    loginToFoodService(function() {
        request.del(
            {
                url: 'http://food.tassi.fi/api/products/'+barcode+'/remove',
                headers: {
                    'Authorization': 'Bearer ' + foodServiceToken
                }
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log('food deleted');
                }
            }
        );
    });
}