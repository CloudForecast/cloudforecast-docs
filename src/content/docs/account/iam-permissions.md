---
title: AWS IAM Permissions Reference
description: A detailed breakdown of every AWS permission CloudForecast requests, why each one is needed, and how it is used.
---

CloudForecast connects to your AWS account using **read-only IAM roles** created via CloudFormation. We never write to, modify, or delete any of your AWS resources.

There are two separate IAM roles — one for the core cost data connection and one for ZeroWaste (cost optimization recommendations). This page explains the core connection's permissions and what CloudForecast does with them. The ZeroWaste role has its own page: [ZeroWaste IAM Permissions Reference](/account/zerowaste-iam-permissions/).

---

## Core AWS Connection (`cloudforecast-cu-setup-v2.json`)

This role is created when you connect your AWS account to CloudForecast. It grants access to your Cost and Usage Report (CUR) data and supporting cost APIs.

The role can only be assumed by CloudForecast, and only when the correct **External ID** (unique to your CloudForecast account) is provided. This follows the [AWS confused deputy prevention](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html) best practice.

### S3 — Cost & Usage Report Access

```
s3:Get*
s3:List*
```

**Scoped to:** Your specific CUR S3 bucket and its contents only. No other buckets are accessible.

**Why we need it:** Your CUR export is the source of truth for all CloudForecast dashboards — daily spend, cost breakdowns by service, resource-level tagging, and more. Without read access to this bucket, CloudForecast cannot import your cost data.

**What we do with it:** We read the daily CUR files AWS delivers to your bucket and import them into CloudForecast's data pipeline. We do not write, delete, or modify any files in your bucket.

---

### Cost Explorer — Cost & Usage Queries

```
ce:Get*
ce:List*
ce:Describe*
```

**Scoped to:** All resources (AWS does not support resource-level restrictions for Cost Explorer APIs).

**Why we need it:** Cost Explorer provides supplemental cost data and forecasts that complement the raw CUR files. It also powers features like Savings Plans utilization tracking and Reserved Instance coverage analysis.

**What we do with it:** We query cost and usage data to fill gaps in CUR coverage and to power near-real-time cost views. All queries are read-only.

---

### Savings Plans — Coverage & Utilization Data

```
savingsplans:List*
savingsplans:Describe*
```

**Scoped to:** All resources.

**Why we need it:** The Savings Plans APIs expose detailed utilization, coverage, and inventory data that is not included in the CUR export by default. This powers the [RI & SP Inventory](/features/ri-sp-inventory) and [RI & SP Usage Dashboard](/features/ri-sp-usage) features.

**What we do with it:** We read your active Savings Plans, their coverage rates, and utilization metrics to surface recommendations and track commitments over time.

---

### AWS Organizations — Account Enumeration

```
organizations:ListAccounts
```

**Scoped to:** All resources.

**Why we need it:** When you have multiple AWS accounts under a payer, we need to map account IDs to account names so that dashboards and reports display human-readable names rather than raw account IDs.

**What we do with it:** We call this API once during setup (and periodically to catch new accounts) to build an account ID → name mapping. We do not read any other Organizations data.

---

## ZeroWaste Connection (`cloudforecast-zw-setup-v2.json`)

ZeroWaste uses a separate read-only role, created only when you enable [ZeroWaste](/getting-started/zerowaste/). It reads resource configuration and CloudWatch metrics to find waste, such as unattached volumes and idle load balancers.

Every permission in that role, the check that uses it, and what CloudForecast reads is covered in the [ZeroWaste IAM Permissions Reference](/account/zerowaste-iam-permissions/).

---

## Security Model Summary

| Property | Detail |
|---|---|
| **Principal** | CloudForecast only |
| **Authentication** | External ID required on every role assumption — unique per CloudForecast customer |
| **Access type** | Read-only throughout — no `Put*`, `Create*`, `Delete*`, or `Update*` actions |
| **S3 scope** | CUR bucket only (core role) — no access to any other S3 buckets |
| **Resource writes** | None — CloudForecast never modifies, stops, or deletes AWS resources |
| **Data in transit** | All API calls use HTTPS / TLS |

If you have questions about any specific permission or would like a security review, contact [support@cloudforecast.io](mailto:support@cloudforecast.io).
