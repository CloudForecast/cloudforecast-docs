---
title: "Cost Detective"
description: "Cost Detective is an interactive drill-down tool that lets you investigate cost spikes, anomalies, and trends across your connected cloud data sources."
---

Cost Detective is built for one purpose: answering the question "why did my costs change?" When a Daily Cost Report flags an unexpected increase, or when you notice something unusual on a dashboard, Cost Detective gives you an interactive workspace to dig in without writing queries or exporting spreadsheets.

---

## What Cost Detective Shows

For each investigation, Cost Detective runs a set of analyses against your data source and presents the results in a structured set of views:

- **Overview**: A high-level graph of total cost over time, so you can see the shape of the change at a glance.
- **Tag Overview**: Spend broken down by your tagging structure, so you can identify which team, application, or environment is responsible.
- **Top Resources**: A ranked table of the resources driving the most spend in the period.
- **Trending Resources**: Resources whose costs are growing fastest — the most likely candidates for a spike.
- **New Resources**: Resources that appeared for the first time in the period, which can indicate unexpected provisioning.

Together these views let you move from "something spiked" to "this specific resource in this subscription started yesterday" in a few clicks.

---

## Starting an Investigation

Cost Detective is scoped to a single data source. To start:

1. Open **Cost Detective** from the sidebar.
2. Select the data source you want to investigate.
3. Apply filters to scope the investigation (optional — leaving filters empty covers everything).
4. Click **Explore** to run the analysis.

### Filters

Filters let you narrow the investigation before running it. Available dimensions depend on the data source:

**Azure:**
- Subscriptions
- Resource Groups
- Tags

**AWS:**
- Sub-accounts
- Services
- Tags
- Cost Categories

You can leave any filter unset to include all values for that dimension. The Applied Filters panel on the right updates as you make selections, so you always see exactly what will be included before you run the analysis.

---

## Editing and Refining

After an investigation runs, you can adjust your filters without starting over. Click **Edit Filters** on the results page to return to the filter form with your previous selections preserved. After updating, click **Explore** again — the results refresh with the new scope.

This makes it easy to progressively narrow down the source of a cost change: start broad (all subscriptions), confirm which subscription is the problem, then filter to just that subscription and drill into resource groups or tags.

---

## Saving and Sharing

Every Cost Detective investigation is saved automatically. When you run an analysis, CloudForecast generates a unique URL for that exact filter configuration. You can bookmark it or share the URL directly with a teammate — they will see the same investigation you ran, with the same filters applied.

---

## Investigating Alerts

Cost Detective integrates naturally with your Cost Group alerts. When a Daily Cost Report shows a spike, you can jump directly into Cost Detective for the data source in question to understand what changed. Start with the Trending Resources and New Resources views — these are the most likely explanations for a sudden increase.

The filters you use in Cost Detective are the same dimensions available in your Cost Group filters, so once you identify the root cause, you can use that information to tighten your Cost Group configuration or adjust alert thresholds accordingly.
