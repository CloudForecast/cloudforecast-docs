---
title: AWS Marketplace Dashboard
description: Track your AWS Marketplace spend — upfront fees, monthly usage, and daily cost trends — all in one place.
---

The AWS Marketplace Dashboard gives you a dedicated view of every dollar flowing through AWS Marketplace — third-party software, SaaS subscriptions, and data products billed through your AWS account. It shows upfront fees, monthly usage costs, and daily spend trends across all your Marketplace subscriptions.

Find it under **Dashboards → Marketplace Overview** in the top navigation.

---

## What's in the Dashboard

The dashboard has three tabs, each giving a different perspective on your Marketplace spend.

---

### Upfront Fees

A table of all Marketplace upfront fee commitments — annual SaaS subscriptions, private offers, and other lump-sum charges billed through the Marketplace.

| Column | What it shows |
|---|---|
| **Product Name** | The Marketplace product or subscription |
| **Start Date** | When the commitment period begins |
| **End Date** | When the commitment period ends |
| **Taxes** | Tax charges applied to this fee |
| **Total Cost (incl. Taxes)** | The full upfront amount including taxes |

The table is sortable and filterable. Use it to understand your committed Marketplace spend and track when agreements are set to expire.

---

### Monthly Usage

A table of recurring monthly usage charges for each Marketplace product, broken down by month.

| Column | What it shows |
|---|---|
| **Product Name** | The Marketplace product |
| **Month** | The billing month |
| **Taxes** | Tax charges for that month |
| **Total Cost (incl. Taxes)** | Total monthly charge including taxes |

Sorted most recent month first by default. Use this to track how your recurring Marketplace spend is trending over time and identify which products are growing.

---

### Daily Usage

A stacked area chart showing your Marketplace usage costs day by day over the past 3 months. Each Marketplace product is a separate colored area in the chart so you can see the relative contribution of each subscription to your total daily spend.

Hover over any day to see a breakdown of cost by product name.

:::note
Upfront fees are excluded from the Daily Usage chart — it shows only recurring usage charges. Upfront fees are covered in the Upfront Fees tab.
:::

---

## Frequently Asked Questions

**What qualifies as an AWS Marketplace charge?**
Any charge where the billing entity is AWS Marketplace — this includes third-party software subscriptions, SaaS products, AMI usage fees, data products, and private offers billed through your AWS account.

**Why do some products appear in Upfront Fees and also in Monthly Usage?**
Products with both an upfront fee and ongoing monthly usage charges will appear in both tabs. The upfront fee represents the commitment payment; the monthly usage represents the variable or recurring portion of the subscription.

**Are Marketplace taxes shown separately?**
Yes — taxes are shown as their own column in both the Upfront Fees and Monthly Usage tables, and the Total Cost column always includes taxes so you can see the fully loaded figure.

**How far back does the data go?**
The daily usage chart shows the past 3 months. Monthly usage and upfront fees show all historical data available in your CUR.

**Can I filter by account or product?**
The table columns are filterable — you can filter by product name or any other column directly in the table. Account-level filtering is available if your AWS organization has multiple linked accounts.
