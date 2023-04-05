import pandas as pd
import re
from sklearn.preprocessing import MinMaxScaler
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


def compute_pct_chg_and_norm_risk(
    monthly_data: pd.DataFrame, quarterly_data: pd.DataFrame
) -> pd.DataFrame:
    monthly_data["period"] = pd.to_datetime(monthly_data["period"]).dt.date
    monthly_data.set_index("period", inplace=True)

    quarterly_data["period"] = pd.to_datetime(quarterly_data["period"]).dt.to_period(
        "Q"
    )
    quarterly_data.set_index("period", inplace=True)

    pc_monthly_data = monthly_data.pct_change() * 100
    pc_quarterly_data = quarterly_data.pct_change() * 100

    scaler1 = MinMaxScaler()
    scaler2 = MinMaxScaler()
    scaler1.fit(pc_monthly_data)
    scaler2.fit(pc_quarterly_data)
    nor_monthly_data = pd.DataFrame(
        scaler1.transform(pc_monthly_data), columns=pc_monthly_data.columns
    )
    nor_quarterly_data = pd.DataFrame(
        scaler2.transform(pc_quarterly_data), columns=pc_quarterly_data.columns
    )

    pc_monthly_data = pc_monthly_data.add_suffix("_pct_chg")
    pc_quarterly_data = pc_quarterly_data.add_suffix("_pct_chg")
    nor_monthly_data = nor_monthly_data.add_suffix("_nor")
    nor_quarterly_data = nor_quarterly_data.add_suffix("_nor")

    nor_monthly_data = nor_monthly_data * 100
    nor_quarterly_data = nor_quarterly_data * 100
    nor_monthly_data["period"] = pc_monthly_data.index
    nor_quarterly_data["period"] = pc_quarterly_data.index
    nor_monthly_data.set_index("period", inplace=True)
    nor_quarterly_data.set_index("period", inplace=True)

    monthly_data = pd.concat(
        [pd.concat([monthly_data, pc_monthly_data], axis=1), nor_monthly_data], axis=1
    )
    quarterly_data = pd.concat(
        [pd.concat([quarterly_data, pc_quarterly_data], axis=1), nor_quarterly_data],
        axis=1,
    )

    quarterly_data = quarterly_data.resample("M").ffill()
    quarterly_data.index = quarterly_data.index.strftime("%Y-%m")
    quarterly_data.reset_index(inplace=True)
    quarterly_data["period"] = pd.to_datetime(quarterly_data["period"]).dt.date
    quarterly_data.set_index("period", inplace=True)

    return monthly_data, quarterly_data


def get_common_country(
    monthly_data: pd.DataFrame, quarterly_data: pd.DataFrame
) -> pd.DataFrame:
    # get the list of countries in Quarterly GDP dataframe
    gdp_countries = set([col.split(" – ")[0] for col in quarterly_data.columns])

    # get the list of countries in economic indicators dataframe
    ei_countries = set([col.split(" – ")[0] for col in monthly_data.columns])

    # get the intersection of two sets
    common_countries = gdp_countries.intersection(ei_countries)
    common_countries.remove("European Union")
    common_countries.remove("OECD - Europe")
    common_countries.remove("OECD - Total")

    # select only the columns with common countries from economic indicators dataframe
    monthly_common = monthly_data[
        [col for col in monthly_data.columns if col.split(" – ")[0] in common_countries]
    ]
    quarterly_common = quarterly_data[
        [
            col
            for col in quarterly_data.columns
            if col.split(" – ")[0] in common_countries
        ]
    ]
    return monthly_common, quarterly_common


def format_to_DBdata(ori_df: pd.DataFrame) -> pd.DataFrame:

    # Convert from sting to date format
    ori_df.reset_index(inplace=True)
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

        monthly_data, quarterly_data = compute_pct_chg_and_norm_risk(
            monthly_data, quarterly_data
        )

        monthly_common, quarterly_common = get_common_country(
            monthly_data, quarterly_data
        )
        combined_data = pd.concat([monthly_common, quarterly_common], axis=1)

        db_data = format_to_DBdata(combined_data)

    except Exception as e:
        logger.error(e)
        raise e

    return db_data


def load(db: Session, db_data: pd.DataFrame) -> None:
    try:
        for row in db_data.itertuples(index=False):
            indicator_data_in = schemas.IndicatorCreate(
                period=row[0],
                country=row[1],
                bci=row[2],
                bci_nor=row[3],
                bci_pc=row[4],
                cci=row[5],
                cci_nor=row[6],
                cci_pc=row[7],
                government_reserves=row[8],
                government_reserves_nor=row[9],
                government_reserves_pc=row[10],
                industrial_production=row[11],
                industrial_production_nor=row[12],
                industrial_production_pc=row[13],
                inflation_growth_rate=row[14],
                inflation_growth_rate_nor=row[15],
                inflation_growth_rate_pc=row[16],
                long_term_interest=row[17],
                long_term_interest_nor=row[18],
                long_term_interest_pc=row[19],
                ppi_growth_rate=row[20],
                ppi_growth_rate_nor=row[21],
                ppi_growth_rate_pc=row[22],
                qgdp=row[23],
                qgdp_nor=row[24],
                qgdp_pc=row[25],
                share_price=row[26],
                share_price_nor=row[27],
                share_price_pc=row[28],
                short_term_interest=row[29],
                short_term_interest_nor=row[30],
                short_term_interest_pc=row[31],
                trade_in_goods=row[32],
                trade_in_goods_nor=row[33],
                trade_in_goods_pc=row[34],
                unemployment_rate=row[35],
                unemployment_rate_nor=row[36],
                unemployment_rate_pc=row[37],
            )
            crud.indicator.create(db, obj_in=indicator_data_in)

    except Exception as e:
        logger.error(e)
        raise e


def etl(db: Session) -> None:
    logger.info("Extracting DBnomics data")
    monthly_data, quarterly_data = extract()
    logger.info("Extraction done!")
    logger.info("Transforming DBnomics data")
    db_data = transform(monthly_data, quarterly_data)
    logger.info("Transforming done!")
    logger.info("Loading DBnomics data")
    load(db, db_data)
    logger.info("Loading done!")
