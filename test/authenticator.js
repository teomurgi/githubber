'use strict';

const authenticate = require('../lib/authenticator');
const express = require('express');
const http = require('http');

describe('Authenticator', () => {

    let app;
    let server;

    before((done) => {

        app = express();
        app.use(authenticate(['key123']));
        app.use((req,res,next) => {
            res.end('authenticated');
            next();
        });

        server = app.listen(3001, function () {
            done();
        });

    });

    after((done)=>{
        server.close();
        app = null;
        done();
    });

    it('should let authorized apikey through',(done) => {

        http.get({
            hostname:'localhost',
            port: 3001,
            headers: {
                apikey: 'key123'
            }
        }, (res) => {

            expect(res).to.be.ok;

            let payload = '';

            res.on('data', (d) => {
                payload+=d;
            });

            res.on('end', () => {
                expect(payload).to.be.equal('authenticated');
                done();
            });

        });


    });


    it('should discard requests with invalid apikey',(done) => {

        http.get({
            hostname:'localhost',
            port: 3001,
            headers: {
                apikey: 'key1234'
            }
        }, (res) => {

            expect(res.statusCode).to.be.equal(401);
            done()

        });


    });

    it('should discard requests without',(done) => {

        http.get({
            hostname:'localhost',
            port: 3001
        }, (res) => {

            expect(res.statusCode).to.be.equal(401);
            done()

        });


    });

});