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
        self,
        db: Session,
        country: str,
        *,
        skip: int = 0,
        limit: int = 5000,
        start_date: str = None,
        end_date: str = None
    ):
        result = None

        if start_date == None and end_date == None:
            result = (
                db.query(self.model)
                .filter(self.model.country.contains(country))
                .order_by(self.model.period)
                .offset(skip)
                .limit(limit)
                .all()
            )
        elif start_date != None and end_date == None:
            result = (
                db.query(self.model)
                .filter(self.model.country.contains(country))
                .filter(self.model.period >= start_date)
                .order_by(self.model.period)
                .offset(skip)
                .limit(limit)
                .all()
            )
        elif start_date == None and end_date != None:
            result = (
                db.query(self.model)
                .filter(self.model.country.contains(country))
                .filter(self.model.period <= end_date)
                .order_by(self.model.period)
                .offset(skip)
                .limit(limit)
                .all()
            )
        else:  # start_date != None and end_date != None:
            result = (
                db.query(self.model)
                .filter(self.model.country.contains(country))
                .filter(self.model.period >= start_date)
                .filter(self.model.period <= end_date)
                .order_by(self.model.period)
                .offset(skip)
                .limit(limit)
                .all()
            )

        return result

    def get_all_country_list(self, db: Session, *, skip: int = 0, limit: int = 5000):
        result = db.query(self.model.country).distinct().offset(skip).limit(limit).all()
        return result


class CRUDQuarterlyIndicator(
    CRUDBase[QuarterlyIndicator, QuarterlyIndicatorCreate, QuarterlyIndicatorUpdate]
):
    pass


monthly_indicator = CRUDMonthlyIndicator(MonthlyIndicator)
quarterly_indicator = CRUDQuarterlyIndicator(QuarterlyIndicator)
