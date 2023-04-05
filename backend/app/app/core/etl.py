import pandas as pd
import re
import sqlite3
from app.api.deps import get_dbnomics_client


def cleanerColName(df: pd.DataFrame) -> pd.DataFrame:
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


def makeDBdata(ori_df: pd.DataFrame) -> pd.DataFrame:
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

    return df


def get_DBnomics_data():
    dbnomics = get_dbnomics_client()
    monthly_data = dbnomics.get_indicators(
        "series/OECD/DP_LIVE.csv?dimensions=%7B%22FREQUENCY%22%3A%5B%22M%22%5D%2C%22INDICATOR%22%3A%5B%22BCI%22%2C%22CCI%22%2C%22CPI%22%2C%22HUR%22%2C%22PPI%22%2C%22SHPRICE%22%2C%22STINT%22%2C%22LTINT%22%2C%22GGRSV%22%2C%22INDPROD%22%2C%22TRADEGOOD%22%5D%2C%22SUBJECT%22%3A%5B%22TOT%22%2C%22AMPLITUD%22%2C%22NTRADE%22%2C%22TOT_MKT%22%5D%2C%22MEASURE%22%3A%5B%22AGRWTH%22%2C%22LTRENDIDX%22%2C%22BLN_USD%22%2C%22PC_PA%22%2C%22PC_LF%22%2C%22MLN_SDR%22%2C%22IDX2015%22%5D%7D&limit=1000"
    )
    quarterly_data = dbnomics.get_indicators(
        "series/OECD/DP_LIVE.csv?dimensions=%7B%22INDICATOR%22%3A%5B%22QGDP%22%5D%2C%22FREQUENCY%22%3A%5B%22Q%22%5D%2C%22SUBJECT%22%3A%5B%22TOT%22%5D%2C%22MEASURE%22%3A%5B%22PC_CHGPP%22%5D%7D&limit=1000"
    )

    monthly_data = cleanerColName(monthly_data)
    quarterly_data = cleanerColName(quarterly_data)

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
    economic_indicators_common = monthly_data[
        [col for col in monthly_data.columns if col.split(" – ")[0] in common_countries]
    ]
    gdp_common = quarterly_data[
        [
            col
            for col in quarterly_data.columns
            if col.split(" – ")[0] in common_countries
        ]
    ]

    monthly_db_data = makeDBdata(economic_indicators_common)
    quarterly_db_data = makeDBdata(gdp_common)

    # fill NaN values with 0
    monthly_db_data.fillna(0, inplace=True)
    quarterly_db_data.fillna(0, inplace=True)

    return monthly_db_data, quarterly_db_data

    # # Create a connection to an SQLite database
    # conn = sqlite3.connect("fyp.db")

    # # Write the DataFrame to an SQLite table
    # monthly_db_data.to_sql("monthlyData", conn, if_exists="replace", index=False)
    # quarterly_db_data.to_sql("quarterlyData", conn, if_exists="replace", index=False)

    # # Close the connection to the SQLite database
    # conn.close()
