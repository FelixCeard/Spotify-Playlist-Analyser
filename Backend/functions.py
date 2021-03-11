import re

def get_spot_id(url=None):
    reg1 = r"(?!http:\/\/open.spotify.com\/[a-zA-Z0-9]+\/)[a-zA-Z0-9]{22}"
    reg2 = r"(?!spotify:[\d\D]+:)[a-zA-Z0-9]{22}"
    if url == None:
        return 0
    else:
        s1 = re.findall(reg1, url)
        if len(s1) > 0:
            if re.split(r"[\d\D]{22}", s1[0]) == ['', '']:
                # s1 is the correct id
                return s1[0]
        
        s2 = re.findall(reg2, url)
        if len(s2) > 0:
            if re.split(r"[\d\D]{22}", s2[0]) == ['', '']:
                # s2 is the correct id
                return s2[0]
    print(f"No valid spotify ID could be find in this link: {url}")
    return False
