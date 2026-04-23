---
title: Setting Up ZeroWaste (AWS Cost Optimization)
description: How to set up ZeroWaste in CloudForecast to surface cost optimization opportunities across your AWS environment
---

ZeroWaste is CloudForecast's cost optimization feature. It surfaces actionable recommendations to reduce waste across your AWS environment — including idle resources, rightsizing opportunities, Savings Plans, and Reserved Instance purchases.

ZeroWaste integrates with [AWS Cost Optimization Hub](https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html), which consolidates recommendations from AWS Compute Optimizer and other AWS services into a single view. CloudForecast reads from this data to power your ZeroWaste dashboard and weekly health check reports.

---

## What You'll Need

Before setting up ZeroWaste, make sure you have:

- An active AWS source already connected in CloudForecast (see [Connecting Your AWS Account](/getting-started/connecting-aws/))
- Access to your **AWS root / payer account** to launch CloudFormation stacks
- (Optional) AWS Organizations set up if you want ZeroWaste coverage across sub-accounts

---

## Part 1 — Enable AWS Cost Optimization Hub

ZeroWaste pulls its recommendations from [AWS Cost Optimization Hub](https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html). You need to enable this in your AWS account first.

**To enable Cost Optimization Hub:**

1. Open the [AWS Billing and Cost Management console](https://console.aws.amazon.com/costmanagement/)
2. In the left navigation, choose **Cost Optimization Hub**
3. Choose one of the following options:
   - **Enable for this account and all member accounts** — recommended if you use AWS Organizations and want full coverage across all sub-accounts
   - **Enable for this account only** — if you have a single account or want to start with the payer account only
4. Click **Enable**

> After enabling, it can take up to **24 hours** for Cost Optimization Hub to import recommendations for all your supported resources.

> **Tip:** For the best coverage, also [opt in to AWS Compute Optimizer](https://docs.aws.amazon.com/compute-optimizer/latest/ug/getting-started.html). Cost Optimization Hub imports rightsizing and idle resource recommendations directly from Compute Optimizer.

### What Cost Optimization Hub covers

Once enabled, AWS Cost Optimization Hub generates recommendations for:

- EC2 instances (rightsizing, idle, Graviton migration)
- EBS volumes (upgrade, delete)
- Lambda functions
- ECS and EKS tasks (Fargate rightsizing)
- RDS databases
- Savings Plans and Reserved Instances
- Amazon Redshift, ElastiCache, MemoryDB, DynamoDB, OpenSearch, SageMaker

See the [full list of supported resources](https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html#coh-supported-resources) in the AWS documentation.

---

## Part 2 — Grant ZeroWaste Permissions in CloudForecast

ZeroWaste requires additional read-only IAM permissions beyond the standard AWS source connection. These are set up via CloudFormation.

There are two steps depending on your AWS account structure:

- **Step 1 (required for all)** — Set up permissions on your root / payer account
- **Step 2 (required if you have sub-accounts)** — Extend permissions to all sub-accounts via CloudFormation StackSet

To get started, go to **Sources → ZeroWaste → Credentials** in CloudForecast, then click **See IAM Configuration Steps** to reveal the setup instructions and direct CloudFormation links.

You can also review the full permissions being granted here: [ZeroWaste CloudFormation Template](https://assets-cloudforecast-io.s3.amazonaws.com/cloudforecast-zw-setup.json)

---

### Step 1 — Root / Payer Account Setup

This sets up ZeroWaste permissions for your master payer account.

1. In CloudForecast, go to **Sources → ZeroWaste → Credentials**
2. Click **See IAM Configuration Steps** to expand the setup modal
3. Click **Launch Stack** — you'll be taken to [AWS CloudFormation](https://console.aws.amazon.com/cloudformation/) in your browser
4. If prompted, log in with your **root / payer account** credentials
5. Confirm the **RoleName** in the CloudFormation stack matches what's shown in CloudForecast
6. Check the box: **I acknowledge that AWS CloudFormation might create IAM resources with custom names**
7. Click **Create Stack**
8. Wait a few minutes for the status to show **CREATE_COMPLETE** — use the refresh button to check progress
9. Return to CloudForecast and verify a **green checkmark** appears in the status column for this account

> If you only have one AWS account (no sub-accounts), setup is complete. Skip to [verifying your setup](#verifying-your-setup).

---

### Step 2 — Sub-account Setup via CloudFormation StackSet

This extends ZeroWaste permissions to all sub-accounts in your AWS Organization. Complete this step if you have member accounts under your payer account.

1. **Log in to your AWS Console** and navigate to CloudFormation StackSets: [Direct link to CloudFormation StackSets](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacksets/create)

2. **Choose a template** — Under **Amazon S3 URL**, paste:
   ```
   https://assets-cloudforecast-io.s3.amazonaws.com/cloudforecast-zw-setup.json
   ```
   Click **Next**

3. **Specify StackSet details**:
   - Enter a **Stack name** and **Description** (e.g. `cloudforecast-zerowaste`)
   - Go back to CloudForecast → **IAM Configuration Steps** and copy the **External ID** shown there — paste it into the **ExternalID** field in AWS
   - Confirm the **RoleName** matches what's shown in CloudForecast
   - Click **Next**

4. **Configure StackSet options** — Add any tags if needed, then click **Next**

5. **Set deployment options**:
   - Select **Deploy to Organization**
   - Choose your preferred AWS region
   - Click **Next**

6. **Review** — Double-check that the **RoleName** matches CloudForecast, then check:
   **I acknowledge that AWS CloudFormation might create IAM resources with custom names**
   Click **Submit**

7. Wait for **CREATE_COMPLETE** across all accounts — this can take several minutes when deploying across an organization

8. Return to CloudForecast and verify the status column shows confirmation for each account

---

## Verifying Your Setup

Once both steps are complete, go to **Sources → ZeroWaste → Credentials** in CloudForecast. Each account row should show a green checkmark in the status column.

If any accounts show an error, check that:
- The **RoleName** in the CloudFormation stack matches exactly what's shown in CloudForecast
- The **ExternalID** was copied correctly from CloudForecast (it is unique to your account)
- Your payer account has [Cost Optimization Hub enabled](https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html#coh-enable)

---

## What Happens Next

After setup is complete, CloudForecast will begin importing your Cost Optimization Hub recommendations. You can expect to see data in your ZeroWaste dashboard within **24–48 hours**.

From there, ZeroWaste will surface:

- **Weekly health check reports** — a prioritized list of waste and savings opportunities delivered to your inbox or Slack
- **Resource-level recommendations** — rightsizing, idle resource deletion, Savings Plans, and Reserved Instance purchases
- **Cost group breakdowns** — slice recommendations by team, service, or tag to assign accountability to the right engineers

---

## Frequently Asked Questions

**Do I need to complete both steps?**
Only if you have sub-accounts. If you have a single payer account, Step 1 is all you need.

**What permissions does ZeroWaste require?**
ZeroWaste requires read-only access to AWS Cost Optimization Hub data and related resource metadata. You can review the exact permissions in the [ZeroWaste CloudFormation Template](https://assets-cloudforecast-io.s3.amazonaws.com/cloudforecast-zw-setup.json).

**Does ZeroWaste work without Cost Optimization Hub?**
CloudForecast has its own optimization policies that run independently, but enabling [AWS Cost Optimization Hub](https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html) significantly expands recommendation coverage and aligns with AWS best practices.

**How often are recommendations updated?**
AWS Cost Optimization Hub refreshes recommendations daily. CloudForecast imports the latest data each day, so your ZeroWaste dashboard reflects up-to-date findings.

**Will ZeroWaste make any changes to my AWS resources?**
No. ZeroWaste is read-only. It surfaces recommendations for your team to act on — it never modifies, stops, or deletes any resources in your account.

If you need help, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).
