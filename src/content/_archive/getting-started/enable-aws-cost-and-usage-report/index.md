---
title: "Enable Data Export | CUR 2.0"
description: "Enable Data Export | CUR 2.0"
---* * *

1\. **Billing and Cost Management:** Navigate to **“Billing and Cost Management”** in your AWS console and press “**Data Exports”** on the left-hand menu:

2\. **Existing CUR 2.0 (Recommended)** : If you have an active CUR 2.0 with historical data, we can likely leverage it. To help confirm, we will need the **Compression type / File** type to be **parquet** , and the **“Include resource IDs”** settings to be enabled. If both are true, all we need is the S3 bucket name and prefix in CloudForecast. You can proceed to the [CloudFormation Method](/getting-started/cloudformation-method/) after you’ve input this information into CloudForecast. 

3\. **New CUR 2.0** : If you would like to create a NEW CUR 2.0, press **“create”** and ensure **“Standard Data Export”** is selected. 

4\. **Export name:** Name the**export name** something generic like, CUR-2-Billing or CUR-Billing to help identify the file. 

5\. S**ettings:** Ensure the following settings are enabled – 

  * **Include resource IDs:** selected
  * **Time granularity** option is set to **“hourly”**
  * **File versioning:** Overwrite existing data export file
  * **Compression type and file format:** Parquet

6\. **S3 bucket and prefix:** You can create a new S3 bucket for this purpose, or select an existing one. For the **prefix** , enter a generic name, such as “parquet-cur2-hourly”, to help identify the folder where the Data Export will be located. Press “create” once an S3 bucket has been selected and you’ve entered the prefix. 

7.**Copy / Paste into CloudForecast:** After pressing “create”, you’ll want to click into the newly created Data Export CUR 2.0. From there, copy and paste the S3 bucket name into the CloudForecast AWS setup modal: 

8\. After you’ve entered this information, the **Launch CloudFormation Stack** will be available. Proceed with the following steps to complete the setup of CloudForecast: [CloudFormation Method](/getting-started/cloudformation-method/)
