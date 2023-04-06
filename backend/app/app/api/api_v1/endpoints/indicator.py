import asyncio
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.schemas.indicator import Indicator

router = APIRouter()


@router.get(
    "/all_indicators/{country}", status_code=200, response_model=list[Indicator]
)
def fetch_indicators(
    *,
    country: str,
    start_date: str = None,
    end_date: str = None,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch all indicators of that country
    """
    result = crud.indicator.get_by_country(
        db=db, country=country, start_date=start_date, end_date=end_date
    )
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Country named {country} not found"
        )

    return result


@router.get("/all_country_list", status_code=200)
def fetch_indicators(
    *,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch list of all country in DB
    """
    result = crud.indicator.get_all_country_list(db=db)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"There is no country in the database"
        )

    country_list = []
    for country in result:
        country_list.append(country["country"])

    res = {"country_list": sorted(country_list)}

    return res
