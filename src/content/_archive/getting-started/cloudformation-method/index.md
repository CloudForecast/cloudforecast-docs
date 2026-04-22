---
title: "Recommended CloudFormation Method (AWS Data Source Setup)"
description: "Recommended CloudFormation Method (AWS Data Source Setup)"
---Setting up CloudForecast to report on your AWS spend will take less than 5 minutes with our CloudFormation template. **This is the preferred and recommended way for setup.**

The CloudFormation stack grants us read-only access to particular billing files (CUR) from an S3 bucket. This helps us process and create the cost report for you on a daily basis.

Here is the JSON file associated with the CloudFormation stack and its permissions: [CloudForecast CloudFormation Stack JSON.](https://assets-cloudforecast-io.s3.amazonaws.com/cloudforecast-cu-setup.json)

_Important note: Before proceeding with these steps, be sure to follow these steps to enable the CUR files in your AWS billing dashboard:[Enable AWS CUR files](/getting-started/enable-aws-cost-and-usage-report/)_

* * *

1\. **Launch CloudFormation Stack:** After you’ve created your Data Export (Cost and Usage Report 2.0) and entered the` S3 bucket` and `prefix`, the “`Launch CloudFormation Stack`” button will be available for selection.

2.**Quick Create Stack** : After you’ve clicked the `Launch CloudFormation Stack` button, a new window will appear to create the CloudFormation Stack. On this screen, review all the details and then check off `"I acknowledge that AWS CloudFormation might create IAM resources."` and then press “`Create Stack`“

3\. **Outputs / RoleArn:** Click the “Outputs” tab and wait a few minutes for AWS to create the stack. 

4\. **Copy and Paste Outputs RoleArn:** Once the stack has been created, you’ll need to copy the `RoleArn value` and paste it into CloudForecast field, `IAM ARN`

4\. **Test Connection**. Press the `Test Connection` button, and if everything is set up correctly, CloudForeast should accept all the settings. After this, it takes about 24-36 hours to receive your first Cost Report.
