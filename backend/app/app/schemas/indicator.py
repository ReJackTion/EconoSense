from pydantic import BaseModel

from typing import Sequence
from datetime import date


class IndicatorBase(BaseModel):
    period: date
    country: str


class IndicatorBase(IndicatorBase):
    bci: float
    bci_nor: float
    bci_pc: float
    cci: float
    cci_nor: float
    cci_pc: float
    government_reserves: float
    government_reserves_nor: float
    government_reserves_pc: float
    industrial_production: float
    industrial_production_nor: float
    industrial_production_pc: float
    inflation_growth_rate: float
    inflation_growth_rate_nor: float
    inflation_growth_rate_pc: float
    long_term_interest: float
    long_term_interest_nor: float
    long_term_interest_pc: float
    ppi_growth_rate: float
    ppi_growth_rate_nor: float
    ppi_growth_rate_pc: float
    qgdp: float
    qgdp_nor: float
    qgdp_pc: float
    share_price: float
    share_price_nor: float
    share_price_pc: float
    short_term_interest: float
    short_term_interest_nor: float
    short_term_interest_pc: float
    trade_in_goods: float
    trade_in_goods_nor: float
    trade_in_goods_pc: float
    unemployment_rate: float
    unemployment_rate_nor: float
    unemployment_rate_pc: float


class IndicatorCreate(IndicatorBase):
    pass


class IndicatorUpdate(IndicatorBase):
    id: int


# Properties shared by models stored in DB
class IndicatorInDBBase(IndicatorBase):
    id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Indicator(IndicatorInDBBase):
    pass


# Properties properties stored in DB
class IndicatorInDB(IndicatorInDBBase):
    pass


class IndicatorSearchResults(BaseModel):
    results: Sequence[Indicator]
