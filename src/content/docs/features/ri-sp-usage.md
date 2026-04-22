---
title: RI & SP Usage Dashboard
description: Understand your Reserved Instance and Savings Plan coverage, savings impact, and per-commitment utilization — all in one dashboard.
---

The RI & SP Usage Dashboard answers three questions that the [RI & SP Inventory](/features/ri-sp-inventory) page doesn't: How much of your compute is actually covered by commitments? How much are those commitments saving you? And for any specific RI or SP, who is using it and how much?

Find it under **Dashboards → RI & SP → Usage** in the top navigation.

---

## What's in the Dashboard

### Filter Controls

Before diving into the sections, two filters at the top apply across the whole dashboard:

- **Data Period** — select the month you want to analyze. Defaults to the most recent available month.
- **Products** — filter the entire dashboard to specific AWS services (EC2, RDS, ElastiCache, etc.). Use "Select All" or "Clear All" to quickly toggle.

---

## Section 1 — What's My Overall Coverage?

A stacked area chart showing your daily on-demand-eligible compute cost broken down by how it was priced — each pricing term is a separate colored area:

| Pricing term | What it means |
|---|---|
| **On Demand** | Usage that ran at full On-Demand rates with no discount applied |
| **Covered by Reserved Instance** | Usage covered by an active RI commitment |
| **Covered by Savings Plan** | Usage covered by an active Savings Plan commitment |
| **Spot** | EC2 Spot Instance usage |

Hover over any day to see the exact dollar amount and percentage for each pricing term, along with the blended effective rate and overall savings rate for that day.

This chart is the fastest way to see whether your RI and SP coverage is holding steady, slipping, or improving over time. If the "On Demand" band is growing relative to the covered bands, you may be underutilizing your commitments or running workloads that aren't being matched.

---

## Section 2 — What's the Impact of My RIs and SPs?

A table showing the actual dollar savings your RIs and SPs delivered for the selected month, grouped by AWS service.

Within each service, rows are broken down by individual RI or SP commitment type. Columns:

| Column | What it shows |
|---|---|
| **Name** | The RI or SP label (service and commitment type) |
| **On Demand Cost** | What this usage would have cost at full On-Demand rates |
| **Effective Rate** | The actual blended rate you paid after discounts |
| **Savings** | The dollar amount saved compared to On-Demand pricing |

Savings figures are shown in green. Use this table to justify commitment purchases, identify which services are benefiting most from your reservations, and spot services where On Demand cost is high but savings are low — a signal that additional coverage may be worth purchasing.

---

## Section 3 — Dive Into a Specific RI or SP

Use the dropdown to select any individual RI or Savings Plan ARN. Two sub-sections appear:

### Overall Utilization

A line chart showing the utilization percentage for the selected commitment over time — how much of the reserved capacity or hourly commitment was actually consumed each day.

High utilization (close to 100%) means the commitment is being fully used. Low utilization means you're paying for capacity that isn't being consumed — a signal to investigate whether the commitment is too large, covering the wrong instance type, or attached to workloads that have scaled down.

### Who's Using It?

A table breaking down usage of the selected RI or SP by linked account and product. Columns:

| Column | What it shows |
|---|---|
| **Usage Name** | The account or product consuming this commitment |
| **On Demand Cost** | What that usage would have cost at On-Demand rates |
| **Effective Rate** | The actual rate paid after the RI/SP discount |
| **Savings** | Dollar savings from the discount applied |

Rows are grouped by linked account, then sub-grouped by product. Use this to understand which teams or accounts are benefiting from a shared commitment — useful for internal chargeback and for deciding whether to renew, resize, or reassign commitments.

---

## How This Differs from RI & SP Inventory

| | RI & SP Usage Dashboard | [RI & SP Inventory](/features/ri-sp-inventory) |
|---|---|---|
| **Primary purpose** | Coverage and savings analytics | Tracking commitments and expiration dates |
| **View type** | Charts and analytical tables | Searchable inventory list |
| **Key questions answered** | Am I covered? Am I saving money? Who's using what? | What RIs/SPs do I have? When do they expire? |
| **Time range** | Month selector with daily trend data | Current state snapshot |
| **Drill-down** | Into individual RI/SP utilization and usage | No drill-down |

Use the Usage Dashboard when you want to understand effectiveness. Use the Inventory page when you want to track what you own and plan for renewals.

---

## Frequently Asked Questions

**Why does the coverage chart show "On Demand" usage even though I have RIs and SPs?**
Not all usage is eligible for RI/SP coverage. Usage types, instance families, regions, and tenancy settings all affect whether a given workload can be matched to a commitment. "On Demand" in the chart represents usage that ran at On-Demand rates — this may be eligible usage that wasn't matched, or ineligible usage by design.

**What does a low savings rate mean?**
Either your commitments aren't being fully utilized, or you have a large proportion of usage that isn't covered by any commitment. Check Section 3 for utilization on specific RIs/SPs, and Section 1 to see how much of your total compute is running On Demand.

**Can I see RI/SP data for a specific account?**
Use the Products filter to narrow to specific services. For account-level analysis, the "Who's Using It?" table in Section 3 shows a per-account breakdown for each individual commitment.

**How recent is the data?**
Data is available month-by-month based on what AWS has finalized in your Cost & Usage Report. Select the month in the Data Period filter at the top of the dashboard.
