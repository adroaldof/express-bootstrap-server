# Express Generic Server

This is an initial Express bootstrap project. It is already configured with an opinionated modules to make you start to develop as soon as possible.

### Clone this project

In order to work with this project just go to you working directory and clone this repo with the follow command

```bash
git clone git@github.com:adroaldof/express-bootstrap-server.git
```

Now you can choose any of the follow ways to start working with it


## Running with [Docker Compose](https://www.docker.com/compose/)

Your are a developer and if your are a like me your are lazy and like to code as soon as possible. You can get that with the follow command

```bash
docker-compose up
```

The first time it will download the [Docker Node 9.5.0-onbuild](https://github.com/nodejs/docker-node/blob/db3b27c8388136b5e529861d7c3fa12fd8328301/9/onbuild/Dockerfile) image and make all havy lift for you. At the end it will start the server and every changes at your `src` path will be reflected in the container

Ok. Now let's get your hands dirty or better not :stuck_out_tongue_closed_eyes:


## Running with [Docker](https://www.docker.com/)

With docker we can run a few steps and get all things running like a charm too.

1. Go to your cloned project

1. Build your project
```bash
docker build -t $(whoami)/generic-express-api .
```
The `$(whoami)` part you can choose what ever you want. In this exemple it will get you user and tag the image with `$(whoami)/generic-express-api` when you check with `docker images` command.

1. Now lets fire up the project
```bash
docker run -it -p 3000:3000 -v $(pwd):/usr/src/app $(whoami)/generic-express-api
```
With this `-it` will keep showing you the logs on console. The [Create React App]() runs at port `3000` as default. You can change the first part to run at other port on your computer like `-p 8000:3000`. And the great part is that all changes you make at your `src` directory you get an auto reaload with `-v $(pwd):/usr/src/app/`. The last part is the image builted at step 2

Now you are good to go :wink:

## Running locally

Ok. You don't like that fancy Docker stuff and need to make sure that every thing, or almost every thing, is in your hands. You can follow the steps bellow.

The node version used on this project is at `.nvmrc`. You can install it on your computer (not recommended) or use [NVM](https://github.com/creationix/nvm) to manage all your node versions.

1. Go to your cloned project

1. If you do not have `.nvmrc` Node version installed
```bash
nvm install
```

1. If you have the `.nvmrc` Node version just run
```bash
nvm use
```

1. Install all dependencies
```bash
npm install
```

1. Run project
```bash
npm start
```


---

### Some Tools Used This Project

Here are some awesome tools that helped to build this project
[Express](https://www.npmjs.com/package/express),
[PG](https://www.npmjs.com/package/pg),
[Knex](https://www.npmjs.com/package/knex),
[Babel](https://www.npmjs.com/package/babel-cli),
[Supervisor](https://www.npmjs.com/package/supervisor),
[Eslint](https://www.npmjs.com/package/eslint),
[Supervisor](https://www.npmjs.com/package/supervisor),
[Morgan](https://www.npmjs.com/package/morgan),
[Winston](https://www.npmjs.com/package/winston),
[Mocha](https://www.npmjs.com/package/mocha),
[Chai](https://www.npmjs.com/package/chai),
[Joi](https://www.npmjs.com/package/joi),
[Sinon](https://www.npmjs.com/package/sinon),
[Istanbul](https://www.npmjs.com/package/istanbul),
[GitLab CI](https://about.gitlab.com/gitlab-ci/),
[AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)


---

Enjoy :+1:
