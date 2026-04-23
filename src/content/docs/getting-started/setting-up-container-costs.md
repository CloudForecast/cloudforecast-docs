---
title: Setting Up EKS & ECS Container Cost Visibility
description: How to enable AWS Split Cost Allocation Data so CloudForecast can break down your EKS and ECS spend by namespace, deployment, service, and Kubernetes label.
---

CloudForecast can break down the cost of your containerized workloads by EKS namespace, deployment, ECS service, and Kubernetes label — without installing any agents in your cluster. This is powered by [AWS Split Cost Allocation Data (SCAD)](https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html), an AWS feature that allocates shared EC2 and Fargate costs down to the individual pod or task level.

This guide walks through everything you need to do to enable container cost visibility in CloudForecast.

---

## Requirements

Before you start, make sure you have:

- An active AWS source already connected in CloudForecast (see [Connecting Your AWS Account](/getting-started/connecting-aws/))
- Access to **AWS Billing and Cost Management** to create and configure Data Exports
- Access to **AWS Cost Allocation Tags** to activate EKS and ECS metadata tags

> Container cost visibility requires a **CUR 2.0 Data Export in Parquet format**. This is a separate export from your standard CUR — you cannot enable SCAD on an existing CSV export. You will need to create a new one.

---

## Step 1 — Enable Split Cost Allocation Data in AWS

1. Sign in to the [AWS Billing and Cost Management console](https://console.aws.amazon.com/costmanagement/)
2. In the left navigation, go to **Cost Management Preferences**
3. Under the **Split cost allocation data** section, enable it for the resource types you use:
   - **Amazon EKS** — to allocate EC2 and Fargate compute costs across pods
   - **Amazon ECS** — to allocate EC2 and Fargate compute costs across tasks
4. Click **Save preferences**

> For full AWS instructions, see [Enabling split cost allocation data](https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html) in the AWS documentation.

---

## Step 2 — Create a New CUR 2.0 Export in Parquet Format

SCAD data is only available in **CUR 2.0 Data Exports using Parquet format**. If your existing CUR export uses CSV or gzip format, you need to create a new export specifically for container costs.

1. In the [AWS Billing and Cost Management console](https://console.aws.amazon.com/costmanagement/), go to **Data Exports → Create export**
2. Select **Standard data export**
3. Configure the export:

| Setting | Required value |
|---|---|
| **Format** | **Parquet** (required — SCAD is not available in CSV) |
| **Split cost allocation data** | **Enabled** |
| **Include resource IDs** | Enabled |
| **Time granularity** | Daily or Hourly |
| **File versioning** | Overwrite existing file |

4. Choose an S3 bucket and set an S3 path prefix (e.g. `cloudforecast-containers`)
5. Note down the **bucket name** and **prefix** — you'll need these in CloudForecast
6. Click **Create**

> AWS will begin delivering SCAD to this export within 24 hours. The first export may take up to 24 hours to appear.

---

## Step 3 — Activate EKS and ECS Cost Allocation Tags

AWS includes EKS and ECS metadata as cost allocation tags in the CUR. These tags need to be activated in your billing settings before they appear in CloudForecast.

**To activate the tags:**

1. In the [AWS Billing and Cost Management console](https://console.aws.amazon.com/costmanagement/), go to **Cost allocation tags**
2. Search for and activate the following tags:

**For EKS:**
- `eks:cluster-name`
- `eks:namespace`
- `eks:workload-type`
- `eks:workload-name`
- Any Kubernetes labels you use for team ownership, environment, or service (e.g. `kubernetes:team`, `kubernetes:service`, `kubernetes:environment`)

**For ECS:**
- `ecs:cluster`
- `ecs:service`
- `ecs:task-definition-family`

> Activating cost allocation tags can take **up to 24 hours** to take effect. Tags activated today will only appear in future CUR exports, not historical data.

---

## Step 4 — Connect the Parquet CUR in CloudForecast

Once your Parquet CUR export has been delivered to S3:

1. Go to **Sources** in CloudForecast
2. Click on your existing AWS source
3. In the **Cost & Usage Report** section, add the Parquet export by entering:
   - **S3 Bucket** — the bucket your Parquet CUR is delivered to
   - **CUR Prefix** — the S3 path prefix you set in Step 2

CloudForecast will detect the SCAD data in the export and automatically provision the EKS and ECS data sources for your account.

---

## What Happens Next

Once CloudForecast detects your SCAD export, it will:

- Create dedicated **EKS** and **ECS** data sources under your AWS source on the Sources page
- Begin surfacing container costs in the **Cost Detective** tool — filterable by cluster, namespace, deployment, ECS service, and Kubernetes label
- Make EKS and ECS available as data sources when configuring **Cost Groups**, so you can build reports scoped to specific teams or services

You can expect to see container cost data within **24–48 hours** of completing setup.

---

## Understanding Container Cost Numbers

Container costs in CloudForecast come from `split_line_item_split_cost` in the CUR, not from your standard AWS billing totals. A few things to keep in mind:

- **Split cost is an estimate**, not an exact billing figure. AWS allocates shared compute based on CPU and memory usage (weighted 90% CPU / 10% memory by default).
- **Idle capacity is not included.** If a node is underutilized, the unused portion is billed by AWS but not attributed to any container. This means container cost totals will be lower than your EC2 or Fargate bill.
- **Do not try to reconcile container costs against your AWS invoice.** They measure different things — one is actual billed cost, the other is estimated usage-based allocation.

For a full explanation of how to interpret these numbers, see [EKS & ECS Container Cost Visibility](/features/container-costs).

---

## Frequently Asked Questions

**Can I reuse my existing CUR export?**
Only if it is already configured to use Parquet format and has SCAD enabled. If your existing export uses CSV or gzip, you must create a new Parquet export. It is not possible to convert an existing export.

**Will my existing AWS source stop working if I add a Parquet CUR?**
No. Your existing CSV-based CUR continues to power your standard AWS cost reports. The Parquet export is additive — CloudForecast uses it specifically for container cost data.

**Do I need to install anything in my EKS or ECS clusters?**
No. CloudForecast reads SCAD data directly from your CUR. There is no agent, sidecar, or cluster-level configuration required.

**My Kubernetes labels aren't showing up. What should I check?**
Make sure the labels are activated in **Cost Allocation Tags** in the AWS Billing console. It can take up to 24 hours after activation for them to appear in the CUR. Labels must also be applied to pods before they can be reported — retroactive data is not available.

**Which workload types does EKS SCAD support?**
AWS includes Deployments, DaemonSets, StatefulSets, Jobs, ReplicaSets, and CronJobs.

If you need help, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).
