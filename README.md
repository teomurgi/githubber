# githubber

A Restful API able to retrieve information about github repositories, and to
present them in a simple form to the user.

* [Installation](#install)
* [Usage](#usage)
* [API](#api)
* [Authentication](#authentication)
* [License](#license)

## Install

```
git clone https://github.com/teomurgi/githubber.git
cd githubber
npm i
```

### Supported systems

**githubber** is supported on Linux and Mac OS X.
It has been tested with Node.js **6.6.0**.

## Usage

### Command Line

From the project folder:

```
 Usage: bin/githubber <keys_file>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

### Keys File

It is a text file containing the enabled apikeys.
All the request towards githubber must have a special header **apikey** contining one of the allowed 
keys listed in this file.

## API

Githubber listens on port **3000**.

### GET /repos

Provides a generic list of repositories.
```
curl --header "apikey:<YOUR_APIKEY>" http://<HOSTNAME>:3000/repos

```

### GET /repos/:id

Provides details about a particular repository.
```
curl --header "apikey:<YOUR_APIKEY>" http://<HOSTNAME>:3000/repos/<REPOSITORY_ID>

```

### GET /repos/search/:query

Gets all the repos matching the provided query.
Such query must be complieant with the [github query format](https://help.github.com/articles/searching-repositories/).
```
curl --header "apikey:<YOUR_APIKEY>" http://<HOSTNAME>:3000/repos/search/<YOUR_QUERY>

```

## Authentication

The authentication that has been implemented is very simple.
It has several weaknesses:
* The keys are stored unencrypted on the filesystem
* Now githubber supports only http, thus the apikeys travel not encrypted, so anyone can steal them
* They do not get renewed automatically, this is unsecure too


## License

Licensed under [MIT](./LICENSE).
