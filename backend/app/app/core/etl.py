import pandas as pd
import re
from app.api.deps import get_dbnomics_client
from sqlalchemy.orm import Session

from app import crud, schemas

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def rename_col_Name(df: pd.DataFrame) -> pd.DataFrame:
    # define the regular expression pattern to match the brackets and the string inside them
    pattern = r"\s*\([^)]*\)"

    # loop through each column in the dataframe
    for col in df.columns:
        # remove the pattern from the column name using regex
        new_col_name = re.sub(pattern, "", col)
        # rename the column in the dataframe
        df.rename(columns={col: new_col_name}, inplace=True)
    new_df = df.loc[:, ~df.columns.duplicated()]
    return new_df


def format_to_DBdata(ori_df: pd.DataFrame) -> pd.DataFrame:

    # Convert from sting to date format
    ori_df["period"] = pd.to_datetime(ori_df["period"]).dt.date

    # Melt the DataFrame
    df = ori_df.melt(id_vars=["period"], var_name="column")

    # Extract country and indicator using regular expressions
    df["country"] = df["column"].str.extract(r"^(.+?) \–")
    df["indicator"] = df["column"].str.extract(r"\– (.+)")

    # Pivot the DataFrame
    df = df.pivot_table(
        index=["period", "country"], columns=["indicator"], values="value"
    ).reset_index()

    # Rename the columns
    df.columns.name = None

    # fill NaN values with 0
    df.fillna(0, inplace=True)

    return df


def extract() -> pd.DataFrame:

    monthly_data = pd.DataFrame()
    quarterly_data = pd.DataFrame()

    try:
        dbnomics = get_dbnomics_client()
        monthly_data = dbnomics.get_indicators(
            "series/OECD/DP_LIVE.csv?dimensions=%7B%22FREQUENCY%22%3A%5B%22M%22%5D%2C%22INDICATOR%22%3A%5B%22BCI%22%2C%22CCI%22%2C%22CPI%22%2C%22HUR%22%2C%22PPI%22%2C%22SHPRICE%22%2C%22STINT%22%2C%22LTINT%22%2C%22GGRSV%22%2C%22INDPROD%22%2C%22TRADEGOOD%22%5D%2C%22SUBJECT%22%3A%5B%22TOT%22%2C%22AMPLITUD%22%2C%22NTRADE%22%2C%22TOT_MKT%22%5D%2C%22MEASURE%22%3A%5B%22AGRWTH%22%2C%22LTRENDIDX%22%2C%22BLN_USD%22%2C%22PC_PA%22%2C%22PC_LF%22%2C%22MLN_SDR%22%2C%22IDX2015%22%5D%7D&limit=1000"
        )
        quarterly_data = dbnomics.get_indicators(
            "series/OECD/DP_LIVE.csv?dimensions=%7B%22INDICATOR%22%3A%5B%22QGDP%22%5D%2C%22FREQUENCY%22%3A%5B%22Q%22%5D%2C%22SUBJECT%22%3A%5B%22TOT%22%5D%2C%22MEASURE%22%3A%5B%22PC_CHGPP%22%5D%7D&limit=1000"
        )
    except Exception as e:
        logger.error(e)
        raise e

    return monthly_data, quarterly_data


def transform(monthly_data: pd.DataFrame, quarterly_data: pd.DataFrame) -> pd.DataFrame:

    try:
        monthly_data = rename_col_Name(monthly_data)
        quarterly_data = rename_col_Name(quarterly_data)

        # get the list of countries in Quarterly GDP dataframe
        gdp_countries = set([col.split(" – ")[0] for col in quarterly_data.columns])

        # get the list of countries in economic indicators dataframe
        ei_countries = set([col.split(" – ")[0] for col in monthly_data.columns])

        # get the intersection of two sets
        common_countries = gdp_countries.intersection(ei_countries)
        print(common_countries)
        common_countries.remove("European Union")
        common_countries.remove("OECD - Europe")
        common_countries.remove("OECD - Total")

        # select only the columns with common countries from economic indicators dataframe
        economic_indicators_common = monthly_data[
            [
                col
                for col in monthly_data.columns
                if col.split(" – ")[0] in common_countries
            ]
        ]
        gdp_common = quarterly_data[
            [
                col
                for col in quarterly_data.columns
                if col.split(" – ")[0] in common_countries
            ]
        ]

        monthly_db_data = format_to_DBdata(economic_indicators_common)
        quarterly_db_data = format_to_DBdata(gdp_common)
        monthly_db_data.columns = [
            "period",
            "country",
            "bci",
            "cci",
            "government_reserves",
            "industrial_production",
            "inflation_index",
            "inflation_growth_rate",
            "long_term_interest",
            "ppi_index",
            "ppi_growth_rate",
            "share_price",
            "short_term_interest",
            "trade_in_goods",
            "unemployment_rate",
        ]

    except Exception as e:
        logger.error(e)
        raise e

    return monthly_db_data, quarterly_db_data


def load(
    db: Session, monthly_db_data: pd.DataFrame, quarterly_db_data: pd.DataFrame
) -> None:
    try:
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
    except Exception as e:
        logger.error(e)
        raise e


def etl(db: Session) -> None:
    logger.info("Extracting DBnomics data")
    monthly_data, quarterly_data = extract()
    logger.info("Extraction done!")
    logger.info("Transforming DBnomics data")
    monthly_data, quarterly_data = transform(monthly_data, quarterly_data)
    logger.info("Transforming done!")
    logger.info("Loading DBnomics data")
    load(db, monthly_data, quarterly_data)
    logger.info("Loading done!")
