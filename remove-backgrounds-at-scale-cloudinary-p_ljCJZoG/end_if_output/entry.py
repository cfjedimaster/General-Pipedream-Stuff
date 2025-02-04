def handler(pd: "pipedream"):

  if "/output" in pd.steps["trigger"]["event"]["path_lower"]:
    pd.flow.exit("Not doing output processing")
