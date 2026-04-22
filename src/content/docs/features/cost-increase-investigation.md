---
title: Cost Increase Investigation
description: When CloudForecast detects a significant cost spike in your Cost Group report, it automatically generates a dedicated investigation page that explains what drove the increase.
---

When CloudForecast detects a significant cost increase in your Cost Group report, it automatically generates a **"Why is my cost going up?"** investigation page. This gives you a focused, pre-loaded view of what drove the spike — without having to manually set up filters or dig through raw cost data.

---

## How It Works

When a cost spike triggers a Cloudy or Stormy alert in your Cost Group report, a **Why?** link appears alongside the alert card — both in the email and in Slack.

Clicking **Why?** opens a dedicated investigation page scoped to that exact alert: the service, tag, account, or dimension that triggered it, the time period, and the cost threshold that was crossed.

From that page you can:

- See a breakdown of what changed and by how much
- Understand which services, accounts, or tags are contributing to the increase
- Create a **Jira issue** directly from the page — pre-filled with the alert title, source, and report date — to assign follow-up to the right team

---

## Where to Find It

**Why?** links are generated automatically — there is nothing to configure. They appear in your Cost Group alert cards whenever a significant cost increase is detected. Look for the link next to the alert in your daily email report or Slack notification.

> **Why?** links are available on paid plans only.

---

## Related Features

- [Cost Increase Alerts](/features/cost-increase-alerts) — configure the thresholds that trigger alerts
- [Cost Detective](/features/cost-detective) — explore cost changes across any dimension on demand
- [Jira Integration](/integrations/jira) — connect Jira to create issues directly from alert pages
