Read https://docs.aws.amazon.com/AmazonS3/latest/userguide/how-to-page-redirect.html and https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-website.html

The documentation doesn't mention it but AWS seems to match the least specific rule first? E.g. `web/main` will get matched before `web/main/abc`.
So lets say you want to redirect `web/main` -> `web/old` and `web/main/abc` -> `web/new/dfe`. You will need to setup the rules `web/main` -> `web/old` and `web/old/abc` -> `web/new/dfe`.