# HASURA GraphQL example with docker 
## how to setup 


## Features

- Get users with paginate
- Get user by radius

## Installation

Requires [Node.js](https://nodejs.org/) v10+,  [Docker](https://www.docker.com/) and [Hasura CLI](https://hasura.io/) to run. 

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/vipin733/hasura-graph.git
cd hasura-graph
cp .env.example .env
```

## RUNING PROJECT

root folder
```sh
docker-compose up
cd hasura && hasura console
