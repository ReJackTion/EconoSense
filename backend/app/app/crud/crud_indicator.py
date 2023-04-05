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
    def get_by_country(
        self, db: Session, country: str, *, skip: int = 0, limit: int = 5000
    ):
        result = (
            db.query(self.model)
            .filter(self.model.country.contains(country))
            .order_by(self.model.period)
            .offset(skip)
            .limit(limit)
            .all()
        )
        return result


class CRUDQuarterlyIndicator(
    CRUDBase[QuarterlyIndicator, QuarterlyIndicatorCreate, QuarterlyIndicatorUpdate]
):
    pass


monthly_indicator = CRUDMonthlyIndicator(MonthlyIndicator)
quarterly_indicator = CRUDQuarterlyIndicator(QuarterlyIndicator)
