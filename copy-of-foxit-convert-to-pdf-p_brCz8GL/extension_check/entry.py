import os 

def handler(pd: "pipedream"):
  base, extension = os.path.splitext(pd.steps['trigger']['event']['name'])

  if extension == ".docx":
    api = "/pdf-services/api/documents/create/pdf-from-word"
  elif extension == ".xlsx":
    api = "/pdf-services/api/documents/create/pdf-from-excel"
  elif extension == ".pptx":
    api = "/pdf-services/api/documents/create/pdf-from-ppt"
  else:
    return pd.flow.exit(f"Exiting workflow due to unknow extension: {extension}.")

  return { "api":api }
