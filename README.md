# Software Design Project 2

## Description
This project is a CRUD example implemented on a micro services and container architecture 

## Pre requisites
Your machine must have installed docker to be able to run this project

## To start setting up the project
Step 1: Clone the repo

```bash
git clone https://github.com/KemJiga/Software-design-project-2.git
```

Step 2: Cd into each micro service and run:

```bash
npm install
```

Step 3: On every micro service put your credentials on a .env file.

```bash
PORT=YOUR PORT
MONGODB_URI=YOUR MONGODB URI
```

Step 4: Cd back to root dir and run:

```bash
docker compose up
```

## Usage
To use this project, you can either make requests from a rest client or connect it directly to the front-end


## Author

- [**KemJiga**](https://www.linkedin.com/in/kemjiga/)

## License

This project is licensed under the MIT License.