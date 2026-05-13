def handler(pd: "pipedream"):
  import random

  # Switched to 900 cuz limit + offset <= 1000
  return random.randint(0,900)
