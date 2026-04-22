---
title: RI & SP Inventory
description: Track all your Reserved Instances and Savings Plans in one place, with expiration alerts and utilization insights to avoid surprise lapses and wasted spend.
---

## What is the RI & SP Inventory?

The RI & SP Inventory is a centralized dashboard that gives you a complete view of every Reserved Instance (RI) and Savings Plan (SP) across your AWS accounts. Instead of hunting through the AWS Console account by account, CloudForecast aggregates all your commitments in one place so you can monitor their health, spot expiring commitments before they lapse, and identify underutilized ones that may be wasting money.

## What the inventory shows

Each commitment in the table includes:

- **Type** — Reserved Instance (RI) or Savings Plan (SP)
- **ARN** — the unique identifier for the commitment
- **Service** — the AWS service the commitment applies to (EC2, RDS, ElastiCache, etc.)
- **Details** — for RIs: instance type, platform, and region; for SPs: the hourly commitment amount
- **Start date** — when the commitment began
- **End date** — when the commitment expires
- **Days remaining** — how many days until expiration, color-coded by urgency
- **Status** — Active, Expiring Soon, Critical, or Expired

## Expiration tracking

Commitments are color-coded and categorized by how close they are to expiring:

| Status | Threshold |
|--------|-----------|
| **Active** | More than 60 days remaining |
| **Expiring Soon** | 60 days or fewer remaining |
| **Critical** | 7 days or fewer remaining |
| **Expired** | Already lapsed |

This visual system lets you immediately spot commitments that need attention. You can also filter the table to show only commitments expiring within the next 30, 60, or 90 days.

## Filtering and searching

The inventory table includes several ways to narrow down what you're looking at:

- Filter by **type** (Reserved Instances or Savings Plans)
- Filter by **service** (EC2, RDS, and others)
- Filter by **status** (Active, Expiring, Critical, Expired)
- **Search** by ARN, service name, region, instance type, or platform
- Use the **30d / 60d / 90d** quick filters to show commitments expiring within a given window

## Avoiding surprise expirations

When an RI or SP expires without renewal, your workloads continue running but at on-demand pricing — which can be significantly more expensive. The RI & SP Inventory helps you stay ahead of this by making upcoming expirations visible well in advance.

Use the Critical filter to see anything expiring within 7 days that needs immediate action. Use the Expiring Soon filter to identify commitments you should evaluate for renewal within the next 30-60 days.

## Identifying unused commitments

Reserved Instances and Savings Plans that are not being utilized represent money you have already committed but are not getting value from. CloudForecast surfaces low-utilization alerts in your Cost Group reports when RIs or SPs fall below acceptable utilization thresholds, so you can take corrective action — such as modifying the RI, selling it on the AWS Marketplace, or adjusting your workloads to take advantage of the coverage.

## Exporting to CSV

You can export the full inventory to a CSV file using the **Export CSV** button at the top of the page. The export includes all fields: type, ARN, service, instance type, platform, region, start date, end date, days remaining, status, and commitment amount.

This is useful for sharing with finance teams, auditing your commitment portfolio, or working through renewal decisions offline.
