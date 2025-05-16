def handler(pd: "pipedream"):
  text = "Ride Alert! These rides all have a short wait time:\n\n"
  for ride in pd.steps["getWaitTimes"]["$return_value"]:
    text += f"{ride['name']} ({ride['waitTime']} minutes)\n"

  return text
