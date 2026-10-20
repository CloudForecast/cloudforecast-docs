---
title: "Using ZeroWaste"
description: "How ZeroWaste finds unused and over-provisioned AWS resources, and how to review, filter, report on, and act on its recommendations."
---

ZeroWaste is CloudForecast's waste-detection feature. Once a week, it scans your AWS accounts for resources you are paying for but not fully using, such as unattached EBS volumes, idle load balancers, and over-provisioned instances. It then shows what each one costs you.

ZeroWaste is read-only. It recommends changes, and your team decides what to act on.

This page covers how to use ZeroWaste after setup. If you haven't set it up yet, start with [Setting Up ZeroWaste](/getting-started/zerowaste/).

---

## Where Recommendations Come From

ZeroWaste combines up to three sources. On the dashboard, recommendations are labeled **CloudForecast** or **AWS Cost Optimization Hub**.

| Source | What it finds | What it needs |
|---|---|---|
| **CloudForecast checks** | Unused, idle, and over-provisioned resources across EC2, EBS, RDS, load balancers, S3, and CloudWatch Logs | The [ZeroWaste IAM role](/account/zerowaste-iam-permissions/) in each account you want scanned |
| **Container checks** | Over-provisioned CPU and memory for ECS and EKS workloads | [Container cost visibility](/getting-started/setting-up-container-costs/) with split cost allocation data in your CUR |
| **AWS Cost Optimization Hub** | AWS recommendations for EC2 instances, Auto Scaling groups, EBS volumes, RDS databases, ECS services, and Lambda functions | A [Cost Optimization Hub export prefix](/getting-started/zerowaste/#export-recommendations-and-add-the-prefix) on your AWS source |

ZeroWaste does not recommend Savings Plans or Reserved Instance purchases. To track commitments, use [RI & SP Inventory](/features/ri-sp-inventory/) and the [RI & SP Usage Dashboard](/features/ri-sp-usage/).

---

## What CloudForecast Checks For

CloudForecast's own checks look at the last 14 days of usage where metrics apply:

- **EC2** — previous-generation instance families, and instances whose maximum CPU stayed under 40%
- **EBS** — unattached volumes, volumes with no reads or writes, gp2 volumes that can move to gp3, and snapshots 90 days or older
- **RDS** — databases with no connections, databases whose maximum CPU stayed under 40%, and gp2 storage that can move to gp3
- **Load balancers** — Application and Network Load Balancers with no traffic, and Classic Load Balancers with no registered instances
- **S3** — buckets with no lifecycle rules
- **CloudWatch Logs** — log groups that never expire

For exact thresholds and the permission behind each check, see the [ZeroWaste IAM Permissions Reference](/account/zerowaste-iam-permissions/#permissions-by-check).

---

## The ZeroWaste Dashboard

The dashboard groups findings into **AWS**, **AWS ECS**, and **AWS EKS** sections. Within each section, a card for each resource type, such as EC2 Instances, EBS Volumes, or S3 Buckets, shows:

- **Total cost** of the flagged resources over the last 30 days
- **Number of resources** flagged

Open a card to see every flagged resource in a table. Depending on the resource type, the table shows:

- **Recommended action** — what the check found and what to do, labeled with its source (**CloudForecast** or **AWS Cost Optimization Hub**)
- **Account and region** — where the resource lives
- **Resource details** — such as the resource ID, instance type, engine, or status
- **Cost** — what the resource cost over the last 30 days
- **Jira** — create a ticket for the resource (see [below](#creating-jira-tickets))

You can export any table to CSV.

> Resources with no cost in the last 30 days don't appear on the dashboard.

---

## Filtering Recommendations

Narrow the dashboard to the resources a team owns or cares about. You can filter by:

- **Tags**
- **Sub-accounts**
- **Cost categories**
- **Products**

To prioritize, start with the cards and resources with the highest 30-day cost.

---

## ZeroWaste and Cost Groups

Each [Cost Group](/features/cost-groups/) with an AWS source has a **Zero Waste** button. It opens the ZeroWaste dashboard scoped to that group's resources, so a team sees only its own findings.

---

## ZeroWaste Email Reports

You can add a ZeroWaste report to a cost report, so the people who receive that report also get a summary of waste findings by email. The ZeroWaste report covers the same accounts and filters as its cost report.

When you add it, choose:

- **Frequency** — weekly on Tuesday, every two weeks on Tuesday, or monthly on the first weekday after the 5th
- **Cost threshold** — only include resources costing more than (or less than) an amount you set. The default includes every resource with a cost above $0

This lets you send each team a focused waste report for the resources they own.

---

## Creating Jira Tickets

With the [Jira integration](/integrations/jira/) connected, you can create a Jira issue for any flagged resource:

1. Open a resource table on the ZeroWaste dashboard
2. Click the Jira option on the resource's row
3. Review the prefilled details, including the resource ID, its tags, and a link back to CloudForecast
4. Choose the issue type, adjust the summary and description, and create the issue

The issue lands in your Jira project with the context an engineer needs to act on it.

---

## Excluding Resources

If some resources should never be flagged, such as a disaster recovery environment, exclude them by tag:

1. Go to **Sources → ZeroWaste → Credentials** in CloudForecast
2. Under **Excluded Tags**, add a tag key and value. To exclude every value of a key, use `*` as the value
3. Save

Matching resources are excluded starting with the next weekly scan.

---

## Frequently Asked Questions

**Will ZeroWaste make any changes to my AWS resources?**
No. ZeroWaste is read-only. It never modifies, stops, resizes, or deletes resources. See the [ZeroWaste IAM Permissions Reference](/account/zerowaste-iam-permissions/) for the full list of permissions.

**How often are recommendations updated?**
ZeroWaste scans once a week. Each scan uses the latest Cost Optimization Hub export available, if you've set one up.

**Why do I see fewer recommendations than I expected?**
Common reasons:

- The ZeroWaste role isn't deployed in every account. Check **Sources → ZeroWaste → Credentials** for accounts without a green checkmark
- ZeroWaste only scans regions where your Cost & Usage Report shows spend
- The Cost Optimization Hub export prefix isn't set on your AWS source, so Hub recommendations aren't included
- The resource had no cost in the last 30 days
- The resource matches one of your **Excluded Tags**, or a dashboard filter is active

**Can I hide a recommendation I've decided not to act on?**
Yes. Tag the resource and add that tag to your [Excluded Tags](#excluding-resources).
