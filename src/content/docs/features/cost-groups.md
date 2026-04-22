---
title: "Cost Groups"
description: "Cost Groups are the core building block of CloudForecast. Each Cost Group connects to one or more data sources and powers your reports, alerts, and dashboards."
---

A Cost Group is a configured view of your cloud costs. It ties together one or more data sources, optional filters to scope the data, and the set of reports and alerts you want to receive. Everything in CloudForecast — daily digests, weekly savings reports, monthly financial summaries, spend alerts — flows from a Cost Group.

Most teams create one Cost Group per business unit, product, or environment. You can create as many as your plan allows.

---

## Creating a Cost Group

Navigate to **Cost Groups** in the sidebar and click **Add New Cost Group**.

### Name

Give the Cost Group a clear, descriptive name (for example, "Production AWS", "Data Platform", or "Azure East US"). This name appears in every report and alert sent from this group.

### Email recipients

Add the email addresses that should receive reports from this Cost Group. You can add multiple recipients. Recipients do not need a CloudForecast account.

After filling in the name and recipients, click **Create Cost Group**. You will be taken to the Cost Group configuration page where you can connect data sources, configure reports, and set up alerts.

---

## Connecting Data Sources

Once a Cost Group is created, connect it to one or more of your cloud data sources (AWS accounts, Azure subscriptions, etc.) that you have already added to CloudForecast. Each connected data source can have its own filters applied independently.

### Filters

Filters let you scope a data source down to a subset of your cloud spend. Available filter dimensions depend on the data source type:

**AWS filters:**
- Sub-accounts
- Services (products)
- Tags (key/value pairs)
- Cost Categories
- Regions
- Charge type

**Azure filters:**
- Subscriptions
- Resource Groups
- Tags

When multiple filters are set, they are combined — only costs matching all filter conditions are included in the Cost Group.

---

## Reports

Each Cost Group can send up to three types of reports. You configure each report independently.

### Daily Cost Report

A day-over-day summary of your cloud spend. The Daily Cost Report is sent on the frequency you choose (daily or a specific day of the week). It highlights spend changes, surfaces unexpected increases, and shows a breakdown by service, account, tag, or other dimension.

You can configure:
- **Data grouping**: Break down costs by account, region, service, tag key/value, tag values for a tag key, or charge type.
- **Granularity**: Control how the cost data is aggregated in the report.
- **Filters**: Apply additional filters within a specific report module.

### Weekly RI & SP Report

Available on Enterprise plans. Tracks your Reserved Instance and Savings Plan coverage, utilization, and potential savings. Delivered weekly.

### Monthly Financial Report

A month-in-review summary of total spend, budget progress, and trends. Sent on the schedule you configure.

---

## Delivery Channels

Reports and alerts can be delivered to multiple channels:

- **Email**: All reports are sent to the email recipients you configured.
- **Slack**: Connect a Slack channel to receive report summaries. You can set the delivery frequency and choose between a detailed or compact message format.
- **Microsoft Teams**: Connect a Teams channel to receive report summaries on the schedule you choose.
- **Cortex**: Available for teams using the Cortex developer portal.

Delivery frequency can be configured independently per channel.

---

## Alert Thresholds

CloudForecast monitors your spend patterns and can alert you when something unusual happens. Alerts are delivered through the same channels as your reports.

### Spend pattern

Choose how CloudForecast evaluates your daily spend. Options control whether alerts are based on the overall spend pattern or individual cost category changes.

### Spend spike thresholds

Set two threshold levels for day-over-day spend increases:

- **Cloudy**: A warning-level alert triggered when daily spend increases by at least the percentage you specify.
- **Stormy**: A critical-level alert triggered at a higher percentage increase.

You can also set a **minimum dollar difference** so that small absolute changes (even large percentages) do not generate noise.

### Monthly budget alerts

Set a fixed monthly budget for the Cost Group. CloudForecast will alert you at the frequency you choose (for example, when you reach 80% of budget) so you are never surprised at month-end.

---

## Cost Metrics

Choose which cost metric powers your reports:

| Metric | Description |
|---|---|
| **Unblended** | The standard on-demand or contracted rate for each resource. |
| **Amortized** | Spreads upfront Reserved Instance and Savings Plan fees evenly across the commitment period. Useful for showing the true cost of each day. |
| **Net Unblended** | Unblended costs after applying any discounts, credits, and refunds. |

You can also configure:
- **Usage only**: Exclude support, tax, and other non-usage line items.
- **Billing entity**: Include or exclude AWS Marketplace charges.

---

## Managing Multiple Cost Groups

The Cost Groups index page lists all your Cost Groups. From there you can:
- Search by name or recipient
- Open any Cost Group's configuration
- Access the Daily Report History, Cost Dashboard, or Zero Waste tools for each group (based on your plan)

You can switch between Cost Groups quickly from within any report view.

---

## After Creation

After you create a Cost Group and connect a data source, CloudForecast begins processing your billing data. Your first report and dashboard data will be available within **24 to 36 hours**. You will receive your first Daily Cost Report on the next scheduled delivery after data is ready.
