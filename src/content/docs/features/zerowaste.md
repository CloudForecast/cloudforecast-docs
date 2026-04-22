---
title: "Using ZeroWaste"
description: "How to read and act on ZeroWaste recommendations to reduce AWS waste through rightsizing, idle resource cleanup, Savings Plans, and Reserved Instances."
---

ZeroWaste is CloudForecast's cost optimization feature. Once set up, it continuously surfaces actionable recommendations to reduce waste across your AWS environment — organized by type, filterable by team or account, and integrated with Jira so nothing falls through the cracks.

This page covers how to use ZeroWaste after setup is complete. If you haven't set it up yet, start with the [ZeroWaste Setup Guide](/getting-started/zerowaste).

---

## The ZeroWaste Dashboard

The ZeroWaste dashboard is your starting point for reviewing cost optimization opportunities. Recommendations are grouped by type so you can quickly focus on the category most relevant to your team:

- **Rightsizing** — EC2 instances, RDS databases, Lambda functions, and other resources that are over-provisioned based on actual usage
- **Idle Resources** — Resources that are running but consuming little or no meaningful workload (e.g. unused EBS volumes, idle EC2 instances)
- **Savings Plans** — Commitment-based discount recommendations based on your on-demand usage patterns
- **Reserved Instances** — RI purchase recommendations for services where Savings Plans don't apply (e.g. RDS, ElastiCache, Redshift)
- **Other Optimizations** — Graviton migration opportunities, ECS/EKS Fargate rightsizing, and additional recommendations from AWS Cost Optimization Hub

Each group shows the total estimated monthly savings available, so you can immediately see where the biggest opportunity lies.

---

## Reading a Recommendation

Each recommendation card gives you the information needed to evaluate and act on it:

- **Resource ID** — The specific AWS resource the recommendation applies to (e.g. an EC2 instance ID or RDS instance name)
- **Account and Region** — Which sub-account and AWS region the resource lives in
- **Current Cost** — The estimated monthly cost of the resource at its current configuration
- **Potential Savings** — How much you could save per month by acting on the recommendation
- **Recommended Action** — What to do: resize to a specific instance type, delete the resource, purchase a commitment, or migrate to a different family (e.g. Graviton)
- **Confidence** — AWS's confidence level in the recommendation, based on the amount of usage data available

Recommendations come from [AWS Cost Optimization Hub](https://docs.aws.amazon.com/cost-management/latest/userguide/cost-optimization-hub.html), which aggregates data from AWS Compute Optimizer and other AWS services. CloudForecast refreshes this data daily.

---

## Filtering and Prioritizing Recommendations

When you have hundreds of recommendations across a large AWS environment, filtering is essential for getting to the ones your team should act on first.

You can filter recommendations by:

- **Account** — Narrow to a specific sub-account to focus a team on their own resources
- **Region** — Filter to a specific AWS region
- **Service** — Show only recommendations for EC2, RDS, Lambda, or other specific services
- **Tag** — Filter by resource tags to see recommendations scoped to a particular team, environment, or application

To prioritize effectively, sort by **Potential Savings** descending. This surfaces the highest-impact items first and is usually the right place to start. For teams with compliance requirements, filtering by a specific account or tag before sorting gives a focused list that's easier to assign and track.

---

## Weekly ZeroWaste Health Check Report

Each week, CloudForecast sends a ZeroWaste health check report summarizing the top optimization opportunities across your environment. The report is designed to be actionable at a glance and is typically reviewed in weekly or bi-weekly engineering or infrastructure syncs.

The health check report includes:

- **Total estimated savings available** — The aggregate monthly savings opportunity across all recommendation types
- **Top recommendations by savings** — A prioritized list of the highest-impact individual resource recommendations
- **New recommendations since last week** — Items that appeared since the previous report, so you can catch newly idle or newly over-provisioned resources quickly
- **Savings realized** — Estimated savings from recommendations that were acted on in the prior period

The report is delivered by email to users configured to receive it. Reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io) if you need to adjust the recipient list.

---

## Creating Jira Tickets from Recommendations

If your team uses Jira for tracking engineering work, ZeroWaste can create remediation tickets directly from recommendations — so optimization work gets into your backlog alongside everything else, rather than sitting in a separate tool.

With the Jira integration enabled:

1. Open a recommendation in the ZeroWaste dashboard
2. Click **Create Jira Ticket**
3. The ticket is pre-populated with the resource ID, recommended action, estimated savings, and a link back to the CloudForecast recommendation
4. Assign it to the appropriate team member and add it to your sprint or backlog

Tickets created this way stay linked to the recommendation in CloudForecast, so you can see which recommendations are in progress and which have been resolved.

To connect your Jira workspace, go to **Settings → Integrations → Jira** in CloudForecast.

---

## ZeroWaste and Cost Groups

Cost Groups let you slice your AWS spend by team, service, product, or any tag-based dimension. ZeroWaste respects this structure — you can view recommendations filtered to the resources that belong to a specific Cost Group.

This is particularly useful when you want to:

- Give a specific team visibility into only their own optimization opportunities
- Track savings progress per team over time
- Hold teams accountable for acting on recommendations in their Cost Group

To use this, navigate to a Cost Group in CloudForecast and look for the ZeroWaste section within that group's view. Alternatively, filter the main ZeroWaste dashboard by the tags that define your Cost Group.

---

## Frequently Asked Questions

**Will ZeroWaste make any changes to my AWS resources?**
No. ZeroWaste is read-only. It surfaces recommendations for your team to evaluate and act on — it never modifies, stops, resizes, or deletes any resources.

**How often are recommendations updated?**
AWS Cost Optimization Hub refreshes recommendations daily. CloudForecast imports the latest data each day, so your dashboard reflects current findings.

**Why do I see fewer recommendations than I expected?**
Coverage depends on which AWS services you're running and whether Cost Optimization Hub has enough usage history for each resource. Recommendations for new resources may take a few days to appear. See the [setup guide](/getting-started/zerowaste) to verify your configuration is complete.

**Can I dismiss or snooze a recommendation I've decided not to act on?**
Reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io) for options around managing acknowledged recommendations.
