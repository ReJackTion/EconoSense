import Router from "next/router";
import React, { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    Router.push("/dashboard");
  });

  return <div />;
}
