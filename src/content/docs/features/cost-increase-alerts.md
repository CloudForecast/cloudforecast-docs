---
title: Cost Increase Alerts
description: Automatically detect unexpected spikes in your cloud spend and get notified before a cost increase becomes a costly surprise.
---

## What are Cost Increase Alerts?

Cost Increase Alerts automatically notify you when your cloud spend rises unexpectedly. Rather than waiting until the end of the month to discover an overage, CloudForecast monitors your spending patterns continuously and sends an alert the moment something looks out of the ordinary — whether that is a sudden jump in a single service, an account that started spending more than usual, or a workload whose cost trajectory has shifted.

Alerts are configured per Cost Group, so you can tune the sensitivity and notification channels independently for each team, product, or environment you track.

## How they work

CloudForecast analyzes your spending data against a configured comparison pattern and triggers an alert when spend crosses a defined threshold. Three comparison patterns are available:

- **Day-over-day** — compares today's spend to the same period yesterday. Best for catching acute spikes quickly.
- **Week-over-week** — compares this week's spend to the same period last week. Better for workloads with weekly seasonality (e.g., lower weekend traffic).
- **Budget-based** — triggers when your month-to-date spend is forecast to exceed a budget target you set. Useful for hard budget accountability.

You configure the comparison pattern and alert threshold when setting up your Cost Group report. Once configured, CloudForecast runs the analysis automatically on each reporting cycle — no manual monitoring required.

## What an alert contains

When an alert fires, the notification includes a breakdown of what drove the cost increase:

- **By service** — which AWS, Azure, or Databricks services saw the largest increases
- **By account or subscription** — which accounts contributed most to the spike
- **By data source** — which connected data sources are implicated

This breakdown is designed to help you answer "why is my cost going up?" at a glance, without having to dig through raw billing data first.

## Where alerts are delivered

Alerts can be delivered to multiple destinations simultaneously:

- **Email** — sent to the recipients configured on the Cost Group report
- **Slack** — posted to a channel via a webhook integration
- **Microsoft Teams** — posted via a Teams webhook
- **PagerDuty** — creates an incident via a PagerDuty integration key
- **OpsGenie** — creates an alert via an OpsGenie API key

Each integration is configured independently on the Cost Group report settings page. You can enable one or multiple destinations depending on the urgency and audience for a given Cost Group.

## Investigating an alert with Cost Detective

Every cost increase alert includes a link to **Cost Detective**, CloudForecast's drill-down investigation tool. Cost Detective takes you directly from the alert to a detailed view of the specific service, account, or dimension that triggered it, so you can investigate the root cause without starting from scratch.

From Cost Detective, you can see the historical cost trend for the affected item, compare it to prior periods, and identify whether the increase is a one-time event or an ongoing shift in your spend pattern.

If your team uses Jira, you can also create a Jira issue directly from the alert investigation page to track the follow-up work.
