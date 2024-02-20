def handler(pd: "pipedream"):
  # Credit: https://stackoverflow.com/a/2823331/52160
  import random
  import string
  
  letter = random.choice(string.ascii_letters).lower()

  if(random.choice([True,False])):
    search = letter + '%'
  else:
    search = '%' + letter + '%'

  return search
