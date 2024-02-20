import requests

def handler(pd: "pipedream"):
  token = f'{pd.inputs["spotify"]["$auth"]["oauth_access_token"]}'
  authorization = f'Bearer {token}'
  headers = {"Authorization": authorization}

  params = {
    "type":"album",
    "q": pd.steps["create_search_string"]["$return_value"],
    "offset":pd.steps["select_offset"]["$return_value"]
  }

  r = requests.get('https://api.spotify.com/v1/search', params=params, headers=headers)
  # Export the data for use in future steps
  return r.json()
