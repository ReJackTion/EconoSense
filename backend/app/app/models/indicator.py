from sqlalchemy import Column, Integer, String, FLOAT, DateTime

from app.db.base_class import Base


class MonthlyIndicator(Base):
    id = Column(Integer, primary_key=True, index=True)
    period = Column(DateTime, nullable=False)
    country = Column(String(256), nullable=False)
    bci = Column(FLOAT(precision=32), nullable=True)
    cci = Column(FLOAT(precision=32), nullable=True)
    government_reserves = Column(FLOAT(precision=32), nullable=True)
    industrial_production = Column(FLOAT(precision=32), nullable=True)
    inflation_index = Column(FLOAT(precision=32), nullable=True)
    inflation_growth_rate = Column(FLOAT(precision=32), nullable=True)
    long_term_interest = Column(FLOAT(precision=32), nullable=True)
    ppi_index = Column(FLOAT(precision=32), nullable=True)
    ppi_growth_rate = Column(FLOAT(precision=32), nullable=True)
    share_price = Column(FLOAT(precision=32), nullable=True)
    short_term_interest = Column(FLOAT(precision=32), nullable=True)
    trade_in_goods = Column(FLOAT(precision=32), nullable=True)
    unemployment_rate = Column(FLOAT(precision=32), nullable=True)


class QuarterlyIndicator(Base):
    id = Column(Integer, primary_key=True, index=True)
    period = Column(DateTime, nullable=False)
    country = Column(String(256), nullable=False)
    qgdp = Column(FLOAT(precision=32), nullable=True)
