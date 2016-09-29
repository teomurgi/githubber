'use strict';

const express = require('express');
const https = require('https');

const reposApi = express.Router();
const cache = new Map();

const commonOptions = {
    hostname: 'api.github.com',
    headers: {
        'User-Agent': 'GithubberAPI'
    }
};

/**
 * Gets a list of repositories
 */
reposApi.get('/', (req, res) => {

    let options = commonOptions;
    options.path = '/repositories';

    https.get(options, (gitHubRes) => {


        let payload = '';

        gitHubRes.on('data', (d) => {
            payload+=d;
        });

        gitHubRes.on('end', () => {
            try {
                payload = JSON.parse(payload);
            }catch(e){
                console.log(e);
                return res.end(JSON.stringify(cache.get(options.path) || []));
            }

            let repositories = [];
            if(typeof payload !== 'array') {
                return res.end(JSON.stringify(cache.get(options.path) || []));
            }
            payload.forEach((repo) => {
                const {id,name} = repo;
                const r = {
                    id,
                    name
                };
                repositories.push(r);
            });

            cache.set(options.path,repositories);
            res.end(JSON.stringify(repositories));
        });

    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
        res.end(JSON.stringify(cache.get(options.path) || []));
    });
});

/**
 * Gets detail of a particular
 */
reposApi.get('/:id', (req, res) => {

    let options = commonOptions;
    options.path = '/repositories/'+req.params.id;

    https.get(options, (gitHubRes) => {


        let payload = '';

        gitHubRes.on('data', (d) => {
            payload+=d;
        });

        gitHubRes.on('end', () => {
            try {
                payload = JSON.parse(payload);
            }catch(e){
                console.log(e);
                return res.end(JSON.stringify(cache.get(options.path) || []));
            }


            if(!!payload.message)
                return res.end(payload.message);

            const {id, name, owner, description, pushed_at, created_at, updated_at} = payload;
            const repo = {
                id, name, description, pushed_at, created_at, updated_at,
                user: {
                    id: owner.id,
                    login: owner.login
                }
            }

            cache.set(options.path,repo);
            res.end(JSON.stringify(repo));
        });

    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
        res.end(JSON.stringify(cache.get(options.path) || []));
    });
});


/**
 * Searches into repository directory
 */
reposApi.get('/search/:query', (req, res) => {

    let options = commonOptions;
    options.path = '/search/repositories?q='+req.params.query;
    https.get(options, (gitHubRes) => {


        let payload = '';

        gitHubRes.on('data', (d) => {
            payload+=d;
        });

        gitHubRes.on('end', () => {
            try {
                payload = JSON.parse(payload);
            }catch(e){
                console.log(e);
                return res.end(JSON.stringify(cache.get(options.path) || []));
            }

            if(payload.total_count===0)
                return res.end('No results');


            let repositories = [];
            payload.items.forEach((repo) => {
                const {id,name,description} = repo;
                const r = {
                    id,
                    name,
                    description
                };
                repositories.push(r);
            });

            cache.set(options.path,repositories);
            res.end(JSON.stringify(repositories));
        });

    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
        res.end(JSON.stringify(cache.get(options.path) || []));
    });
});


module.exports = reposApi;