---
title: Databricks Cost Dashboard
description: Understand your Databricks Unit (DBU) costs broken down by workspace, cluster, and owner — alongside underlying cloud infrastructure spend — in one unified view.
---

:::caution[Early Access]
The Databricks dashboard is currently in beta and early access. Features and breakdowns may evolve as we continue to build out this integration. If you have feedback or questions, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).
:::

Once your Databricks source is active, CloudForecast gives you a dedicated dashboard for understanding where your Databricks Unit (DBU) costs are going — and, if your Databricks account runs on AWS or Azure, how much you're spending on the underlying cloud infrastructure.

For setup instructions, see [Connecting Databricks to CloudForecast](/getting-started/connecting-databricks/).

---

## What's in the Dashboard

The Databricks dashboard has two views:

- **Databricks Costs** — DBU spend broken down by workspace, cluster, and owner
- **Cloud Provider Costs** — the AWS or Azure infrastructure costs attributed to your Databricks workloads (only available if a cloud provider account is linked)

---

## Databricks Costs View

### Summary Metrics

At the top of the dashboard, a summary card shows your DBU spend for the selected period:

- **Last Month** — total DBU cost for the prior full calendar month
- **Month-to-Date** — spend so far in the current month
- **Forecast** — projected total for the full current month, based on your recent daily spend rate
- **Percent change** — how your current trajectory compares to the prior period, with a weather icon (☀️ Sunny < 5%, ⛅ Cloudy 5–20%, ⛈️ Stormy > 20%)

When using a custom date range, the card switches to period mode: showing the selected period total, the equivalent prior period total, and the percent change between them.

### Cost Trend Chart

A daily stacked column chart showing your DBU costs over time. You can drill down:

1. Click any day to see cost broken down by **workspace**
2. Click a workspace to see cost broken down by **SKU** (the specific Databricks product driving spend, such as Jobs, SQL, or Notebooks)

Use the **Top 10 / Top 20** controls to limit how many series are visible at once, or use the search to pin specific workspaces.

### Breakdown by Owner

An expandable table showing DBU cost broken down by the user or principal that owns each cluster. Columns:

| Column | What it shows |
|---|---|
| **Owner** | The user or service principal that owns the cluster |
| **Total Cost** | DBU cost attributed to clusters owned by this user for the selected period |
| **% of Total** | Share of overall DBU spend |

This breakdown is useful for chargeback and for identifying which teams or individuals are driving the most Databricks spend.

### Breakdown by Cluster

An expandable table showing cost per cluster. Columns:

| Column | What it shows |
|---|---|
| **Cluster** | Cluster name (or cluster ID if no name is set) |
| **Total Cost** | DBU cost for this cluster during the selected period |
| **% of Total** | Share of overall DBU spend |

---

## Cloud Provider Costs View

If your Databricks account is linked to an AWS or Azure source in CloudForecast, a **Cloud Provider Costs** view becomes available. This shows the underlying infrastructure spend — EC2 instances, storage, networking — attributable to your Databricks workloads.

### Summary Metrics

Same structure as the Databricks Costs summary: Last Month, Month-to-Date, Forecast, and percent change — but for cloud provider spend rather than DBU spend.

### Cost Trend Chart

A daily chart showing cloud provider costs over time, with drilldown by workspace → cluster → cloud service.

### Breakdown by Service

Shows cloud provider costs split by service category (e.g. Compute, Storage, Networking). Useful for understanding the infrastructure profile of your Databricks workloads.

### Breakdown by Usage Type

Shows cloud provider costs split by pricing model:

- **On Demand** — standard pay-as-you-go pricing
- **Reserved** — Reserved Instance pricing
- **Savings Plans** — Savings Plan covered usage
- **Spot** — EC2 Spot Instance pricing

---

## Filters

All charts and breakdowns respond to the filters at the top of the dashboard:

| Filter | What it does |
|---|---|
| **Workspace** | Limits all data to a single Databricks workspace |
| **Owner** | Limits all data to clusters owned by a specific user or principal |
| **Date Range** | Presets: This Week, Last Week, Last 30 Days — or a custom start and end date |

Workspace and owner filters work together — selecting both will show only clusters owned by that user in that workspace.

---

## Frequently Asked Questions

**Why don't my DBU costs match my Databricks invoice?**
CloudForecast calculates costs using Databricks list prices from system tables. If you have a committed use discount, you can enter a discount percentage when setting up your source and CloudForecast will apply it. Minor differences may still appear due to rounding or pricing lag.

**What does the forecast represent?**
The forecast uses your average daily spend from the past 7 days to project the full current month. It's an estimate — if your usage pattern is irregular, the forecast may not reflect peaks or troughs accurately.

**What is a SKU in Databricks?**
A SKU is the specific Databricks product type consuming DBUs — for example, Jobs Compute, SQL Pro, or Standard Interactive. Each SKU has a different DBU rate, so the same underlying compute can cost different amounts depending on which product is using it.

**When will more breakdowns be available?**
The Databricks dashboard is in active development. Job-level and query-level cost breakdowns are planned. Reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io) if there's a specific breakdown you need.
