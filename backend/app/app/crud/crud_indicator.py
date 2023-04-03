from typing import Union

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.indicator import MonthlyIndicator, QuarterlyIndicator
from app.schemas.indicator import (
    MonthlyIndicatorCreate,
    MonthlyIndicatorUpdate,
    QuarterlyIndicatorCreate,
    QuarterlyIndicatorUpdate,
)


class CRUDMonthlyIndicator(
    CRUDBase[MonthlyIndicator, MonthlyIndicatorCreate, MonthlyIndicatorUpdate]
):
    pass


class CRUDQuarterlyIndicator(
    CRUDBase[QuarterlyIndicator, QuarterlyIndicatorCreate, QuarterlyIndicatorUpdate]
):
    pass


monthly_indicator = CRUDMonthlyIndicator(MonthlyIndicator)
quarterly_indicator = CRUDQuarterlyIndicator(QuarterlyIndicator)
