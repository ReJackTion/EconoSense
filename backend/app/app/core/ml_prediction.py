import pandas as pd
import numpy as np
import pickle

# import joblib
import os


def get_predictions(db_data: pd.DataFrame):

    db_data_copy = db_data.copy()
    db_data_copy.drop(
        [
            "Inflation – Total – 2015=100 – Monthly",
            "Inflation – Total – 2015=100 – Monthly_nor",
            "Inflation – Total – 2015=100 – Monthly_pct_chg",
            "Producer price indices – Manufacturing, total market – 2015=100 – Monthly",
            "Producer price indices – Manufacturing, total market – 2015=100 – Monthly_nor",
            "Producer price indices – Manufacturing, total market – 2015=100 – Monthly_pct_chg",
        ],
        axis=1,
        inplace=True,
    )
    df_filtered = db_data_copy.filter(regex="^(?!.*(_nor|_pct_chg)).*$")
    df_filtered.columns = [
        "period",
        "country",
        "bci",
        "cci",
        "government_reserves",
        "industrial_production",
        "inflation_growth_rate",
        "long_term_interest",
        "ppi_growth_rate",
        "qgdp",
        "share_price",
        "short_term_interest",
        "trade_in_goods",
        "unemployment_rate",
    ]
    X = df_filtered[
        [
            "bci",
            "cci",
            "inflation_growth_rate",
            "government_reserves",
            "unemployment_rate",
            "industrial_production",
            "long_term_interest",
            "ppi_growth_rate",
            "share_price",
            "short_term_interest",
            "trade_in_goods",
            "qgdp",
        ]
    ]
    # Get the current working directory
    current_dir = os.getcwd()

    # Specify the file name or relative path of files
    csv_file = "app/core/models/USA_data.csv"
    scaler_file = "app/core/models/scaler.pkl"
    predictive_model_file = "app/core/models/predictive_model.pkl"

    # Construct the absolute path
    usa_data_path = os.path.join(current_dir, csv_file)
    scaler_path = os.path.join(current_dir, scaler_file)
    predictive_model_path = os.path.join(current_dir, predictive_model_file)

    usa_data = pd.read_csv(usa_data_path)
    df_replace = X.replace(0, np.nan)
    df_replace = df_replace.fillna(usa_data.mean())

    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)

    X_transform = scaler.transform(X)
    X_transform = pd.DataFrame(X_transform, columns=X.columns)

    predictive_model = pickle.load(open(predictive_model_path, "rb"))

    probabilities = predictive_model.predict_proba(X_transform)
    predictions = predictive_model.predict(X_transform)

    # Convert NumPy arrays to DataFrames
    df_prob = pd.DataFrame(
        probabilities,
        columns=["contraction_prob", "expension_prob", "peak_prob", "trough_prob"],
    )
    df_pred = pd.DataFrame({"Prediction": predictions})

    # Mapping dictionary
    label_mapping = {1: "expansion", 2: "peak", 0: "contraction", 3: "trough"}
    # Replace the encoded labels with strings
    df_pred["Prediction"] = df_pred["Prediction"].map(label_mapping)

    # Concatenate DataFrames horizontally
    df_combined = pd.concat([df_prob, df_pred], axis=1)
    final_db_data = pd.concat([db_data_copy, df_combined], axis=1)

    print("final db:", final_db_data)

    return final_db_data
