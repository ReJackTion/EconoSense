import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import base  # noqa: F401
from app.core.config import settings
from app.core.etl import etl

logger = logging.getLogger(__name__)


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)

    etl(db)
    #     logger.warning(
    #         "Skipping creating superuser.  FIRST_SUPERUSER needs to be "
    #         "provided as an env variable. "
    #         "e.g.  FIRST_SUPERUSER=admin@api.coursemaker.io"
    #     )
