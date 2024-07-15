# GYG Admin Panel
This repository serves as the robust backend infrastructure that empowers Guzman Y Gomez's comprehensive admin panel, a central hub for GYG's operational teams, including the operation, customer service, marketing, menu team, and other key stakeholders within the organization. Designed with precision and powered by NestJS, this backend repository acts as the backbone of GYG's administrative ecosystem.

Beyond internal stakeholders, this backend orchestrates the seamless integration of external services through APIs, notably enhancing the admin panel's functionality. It streamlines the flow of data, optimizes operations, and facilitates real-time decision-making.

## Description

This repository is using the [Nest](https://github.com/nestjs/nest) Node.js framework.

## Connect to the GyG Private NPM registry

First login to AWS SSO, and connect to apps.test on the CLI

Then login to the npm repository by running the following command:

```
aws codeartifact login --tool npm --repository bhyve --domain gyg-internal-npm-repo && [ $(grep -c always-auth ~/.npmrc) = 0 ] && echo "//gyg-internal-npm-repo-632572904405.d.codeartifact.ap-southeast-2.amazonaws.com/npm/bhyve/:always-auth=true" >> ~/.npmrc
```

## Installation

```bash
$ yarn install
```

## Connect to Internal VPN

https://gyg-wiki.atlassian.net/wiki/spaces/BHYV/pages/2315485424/Self+serve+vpn+user+guide+using+AWS+SSO

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run in docker environment

Before starting, the docker build requires the authenticated `.npmrc` file, so

```bash
cp ~/.npmrc .
```

### Docker

```bash
# build image
docker build -t gyg-resto365 .

# run container
docker run --env-file docker.env -p 3000:3000 gyg-resto365
```

### Docker Compose

```bash
# rebuild the image when there are source changes
docker compose build
# deploy docker container with image
docker compose up

# detached mode
docker compose up --detach
# tail logs
docker compose logs -f
```
test

Test by requesting `http://localhost:3000/health`

## Support

Reach out to the Slack channel `gyg-adminsphere`, run by Moji
