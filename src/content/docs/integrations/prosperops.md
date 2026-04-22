---
title: "ProsperOps Integration"
description: "See ProsperOps savings metrics alongside your AWS costs in CloudForecast Cost Group reports."
---

## What is ProsperOps?

[ProsperOps](https://www.prosperops.com/) is an automated commitment management platform that continuously optimizes AWS Reserved Instances and Savings Plans. It dynamically buys, sells, and exchanges commitments in real time to maximize your savings while preserving flexibility — without manual intervention.

## What this integration does

By connecting ProsperOps to CloudForecast, your daily Cost Group reports include a ProsperOps add-on module that shows:

- Your AWS costs from CloudForecast
- Savings achieved through ProsperOps (Effective Savings Rate and related metrics)

This gives your team a unified view of spend and savings in a single daily report delivered via email, Slack, and Teams.

## Prerequisites

- An active CloudForecast account
- An active ProsperOps account with Data Export enabled

---

## Part 1 — Enable ProsperOps Data Export

ProsperOps Data Export writes savings data to an S3 bucket daily. Follow these steps in the [ProsperOps Console](https://console.prosperops.com/).

1. Open the ProsperOps Console, select the AWS Organization you want to configure, and click **Settings** under **Configuration** in the left navigation.

2. Click **Configure** in the Data Export panel. Enter the S3 bucket name where exports should be written.

   **Recommendation:** Use the same S3 bucket that CloudForecast already has access to. You can find that bucket name in CloudForecast under **Setup > AWS Credentials**. The bucket must exist in the management account of your AWS organization (any region is supported).

3. ProsperOps needs permission to write to that bucket. Click **Copy** to copy the provided IAM policy, then apply it to the ProsperOps role in your management account. Click **Validate & Enable** when done.

   If there is an error (bucket does not exist or permissions are incorrect), you will see a detailed message. Correct the issue and click **Validate & Enable** again.

4. Once validated, Data Export is enabled and the first export will appear within 24 hours.

### Managing Data Export settings

- To pause exports, click **Disable**.
- To re-enable, click **Configure** and follow the steps above. Historical data is backfilled automatically.
- To change the S3 bucket, disable Data Export, re-enable with the new bucket name, and reapply the IAM policy.

---

## Part 2 — Connect ProsperOps in CloudForecast

1. In CloudForecast, go to **Setup > ProsperOps**.

2. **If ProsperOps exports to the same S3 bucket as your CloudForecast CUR files (recommended):**
   - Go to **Setup > AWS Credentials** and copy the **S3 Bucket Name** and **AWS IAM Role**.
   - Return to **Setup > ProsperOps** and paste both values into the corresponding fields, then click **Save Changes**.

3. **If ProsperOps exports to a different S3 bucket:**
   - Click **Launch Stack** to open the CloudFormation wizard in your AWS account.
   - Complete the CloudFormation steps to create a new IAM role with access to the ProsperOps bucket.
   - Copy the new **AWS IAM Role** ARN and paste it into CloudForecast along with the S3 bucket name, then click **Save Changes**.

---

## Part 3 — Enable the ProsperOps module on a Cost Group

1. In CloudForecast, go to **Reports > Cost Groups** and click **Configure** on the Cost Group where you want ProsperOps data to appear.
2. Click **Edit** on **Cost Reports**.
3. Under **Anything else you want to include?**, set ProsperOps to **Yes** and click **Save Changes**.

Within 24 to 36 hours, the ProsperOps savings module will appear in your daily Cost Group reports.
