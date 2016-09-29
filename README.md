# githubber

An HTTP API able to retrieve information about github repositories, and to
present them in a simple form to the user.

* [Installation](#install)
* [Usage](#usage)
* [API](#api)
* [License](#license)

## Install

```
git clone
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

## License

Licensed under [MIT](./LICENSE).
