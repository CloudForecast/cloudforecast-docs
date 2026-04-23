---
title: Databricks
description: Connect Databricks to CloudForecast for unified DBU cost tracking alongside your AWS and Azure spend.
---

CloudForecast integrates with Databricks to give you complete visibility into where your Databricks Unit (DBU) costs are going — broken down by workspace, cluster, job, and query — unified alongside your AWS and Azure costs.

For full setup instructions, see [Connecting Databricks to CloudForecast](/getting-started/connecting-databricks/).

---

## What You Get

- **Unified cost view** — Databricks spend alongside your AWS and Azure infrastructure in one dashboard
- **DBU-level cost tracking** — see how much each workspace, cluster, and job costs
- **Query-level analysis** — identify which queries are driving the most spend
- **Team and workspace allocation** — break down costs by team or project for accurate chargeback

---

## How It Works

CloudForecast connects to your Databricks account using a service principal with read-only access to Databricks system tables. These are standard, built-in Databricks tables covering billing, compute metadata, and query history. CloudForecast never modifies your Databricks environment.

A small SQL warehouse is used to run cost analysis queries. CloudForecast stops the warehouse as soon as queries complete to minimize your warehouse runtime costs.

---

## Setup

See the step-by-step setup guide: [Connecting Databricks to CloudForecast](/getting-started/connecting-databricks/).

If you need help, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).
