---
title: "Daily Cost Report"
description: "Understand every section of the CloudForecast daily cost report, from the subject line and forecast alerts to product, region, and tag breakdowns."
---

The Daily Cost Report is the core CloudForecast report. It arrives each morning once AWS finalizes cost data for the prior day and gives you a quick read on whether your cloud spend is on track.

---

## Subject Line

The subject line is the first signal you see. CloudForecast uses a set of weather emojis to indicate the cost status for the day at a glance:

| Status | Emoji | Meaning |
|--------|-------|---------|
| Sunny | ☀️ | Cost is within your defined thresholds — no action needed. |
| Cloudy | ☁️ | Cost is elevated but within your warning range. |
| Stormy | ⛈ | Cost has exceeded your critical threshold — open the report to investigate. |

These thresholds are fully configurable in your report settings. If it is sunny, you can archive the email without reading further. If it is cloudy or stormy, open the report to see what is driving the change.

---

## Today's Spend

At the top of the report is the spend figure for the day being reported, along with its status emoji. By default, this compares the day's cost to the day before. You can change this comparison in your report configuration to:

- **Day Over Day** – Compare to the previous day.
- **Week Over Week** – Compare to the same day in the prior week.
- **Seven Day Average** – Compare to the average of the last 7 days.

> **Note:** AWS cost data can take up to 24 hours to finalize. CloudForecast sends the report as soon as AWS marks the data as complete. Occasionally AWS is late delivering finalized data, which can delay the report.

---

## Forecast Alerts

If any area of your environment has a significant cost increase, CloudForecast surfaces it as a Forecast Alert card. Each card shows:

- The category with the anomaly (total spend, product, region, tag, or sub-account).
- The cost comparison figures.
- The percentage increase.

These alerts are triggered when a cost increase exceeds the thresholds you configure in your report settings. You can set separate thresholds for products, regions, tags, and sub-accounts, as well as a minimum dollar amount to filter out low-impact noise.

---

## Daily Comparisons

The daily usage section gives you a fuller picture of how the day's cost compares across multiple time horizons:

- Day before
- Week over week
- 7-day average
- 30-day average

---

## Monthly Totals

The monthly data section shows how your cost is trending for the full month:

- Last month's total cost
- Month-to-date cost
- Projected end-of-month estimate

It also breaks out fixed cost components separately so you can distinguish one-time or predictable charges from variable spend:

- Reserved Instance cost
- Savings Plan cost
- Fixed cost (one-time charges)
- Taxes

---

## RI and Savings Plan Section

Available on Growth and Enterprise plans, this section shows your overall Reserved Instance and Savings Plan utilization and flags any purchases expiring within 90 days.

For upcoming expirations, the report lists them in ascending order by expiration date and shows:

- Days until expiration
- Instance type
- Region
- Instance identifier

CloudForecast also includes a direct link to the relevant purchase in the AWS Console for quick access.

---

## Product, Region, Tag, and Sub-account Breakdowns

The report includes graphs showing your top 10 costs by product, region, tag, and sub-account. These give you a quick visual read on where spending is concentrated and how it has trended.

Each graph also includes an externally linked interactive version. These linked graphs can be shared with teammates via a unique secure URL. To enable public sharing of these graphs, configure the Graph Access setting under **Account → Settings**.
