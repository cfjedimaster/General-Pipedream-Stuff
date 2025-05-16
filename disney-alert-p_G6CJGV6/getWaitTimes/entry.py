import requests 

# This is Disneyland, Holywood Studios
PARK_ID = 7

# This is the wait threshold in minutes
WAIT_THRESHOLD = 20

def handler(pd: "pipedream"):
  ridesReady = []
  res = requests.get(f"https://queue-times.com/parks/{PARK_ID}/queue_times.json")
  data = res.json()
  for land in data["lands"]:
    for ride in land["rides"]:
      if ride["is_open"] is True and ride["wait_time"] <= WAIT_THRESHOLD:
        ridesReady.append({"name":ride["name"], "waitTime":ride["wait_time"]})

  if len(ridesReady) == 0:
    return pd.flow.exit("No available rides.")

  return ridesReady
