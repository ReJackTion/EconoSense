from pydantic import BaseModel

from typing import Sequence


class IndicatorBase(BaseModel):
    period: str
    country: str


class MonthlyIndicatorBase(IndicatorBase):
    bci: float
    cci: float
    government_reserves: float
    industrial_production: float
    inflation_index: float
    inflation_growth_rate: float
    long_term_interest: float
    ppi_index: float
    ppi_growth_rate: float
    share_price: float
    short_term_interest: float
    trade_in_goods: float
    unemployment_rate: float


class MonthlyIndicatorCreate(MonthlyIndicatorBase):
    pass


class MonthlyIndicatorUpdate(MonthlyIndicatorBase):
    id: int


# Properties shared by models stored in DB
class MonthlyIndicatorInDBBase(MonthlyIndicatorBase):
    id: int

    class Config:
        orm_mode = True


# Properties to return to client
class MonthlyIndicator(MonthlyIndicatorInDBBase):
    pass


# Properties properties stored in DB
class MonthlyIndicatorInDB(MonthlyIndicatorInDBBase):
    pass


class MonthlyIndicatorSearchResults(BaseModel):
    results: Sequence[MonthlyIndicator]


class QuarterlyIndicatorBase(IndicatorBase):
    qgdp: float


class QuarterlyIndicatorCreate(QuarterlyIndicatorBase):
    pass


class QuarterlyIndicatorUpdate(QuarterlyIndicatorBase):
    id: int


# Properties shared by models stored in DB
class QuarterlyIndicatorInDBBase(QuarterlyIndicatorBase):
    id: int

    class Config:
        orm_mode = True


# Properties to return to client
class QuarterlyIndicator(QuarterlyIndicatorInDBBase):
    pass


# Properties properties stored in DB
class QuarterlyIndicatorInDB(QuarterlyIndicatorInDBBase):
    pass


class QuarterlyIndicatorSearchResults(BaseModel):
    results: Sequence[QuarterlyIndicator]
