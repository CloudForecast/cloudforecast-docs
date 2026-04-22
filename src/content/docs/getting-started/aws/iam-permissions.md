---
title: AWS IAM Permissions Reference
description: A detailed breakdown of every AWS permission CloudForecast requests, why each one is needed, and how it is used.
---

CloudForecast connects to your AWS account using **read-only IAM roles** created via CloudFormation. We never write to, modify, or delete any of your AWS resources.

There are two separate IAM roles — one for the core cost data connection and one for ZeroWaste (cost optimization recommendations). This page explains the exact permissions in each, and what CloudForecast does with them.

---

## Core AWS Connection (`cloudforecast-cu-setup.json`)

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

### Trusted Advisor & Support — Infrastructure Recommendations

```
support:DescribeTrustedAdvisorChecks
support:DescribeTrustedAdvisorCheckResult
support:RefreshTrustedAdvisorCheck
trustedadvisor:Describe*
```

**Scoped to:** All resources.

**Why we need it:** AWS Trusted Advisor surfaces cost optimization checks (e.g. underutilized EC2 instances, idle load balancers) that we incorporate into optimization recommendations alongside CUR data.

**What we do with it:** We read Trusted Advisor check results and periodically refresh them to ensure recommendations stay current. We never open or close support cases.

---

## ZeroWaste Connection (`cloudforecast-zw-setup.json`)

This role is created separately when you enable the [ZeroWaste](/getting-started/zerowaste) feature. It grants additional read-only access to resource metadata across your AWS environment, enabling CloudForecast to surface rightsizing and waste-elimination recommendations.

Like the core role, this role can only be assumed by CloudForecast, and only when the correct External ID is provided.

### CloudWatch — Resource Performance Metrics

```
cloudwatch:GetMetricStatistics
```

**Scoped to:** All resources.

**Why we need it:** CPU, network, and memory utilization metrics are the primary signal for rightsizing recommendations. An EC2 instance consistently at 5% CPU utilization is a strong candidate for downsizing or termination.

**What we do with it:** We pull historical metric statistics (not live streaming data) for resources flagged as potential waste. These metrics feed directly into recommendation confidence scores.

---

### Resource Tagging — Tag-Based Filtering

```
tag:GetResources
```

**Scoped to:** All resources.

**Why we need it:** Tags are how most teams assign ownership of AWS resources to teams, projects, or environments. Without tag data, ZeroWaste cannot route recommendations to the right cost group or owner.

**What we do with it:** We read resource tags to enrich recommendations with ownership metadata. This is what powers the [Cost Groups](/features/cost-groups) breakdown in ZeroWaste — filtering recommendations by team or environment.

---

### AWS Organizations — Multi-Account Visibility

```
organizations:ListAccounts
```

**Scoped to:** All resources.

**Why we need it:** ZeroWaste can cover recommendations across all sub-accounts in your AWS Organization. We need to enumerate accounts to know which ones to scan and to display account names in the dashboard.

**What we do with it:** Same as the core connection — we build an account ID → name mapping to make the ZeroWaste dashboard readable.

---

### Elastic Load Balancing — Idle Load Balancer Detection

```
elasticloadbalancing:DescribeLoadBalancers
elasticloadbalancing:DescribeTags
```

**Scoped to:** All resources.

**Why we need it:** Load balancers with no healthy targets or negligible traffic are a common source of unnecessary spend. Identifying them requires reading the load balancer inventory and their tags.

**What we do with it:** We check for load balancers with no active targets or very low request counts and surface them as idle resource recommendations.

---

### EC2 — Instance Inventory & Rightsizing

```
ec2:DescribeInstances
```

**Scoped to:** All resources.

**Why we need it:** EC2 is typically the largest cost driver for most AWS customers. Identifying previous-generation instance types, oversized instances, and stopped-but-not-terminated instances requires reading the full instance inventory.

**What we do with it:** We combine instance metadata (type, state, launch time) with CloudWatch utilization metrics to generate rightsizing and idle instance recommendations.

---

### EBS — Volume & Snapshot Cleanup

```
ec2:DescribeVolumes
ec2:DescribeSnapshots
```

**Scoped to:** All resources.

**Why we need it:** Unattached EBS volumes and old snapshots are a frequent source of invisible waste — they continue to accrue storage costs even when no EC2 instance uses them.

**What we do with it:** We identify volumes in an `available` state (not attached to any instance) and snapshots older than a configurable threshold, and surface them as deletion candidates.

---

### RDS — Database Instance & Snapshot Review

```
rds:DescribeDBInstances
rds:DescribeDBSnapshots
```

**Scoped to:** All resources.

**Why we need it:** Similar to EC2, RDS instances can be oversized relative to actual load. Old manual snapshots also accumulate storage costs. Identifying these requires reading the RDS inventory.

**What we do with it:** We combine RDS instance metadata with CloudWatch database metrics (connections, CPU) to flag underutilized databases and old snapshots for review.

---

### S3 — Bucket Configuration Review

```
s3:ListAllMyBuckets
s3:GetBucketLocation
s3:GetBucketTagging
s3:GetLifecycleConfiguration
```

**Scoped to:** All resources.

**Why we need it:** S3 storage costs grow silently over time, especially when buckets lack lifecycle policies. Reading bucket configuration — not the data inside buckets — lets us identify buckets without lifecycle rules that are accumulating unnecessary storage.

**What we do with it:** We check whether buckets have lifecycle policies configured. Buckets without them are surfaced as candidates for lifecycle rule setup. We read bucket tags to associate buckets with cost groups. We never read the objects inside your buckets.

---

### CloudWatch Logs — Log Group Retention Review

```
logs:DescribeLogGroups
```

**Scoped to:** All resources.

**Why we need it:** CloudWatch Log Groups without a retention policy store logs indefinitely, which can create significant and growing costs. Identifying them requires listing the log group inventory.

**What we do with it:** We flag log groups with no retention policy set (defaulting to "Never expire") as candidates for adding a retention rule. We never read the log data itself.

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
