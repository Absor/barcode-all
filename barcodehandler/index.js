var request = require('request');
var stdin = process.stdin;
stdin.resume();

var userInfo = {
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
                break;
            case 'remove food':
                break;
        }
        command = null;
    } else {
        command = trimmed;
    }
});

var token = null;
var timeRefreshed = Date.now();

function checkToken(callback) {
    if (Date.now() - timeRefreshed > 14400000) {
        token = null;
    }

    if (token !== null) {
        callback();
        return;
    }

    request.post(
        {url: 'http://localhost:9000/auth/local', json: userInfo, jar: true},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                token = body.token;
                timeRefreshed = Date.now();
                callback();
            }
        }
    );
}

function addBook(isbn) {
    checkToken(function() {
        request.post(
            {
                url: 'http://localhost:9000/api/things',
                json: {isbn: isbn},
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            },
            function (error, response, body) {
                console.log(response.statusCode);
                if (!error && response.statusCode == 201) {
                    token = body.token;
                    timeRefreshed = Date.now();
                    console.log('book added');
                }
            }
        );
    });
}

function removeBook(isbn) {
    checkToken(function() {
        request.del(
            {
                url: 'http://localhost:9000/api/things',
                json: {isbn: isbn},
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            },
            function (error, response, body) {
                console.log(response.statusCode);
                if (!error && response.statusCode == 200) {
                    token = body.token;
                    timeRefreshed = Date.now();
                    console.log('book deleted');
                }
            }
        );
    });
}