import typing as t
import pandas as pd

from httpx import Client, Response, HTTPError


class DBnomicsError(Exception):
    def __init__(self, message: str, raw_response: t.Optional[Response] = None):
        self.message = message
        self.raw_response = raw_response
        super().__init__(self.message)


class DBnomicsClient:
    base_url: str = "https://api.db.nomics.world/v22/"
    base_error: t.Type[DBnomicsError] = DBnomicsError

    def __init__(self) -> None:
        self.session = Client()
        self.session.headers.update(
            {"Content-Type": "application/json", "User-agent": "EconoSense bot 0.1"}
        )

    def _perform_request(  # type: ignore
        self, method: str, path: str, *args, **kwargs
    ) -> Response:
        res = None
        try:
            res = getattr(self.session, method)(
                f"{self.base_url}{path}", *args, **kwargs
            )
            res.raise_for_status()
        except HTTPError:
            raise self.base_error(
                f"{self.__class__.__name__} request failure:\n"
                f"{method.upper()}: {path}\n"
                f"Message: {res is not None and res.text}",
                raw_response=res,
            )
        return res

    def get_indicators(self, url):
        """Fetch the top n entries from a given subreddit."""

        # If you get empty responses from the subreddit calls, set t=month instead.
        # response = self._perform_request("get", f"{self.base_url}{url}")
        # if response:
        #     return pd.read_csv(f"{self.base_url}{url}")
        # else:
        #     return None
        res = None
        try:
            res = pd.read_csv(f"{self.base_url}{url}")
        except HTTPError:
            raise self.base_error(
                f"{self.__class__.__name__} request failure:\n"
                f"Message: {res is not None and res.text}",
                raw_response=res,
            )
        return res
