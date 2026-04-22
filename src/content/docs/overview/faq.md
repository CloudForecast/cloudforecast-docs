---
title: "Frequently Asked Questions"
description: "Common questions about CloudForecast — setup, data, security, and features."
---

## What is CloudForecast?

CloudForecast is a cloud cost management platform for engineering, DevOps, and finance teams. It connects to your cloud providers and delivers proactive cost reports, anomaly detection, waste identification, and optimization insights — so your team stays informed without manual effort.

## What cloud providers are supported?

CloudForecast supports:

- **Amazon Web Services (AWS)**
- **Microsoft Azure** (including Azure CSP)
- **Databricks**

## How long does it take to see data after connecting?

You can expect to see your first data within 24 hours of connecting your cloud account. If you haven't received anything after that window, reach out to our support team and we'll help you get sorted.

## Is there a free trial?

Yes. CloudForecast offers a free trial so you can explore the product before committing. No credit card is required to get started. Reach out to us if you have questions about trial length or what's included.

## Does CloudForecast make changes to my cloud infrastructure?

No. CloudForecast only requires read-only access to your cloud account. We never make changes to your infrastructure, resources, or configuration. Our permissions are scoped to the minimum required to read cost and usage data.

## What AWS permissions does CloudForecast need?

CloudForecast needs read-only access to your AWS Cost and Usage Report (CUR) data. We use a CloudFormation stack to set up a least-privilege IAM role — no broader access than necessary. Full details are covered in the [setup guide](/getting-started/setup-guide/).

## How often is data refreshed?

Cost data is refreshed daily. CloudForecast processes new billing data as soon as it's made available by your cloud provider. Note that AWS billing files near the end of the month and at month rollover can occasionally be delayed on AWS's side, which may affect report timing.

## Can multiple team members use the same account?

Yes. You can invite as many team members as you need. CloudForecast is designed to be used across engineering, finance, and leadership — so your whole organization can work from the same cost data.

## What reports does CloudForecast send?

CloudForecast sends:

- **Daily cost reports** summarizing spend by service, region, account, and tag — with anomaly alerts when something looks off.
- **Weekly Reserved Instance and Savings Plan reports** covering utilization, coverage, and upcoming expirations.
- **ZeroWaste reports** highlighting idle and unused resources with specific optimization recommendations.

Reports can be delivered by email, Slack, or Microsoft Teams.

## Does CloudForecast support multiple AWS accounts?

Yes. CloudForecast supports multi-account AWS setups, including AWS Organizations with linked accounts. You can connect multiple accounts and view costs across all of them in one place.

## What is ZeroWaste?

ZeroWaste is CloudForecast's cloud waste detection feature. It continuously scans your environment for resources that are idle, unattached, or oversized — such as unused load balancers, unattached EBS volumes, old snapshots, and underutilized EC2 or RDS instances. Each finding includes enough detail for your team to act on it directly.

## What is Cost Detective?

Cost Detective is CloudForecast's anomaly detection feature. It automatically identifies unexpected cost spikes across your cloud accounts and services, and alerts your team with context about what changed and by how much — so you can investigate quickly instead of manually hunting through billing data.
