"""
python change_hostname.py <new_hostname>

Changes the host name of the website, use this when switching from BETA to public, or vice versa.
"""
import json

def change_bucket_website_hostname(config_path, new_hostname):
    """Loads up the bucket-website.json and changes the host name for all RoutingRules"""
    with open(config_path, 'r') as config_file:
        config = json.load(config_file)
        for rule in config['RoutingRules']:
            rule['Redirect']['HostName'] = new_hostname
    with open(config_path, 'w') as config_file:
        json.dump(config, config_file, indent=4)

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 1:
        print(__doc__)
    else:
        change_bucket_website_hostname('src/data/aws/s3/bucket-website.json', sys.argv[1])
