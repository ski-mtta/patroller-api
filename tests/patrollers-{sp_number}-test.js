'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

describe('tests for /patrollers/{sp_number}', function() {
    describe('tests for get', function() {
        it('should respond 200 for "Successfully returned patroller"', function() {
            var response = request('get', 'http://localhost:5000/patrollers/14320249', { 
                'time': true
            });

            expect(response).to.have.status(200);
            return chakram.wait();
        });
    
    });
});