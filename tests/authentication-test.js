'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('tests for /authentication', function() {
    describe('tests for post', function() {
        it('should respond 200 for "Successfully Logged In"', function() {
            var response = request('post', 'http://localhost:5000/authentication', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
});