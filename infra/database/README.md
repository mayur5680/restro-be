create a admin user call `syscdk` and let the lambda use this credential to access the database. However, we have a problem when only use this `syscdk` user to access to the db while the secret is rotating ([issue link](https://guzman.atlassian.net/browse/BHPL-628)). This `Db Access Deined` issue is because of we use the ***Single user rotation strategy*** to rotate `syscdk` user secret and in the document, there is a phrase `there is a low risk of the database denying calls that use the rotated credentials`. That's why we need to create an other user called `syscdk2` and apply the ***Alternating user rotation strategy*** for this user to minimize the db access denied downtime 

[reference link](https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets_strategies.html)

Run the following commands to fully deploy the Aurora MySql cluster including all secret rotations
```bash
# Export GYG env variables. E.g:
export GYG_PLATFORM=ops && export GYG_ENV=test && GYG_REGION=australia

# build and deploy the Aurora MySql with 2 db credentials for both `syscdk` and `syscdk2` without `syscdk2` secret rotation. Because the `aws-cdk` only auto create the admin user (which we use to create syscdk) while ignore the creating of other users (even it was created with the `DatabaseSecret` in `aws-cdk-lib/aws-rds`). So that even when we created the infra for `rds-aurora-mysql` it won't create a user for it. and when we also create secret rotation at the same time, the rotate lambda will be triggered immediately and access to the db with the user credential that does not exist. That's why we need to create the `syscdk2` before creating the secret rotation on this user secret.
yarn cdk:db:build
yarn cdk:db:deploy

# Build and deploy without secret rotations
yarn cdk:db:buildWithSecretRotation
yarn cdk:db:deployWithSecretRotation
```