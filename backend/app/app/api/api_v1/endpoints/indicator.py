import asyncio
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.schemas.indicator import MonthlyIndicator, MonthlyIndicatorSearchResults

router = APIRouter()


@router.get(
    "/monthly/{country}", status_code=200, response_model=MonthlyIndicatorSearchResults
)
def fetch_monthly_indicators(
    *,
    country: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Fetch all indicators of that country
    """
    result = crud.monthly_indicator.get_by_country(db=db, country=country)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Country named {country} not found"
        )

    return result


# @router.get("/search/", status_code=200, response_model=MonthlyIndicatorSearchResults)
# async def search_recipes(
#     *,
#     keyword: str = Query(None, min_length=3, example="chicken"),
#     max_results: Optional[int] = 10,
#     db: Session = Depends(deps.get_db),
# ) -> dict:
#     """
#     Search for recipes based on label keyword
#     """
#     recipes = crud.recipe.get_multi(db=db, limit=max_results)
#     results = filter(lambda recipe: keyword.lower() in recipe.label.lower(), recipes)

#     return {"results": list(results)}
