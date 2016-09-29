'use strict';
const http = require('http');
const express = require('express');
const dns = require('dns');


describe('API', () => {

    describe('repos', () => {

        let app;
        let server;
        let dnsServers = dns.getServers();

        before((done) => {

            app = express();
            app.use('/repos',require('../lib/api'));

            server = app.listen(3001, function () {
                done();
            });

        });

        after((done)=>{
            server.close();
            app = null;
            done();
        });

        describe('GET /repos', () => {

            it('should retrieve a generic list of repositories', (done) => {

                http.get('http://localhost:3001/repos', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {
                        const repos = JSON.parse(payload);
                        expect(repos).to.be.an('array');

                        repos.forEach((repo) => {
                            expect(repo).to.have.property('id');
                            expect(repo).to.have.property('name');
                        });

                        done();
                    });
                });
            });

            it('should use cache in case of error', (done) => {

                http.get('http://localhost:3001/repos', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {

                        dns.setServers(['127.0.0.1']);
                        http.get('http://localhost:3001/repos', (res2) => {
                            expect(res2).to.be.ok;

                            let payload2 = '';

                            res2.on('data', (d) => {
                                payload2+=d;
                            });

                            res2.on('end', () => {
                                expect(payload).to.be.equal(payload2);
                                dns.setServers(dnsServers);
                                done()
                            });
                        });
                    });
                });
            });
        });

        describe('GET /repos/:id', () => {

            it('should retrieve the details of a particular repository', (done) => {

                http.get('http://localhost:3001/repos/1296269', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {
                        const repo = JSON.parse(payload);
                        expect(repo).to.be.an('object');

                        expect(repo).to.have.property('id');
                        expect(repo).to.have.property('name');
                        expect(repo).to.have.property('description');
                        expect(repo).to.have.property('pushed_at');
                        expect(repo).to.have.property('created_at');
                        expect(repo).to.have.property('updated_at');
                        expect(repo).to.have.property('user');
                        expect(repo.user).to.have.property('login');
                        expect(repo.user).to.have.property('id');

                        done();
                    });
                });
            });

            it('should manage the case in which the repo is not found', (done) => {

                http.get('http://localhost:3001/repos/2', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {
                        expect(payload).to.be.equal('Not Found');
                        done();
                    });
                });
            });

            it('should use cache in case of error', (done) => {

                http.get('http://localhost:3001/repos/1296269', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {

                        dns.setServers(['0.0.0.0']);
                        http.get('http://localhost:3001/repos/1296269', (res2) => {
                            expect(res2).to.be.ok;

                            let payload2 = '';

                            res2.on('data', (d) => {
                                payload2+=d;
                            });

                            res2.on('end', () => {
                                expect(payload).to.be.equal(payload2);
                                dns.setServers(dnsServers);
                                done()
                            });
                        });
                    });
                });
            });
        });

        describe('GET /repos/search/:query', () => {

            it('should retrieve all the risults given a specific query', (done) => {

                http.get('http://localhost:3001/repos/search/jquery', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {
                        const repos = JSON.parse(payload);
                        expect(repos).to.be.an('array');

                        repos.forEach((repo) => {
                            expect(repo).to.have.property('id');
                            expect(repo).to.have.property('name');
                            expect(repo).to.have.property('description');
                        });

                        done();
                    });
                });
            });

            it('should manage the case in which there are no results', (done) => {

                http.get('http://localhost:3001/repos/search/djhjskgcskjgfksdjhgfkjzdhg', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {
                        expect(payload).to.be.equal('No results');
                        done();
                    });
                });
            });

            it('should use cache in case of error', (done) => {

                http.get('http://localhost:3001/repos', (res) => {

                    expect(res).to.be.ok;

                    let payload = '';

                    res.on('data', (d) => {
                        payload+=d;
                    });

                    res.on('end', () => {

                        dns.setServers(['127.0.0.1']);
                        http.get('http://localhost:3001/repos', (res2) => {
                            expect(res2).to.be.ok;

                            let payload2 = '';

                            res2.on('data', (d) => {
                                payload2+=d;
                            });

                            res2.on('end', () => {
                                expect(payload).to.be.equal(payload2);
                                dns.setServers(dnsServers);
                                done()
                            });
                        });
                    });
                });
            });
        });

    });



});