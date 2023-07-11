## Local Setup & Run Frontend (requires backend to be running)

1. Install nodejs (>=v14) & npm
2. `cd frontend`
3. `yarn`
4. `yarn start`

## Local Server Setup

### Non-Docker (see next sections for running with Docker)

1. `pip install poetry` (or safer, follow the instructions: https://python-poetry.org/docs/#installation)
2. Install dependencies `cd` into the directory where the `pyproject.toml` is located then `poetry install`
3. Run the initial Alembic revision migration version via poetry with the Alembic command(only required once): `poetry run alembic revision --autogenerate -m "Init migration"`
4. Run the DB migrations via poetry `poetry run python prestart.py` (only required once) (Unix users can use
   the bash script if preferred)
5. [UNIX]: Run the FastAPI server via poetry with the bash script: `poetry run ./run.sh`
6. [WINDOWS]: Run the FastAPI server via poetry with the Python command: `poetry run python app/main.py`
7. Open http://localhost:8001/
8. To stop the server, press CTRL+C

### Run with Docker (see previous sections for running without Docker)

Make sure you have Docker and [Docker Compose](https://docs.docker.com/compose/install/) installed.

1. Run `docker-compose -f docker-compose.local.yml up -d` (this will download the postgres
   image and build the image for the recipe app - takes about 5 mins)
2. Run `docker ps`to run the container
3. Visit `http://localhost:1000` for frontend
4. Visit `http://localhost:8001/docs` for backend
5. Run `docker-compose -f docker-compose.local.yml down` to shut down the container

Windows Users: Having problems getting the volume to work properly? Review the following resources:

- [Docker on Windows - Mounting Host Directories](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c?gi=324e01b3473a)
- [Configuring Docker for Windows Shared Drives](https://docs.microsoft.com/en-gb/archive/blogs/stevelasker/configuring-docker-for-windows-volumes)
- You also may need to add `COMPOSE_CONVERT_WINDOWS_PATHS=1` to the environment portion of your Docker Compose file.

### Mailgun setup

- Signup for a free account at [mailgun](https://www.mailgun.com/)
- Get your API Key and Domain name and set them as environment variables to match the config.py file (or use a .env in your backend/app directory)
- Set your [authorized recipient](https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients) email addresses
