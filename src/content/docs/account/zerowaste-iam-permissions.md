---
title: ZeroWaste IAM Permissions Reference
description: Every AWS permission the ZeroWaste role grants, which check uses it, what CloudForecast looks at, and what it never does.
---

ZeroWaste uses its own **read-only IAM role**, separate from the [core AWS connection](/account/iam-permissions/). The role lets CloudForecast scan your resources for waste, such as unattached volumes, idle load balancers, and over-provisioned instances. It cannot create, change, stop, or delete anything.

This page walks through the full role, statement by statement, so you know exactly what you are granting.

> **The template:** [`cloudforecast-zw-setup-v2.json`](https://assets-cloudforecast-io.s3.amazonaws.com/cloudforecast-zw-setup-v2.json)
>
> Setup steps are in [Setting Up ZeroWaste](/getting-started/zerowaste/).

---

## Permissions at a Glance

Every permission in the role is a read-only `Describe`, `Get`, or `List` call.

| Permission | Used for |
|---|---|
| `ec2:DescribeInstances` | Previous-generation and over-provisioned EC2 instances |
| `ec2:DescribeVolumes` | Unattached or idle EBS volumes, and gp2 volumes that can move to gp3 |
| `ec2:DescribeSnapshots` | EBS snapshots older than 90 days |
| `rds:DescribeDBInstances` | Unused and over-provisioned RDS databases, and gp2 storage that can move to gp3 |
| `rds:DescribeDBSnapshots` | Not used by any current check (see [below](#granted-but-not-currently-used)) |
| `elasticloadbalancing:DescribeLoadBalancers` | Unused Application, Network, and Classic Load Balancers |
| `elasticloadbalancing:DescribeTags` | Tags on Application and Network Load Balancers |
| `s3:ListAllMyBuckets` | Listing your S3 buckets |
| `s3:ListBucket` | Included with the S3 check. ZeroWaste does not list or read objects |
| `s3:GetBucketLocation` | Finding each bucket's region |
| `s3:GetBucketTagging` | Tags on S3 buckets |
| `s3:GetLifecycleConfiguration` | S3 buckets with no lifecycle rules |
| `logs:DescribeLogGroups` | CloudWatch log groups with no retention period |
| `cloudwatch:GetMetricStatistics` | 14 days of usage metrics for the checks above |
| `tag:GetResources` | Tags on Classic Load Balancers and log groups |
| `organizations:ListAccounts` | Not used by any current check (see [below](#granted-but-not-currently-used)) |

Every statement uses `"Resource": "*"`, because AWS does not support resource-level restrictions for these describe and list calls.

---

## Who Can Use the Role

The role can only be assumed by CloudForecast, and only with your External ID.

| Setting | Value |
|---|---|
| **Role name** | `CloudForecast-ZeroWaste` by default (the `RoleName` parameter). CloudForecast must know the name, so it is also the stack's only output |
| **Trusted principal** | One specific CloudForecast IAM role, `arn:aws:iam::656227328603:role/<CloudForecastAccessRole>`. Not the whole CloudForecast AWS account |
| **External ID** | Required on every `sts:AssumeRole` call. It is unique to your CloudForecast account and prevents [confused deputy](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html) access |
| **CloudForecastAccessRole** | The CloudForecast role allowed to assume this one. The template only accepts the two CloudForecast roles listed in its `AllowedValues` |

---

## Where and When ZeroWaste Scans

- **Accounts:** The payer account where you launch the stack, plus any member accounts where you deploy the role with a CloudFormation StackSet. An account without the role is not scanned.
- **Regions:** Only the account and region pairs that show spend in your Cost & Usage Report. CloudForecast does not sweep every AWS region.
- **Lookback:** Checks that use CloudWatch metrics look at the last **14 days**.

---

## Permissions by Check

The template creates one IAM policy per check, so you can see in the IAM console which permission belongs to which check. Policy names below match what you will see in your account.

### EC2 Instances

**Policies:** `CloudForecast-ZW-Ec2PreviousGeneration`, `CloudForecast-ZW-Ec2OverProvisioned`

```
ec2:DescribeInstances
```

- **Previous-generation instances:** running instances in older families (such as `t2`, `m4`, `c4`, `r4`, `i2`, `p2`) that are candidates for an upgrade to a current generation.
- **Over-provisioned instances:** running instances at least 14 days old whose **maximum CPU stayed under 40%** for the last 14 days, for the supported general-purpose and burstable instance types.

**What we read:** instance type, state, launch time, and tags. We never connect to instances or read anything running on them.

---

### EBS Volumes and Snapshots

**Policies:** `CloudForecast-ZW-EbsUnusedOrUnattached`, `CloudForecast-ZW-EbsOldSnapshots`

```
ec2:DescribeVolumes
ec2:DescribeSnapshots
```

- **Unused or unattached volumes:** volumes older than 15 days that are not attached to any instance, or that had **zero reads and writes** in the last 14 days.
- **gp2 to gp3:** gp2 volumes older than 15 days whose usage stays within gp3's baseline performance, so they can move to the cheaper gp3 type.
- **Old snapshots:** EBS snapshots **90 days or older**.

**What we read:** volume and snapshot metadata, such as type, size, state, attachments, creation date, and tags. We never read the data stored on volumes or snapshots.

---

### RDS Databases

**Policies:** `CloudForecast-ZW-RdsUnused`, `CloudForecast-ZW-RdsOverProvisioned`, `CloudForecast-ZW-RdsResizeStoreage`

```
rds:DescribeDBInstances
```

- **Unused databases:** instances older than 14 days with **no connections** in the last 14 days. Neptune is excluded.
- **Over-provisioned databases:** instances older than 14 days whose **maximum CPU stayed under 40%** for the last 14 days, for the supported instance classes.
- **gp2 to gp3 storage:** instances on gp2 storage whose usage stays within gp3's baseline performance.

**What we read:** instance class, engine, storage type, creation date, and tags. We never connect to your databases or read their data.

---

### Load Balancers

**Policies:** `CloudForecast-ZW-AlbUnusedPolicy`, `CloudForecast-ZW-ElbUnused`

```
elasticloadbalancing:DescribeLoadBalancers
elasticloadbalancing:DescribeTags
```

- **Unused Application Load Balancers:** older than 14 days with **no requests** in the last 14 days.
- **Unused Network Load Balancers:** older than 14 days with **no traffic** in the last 14 days.
- **Unused Classic Load Balancers:** no registered instances.

**What we read:** load balancer type, creation date, registered instances, and tags. We never read listener rules, certificates, or traffic.

---

### S3 Buckets

**Policy:** `CloudForecast-ZW-S3PolicyCheck`

```
s3:ListAllMyBuckets
s3:ListBucket
s3:GetBucketLocation
s3:GetBucketTagging
s3:GetLifecycleConfiguration
```

- **Buckets without lifecycle rules:** buckets with no lifecycle configuration, where old objects and versions can build up storage costs.

**What we read:** the bucket list, plus each bucket's region, tags, and lifecycle configuration. Those are the only three bucket calls ZeroWaste makes. `s3:ListBucket` is part of the policy, but ZeroWaste never lists, opens, or downloads objects in your buckets.

---

### CloudWatch Log Groups

**Policy:** `CloudForecast-Aws-CloudWatch-Logs`

```
logs:DescribeLogGroups
```

- **Log groups that never expire:** log groups with no retention period, which keep storing logs indefinitely.

**What we read:** log group names and retention settings. We never read log events.

---

### Usage Metrics and Tags (Shared)

**Policy:** `CloudForecast-Aws-Common-Policy`

```
cloudwatch:GetMetricStatistics
tag:GetResources
```

- **Metrics:** 14 days of summary statistics behind the checks above. These are EC2 and RDS CPU utilization, RDS connections, EBS and RDS read and write operations and throughput, ALB request count, and NLB processed bytes.
- **Tags:** tags for Classic Load Balancers and log groups, which the other describe calls don't return. Tags let you filter ZeroWaste by team, cost group, or environment.

**What we read:** historical metric statistics and resource tags only. We don't read or create alarms, dashboards, or tag values on any other resources.

---

## Granted but Not Currently Used

The template grants two permissions that no current ZeroWaste check uses:

- **`rds:DescribeDBSnapshots`** (policy `CloudForecast-ZW-RdsOldSnapshot`): reserved for an old RDS snapshot check. ZeroWaste does not currently flag RDS snapshots.
- **`organizations:ListAccounts`** (policy `CloudForecast-Aws-Organization-Policy`): CloudForecast lists your organization's accounts through the [core AWS connection](/account/iam-permissions/#aws-organizations--account-enumeration), not through this role.

Both are read-only. If you prefer not to grant them, contact [support@cloudforecast.io](mailto:support@cloudforecast.io) before removing them.

---

## Recommendations That Need No ZeroWaste Permissions

Some ZeroWaste recommendations come from data CloudForecast already has, so they need nothing from this role:

- **AWS Cost Optimization Hub:** CloudForecast reads Hub recommendations from a Data Export in your CUR bucket, using the prefix you add to your AWS source. See [Export recommendations and add the prefix](/getting-started/zerowaste/#export-recommendations-and-add-the-prefix).
- **ECS and EKS containers:** CPU and memory over-provisioning for containers comes from split cost allocation data in your Cost & Usage Report. See [Setting Up EKS & ECS Container Cost Visibility](/getting-started/setting-up-container-costs/).

---

## Security Model Summary

| Property | Detail |
|---|---|
| **Access type** | Read-only. No `Create*`, `Put*`, `Update*`, `Delete*`, `Stop*`, or `Modify*` actions |
| **Principal** | One specific CloudForecast role, not the whole CloudForecast account |
| **Authentication** | External ID required on every role assumption, unique per CloudForecast customer |
| **Data accessed** | Resource configuration, tags, and CloudWatch metric statistics. Never object contents, database data, volume data, or log events |
| **Resource writes** | None. ZeroWaste only recommends. Your team decides what to change |
| **Data in transit** | All AWS API calls use HTTPS / TLS |

### Removing Access

Delete the ZeroWaste CloudFormation stack in your payer account, and the StackSet if you deployed one to member accounts. This deletes the role and all of its policies. ZeroWaste stops scanning, and your core cost reporting is not affected.

If you have questions about any permission or need a security review, contact [support@cloudforecast.io](mailto:support@cloudforecast.io).
