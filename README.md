## Concept

AIDNA_COMPTA is an accounting application specifically created for the AIDNA association.
It will facilitate the accounting management of the association and its visibility with the various volunteers by applying different access rights.

## Setup & Use

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- Run command `npm run setup`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `setup` : Initialization of frontend and backend, as well as all toolings
- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Technics specificity

- _React_ : JavaScript library
- _Axios_ : full set of features for making HTTP requests
- _Tailwind_ : framework for CSS
- _Toastify_ : for React notification
- _chartJs_ : for data visualization.
- _Express_ : an application infrastructure (framework), written in JavaScript for nade.Js
- _PostgreSQL_ : data base
- _Prisma_ : ORM FOR NODE.JS
- _JOI_ : 
- _Cookie_Parser_ :
- _Argon2_ :
- _JsonWebToken (JWT)_ :
- _Multer_ :
- _NodeMailer_ :
- _Brevo_ :
- _Jest_ :
- _SuperTest_ :
- _Babel_ :

