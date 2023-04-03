import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import base  # noqa: F401
from app.core.config import settings
from app.core.preprocessing import get_DBnomics_data

logger = logging.getLogger(__name__)


RECIPES = [
    {
        "id": 1,
        "label": "Chicken Vesuvio",
        "source": "Serious Eats",
        "url": "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
    },
    {
        "id": 2,
        "label": "Chicken Paprikash",
        "source": "No Recipes",
        "url": "http://norecipes.com/recipe/chicken-paprikash/",
    },
    {
        "id": 3,
        "label": "Cauliflower and Tofu Curry Recipe",
        "source": "Serious Eats",
        "url": "http://www.seriouseats.com/recipes/2011/02/cauliflower-and-tofu-curry-recipe.html",  # noqa
    },
]


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next line
    # Base.metadata.create_all(bind=engine)

    monthly_db_data, quarterly_db_data = get_DBnomics_data()

    for row in monthly_db_data.itertuples(index=False):
        monthly_data_in = schemas.MonthlyIndicatorCreate(
            period=row[0],
            country=row[1],
            bci=row[2],
            cci=row[3],
            government_reserves=row[4],
            industrial_production=row[5],
            inflation_index=row[6],
            inflation_growth_rate=row[7],
            long_term_interest=row[8],
            ppi_index=row[9],
            ppi_growth_rate=row[10],
            share_price=row[11],
            short_term_interest=row[12],
            trade_in_goods=row[13],
            unemployment_rate=row[14],
        )
        crud.monthly_indicator.create(db, obj_in=monthly_data_in)

    for row in quarterly_db_data.itertuples(index=False):
        quarterly_data_in = schemas.QuarterlyIndicatorCreate(
            period=row[0], country=row[1], qgdp=row[2]
        )
        crud.quarterly_indicator.create(db, obj_in=quarterly_data_in)

    if settings.db.FIRST_SUPERUSER:
        user = crud.user.get_by_email(db, email=settings.db.FIRST_SUPERUSER)
        if not user:
            user_in = schemas.UserCreate(
                full_name="Initial Super User",
                email=settings.db.FIRST_SUPERUSER,
                is_superuser=True,
                password=settings.db.FIRST_SUPERUSER_PW,
            )
            user = crud.user.create(db, obj_in=user_in)  # noqa: F841
        else:
            logger.warning(
                "Skipping creating superuser. User with email "
                f"{settings.db.FIRST_SUPERUSER} already exists. "
            )
        if not user.recipes:
            for recipe in RECIPES:
                recipe_in = schemas.RecipeCreate(
                    label=recipe["label"],
                    source=recipe["source"],
                    url=recipe["url"],
                    submitter_id=user.id,
                )
                crud.recipe.create(db, obj_in=recipe_in)
    else:
        logger.warning(
            "Skipping creating superuser.  FIRST_SUPERUSER needs to be "
            "provided as an env variable. "
            "e.g.  FIRST_SUPERUSER=admin@api.coursemaker.io"
        )
