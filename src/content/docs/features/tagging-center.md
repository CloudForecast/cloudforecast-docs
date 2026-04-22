---
title: "Tagging Center"
description: "Monitor and improve AWS tag coverage across your entire organization with compliance reports, trend dashboards, and non-compliant resource identification."
---

Ensuring your AWS resources are properly tagged is one of the most important foundations for accurate cost allocation. Without consistent tags, it's nearly impossible to break down costs by team, environment, or service — which limits how useful your Cost Groups and reports can be.

The Tagging Center is a hub in CloudForecast for monitoring and improving tag coverage across your AWS environment. It gives you a structured way to define your tagging policy, measure compliance against it, and identify the specific resources dragging your coverage down.

Every dashboard and report in the Tagging Center has a unique URL, so you can share a focused view directly with the team or individual responsible for fixing it.

---

## Tagging Compliance Reports

A Tagging Compliance Report lets you define a tagging strategy — the specific tag keys (and optionally values) your organization expects on AWS resources — and then measure how well your environment conforms to it.

You can create as many compliance reports as you need. For example, you might have one report for your production environment tags and a separate one for cost center tracking.

### Creating a Compliance Report

Click **Create Compliance Report** from the Tagging Compliance page, then fill in the following:

1. **Compliance Report Name** — A label to identify this report (e.g. "Production Tagging Policy" or "Finance Cost Centers")
2. **Filters** — Optionally narrow the scope of the report:
   - **AWS Products** — Track compliance across all products, or select only specific ones
   - **Sub Accounts** — Include all sub-accounts or limit to specific ones
3. **Tags** — Define your tagging strategy by adding one or more tag keys:
   - Select the AWS tag key you want to track
   - Optionally specify which values are considered valid — or choose **Include All Values** to accept any value as long as the key is present

Once saved, CloudForecast generates the compliance analysis and makes two views available: Overview Graphs and Non-Compliant Resources.

### Overview Graphs

The Overview Graphs view answers four key questions about your current state:

1. **Overall Compliance** — What percentage of your resources (by cost) are fully tagged according to your policy?
2. **Compliance by Account** — Which sub-accounts are performing well, and which are falling behind?
3. **Compliance by Product** — Which AWS services (EC2, RDS, S3, etc.) have the worst tag coverage?
4. **Compliance by Tag** — Which specific tag keys have the lowest coverage?

These views make it easy to prioritize where tagging effort will have the most impact.

### Non-Compliant Resources

The Non-Compliant Resources table lists every resource that is missing one or more required tags. Each row includes:

- **Resource** — The AWS resource ID
- **Account** — Which sub-account the resource belongs to
- **Product** — The AWS service (e.g. EC2, RDS)
- **Region** — Where the resource is running
- **Cost** — The 7-day total cost and 7-day average daily cost
- **Missing Tags** — Which tag keys are absent or non-compliant

You can filter this table by product, sub-account, or cost threshold to focus on the most expensive offenders first.

### Export Options

The Non-Compliant Resources table can be exported to share with engineers or track remediation progress over time. Use the export option at the top of the table to download the current filtered view.

---

## Tagging Detective

The Tagging Detective is a complementary tool that shows compliance trends over time rather than a point-in-time snapshot. It helps you answer:

- **Is our compliance improving or getting worse?** — View weekly and daily compliance trend charts to see the direction you're heading.
- **Which resources are dragging down our score?** — The top resources view surfaces the most expensive resources associated with a specific tag key or value.

Use Tagging Detective when you want to track progress after a remediation effort or identify whether a recent deployment introduced untagged resources.

---

## How Tagging Connects to Cost Groups

Tags are the foundation of Cost Groups in CloudForecast. Cost Groups let you break down cloud spend by team, service, product, or any other dimension — but they rely on your resources being tagged consistently.

If a resource is untagged or missing the keys your Cost Groups depend on, its cost either gets lumped into an "unattributed" bucket or is excluded from your breakdowns entirely. This makes it harder to answer questions like "how much did the data platform team spend this month?" with confidence.

Improving your tagging compliance directly improves the accuracy and usefulness of all your Cost Group reports.

---

## Monthly Tagging Compliance Report

In addition to the live dashboards in the Tagging Center, CloudForecast generates a monthly Excel report summarizing your tagging compliance across all your compliance reports. This report is useful for leadership reviews, audit documentation, or sharing with teams that don't have direct CloudForecast access.

See [Tagging Compliance Report](/features/reports/tagging-compliance) for details on what the report includes and how to configure who receives it.
