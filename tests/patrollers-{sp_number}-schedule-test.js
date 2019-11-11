'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('tests for /patrollers/{sp_number}/schedule', function() {
    describe('tests for get', function() {
        it('should respond 200 for "Successfully returned patroller schedule"', function() {
            var response = request('get', 'http://localhost:5000/patrollers/12734049/schedule', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
    
    describe('tests for post', function() {
        it('should respond 200 for "Successfully returned patroller schedule"', function() {
            var response = request('post', 'http://localhost:5000/patrollers/-2499789/schedule', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
});