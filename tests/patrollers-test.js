'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('tests for /patrollers', function() {
    describe('tests for post', function() {
        it('should respond 200 for "Successfully created a new ski patroller"', function() {
            var response = request('post', 'http://localhost:5000/patrollers', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
    
    describe('tests for get', function() {
        it('should respond 200 for "Successfully returned patrollers"', function() {
            var response = request('get', 'http://localhost:5000/patrollers', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
});