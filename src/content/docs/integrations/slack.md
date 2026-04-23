---
title: "Slack Integration"
description: "Receive CloudForecast daily cost reports and alerts directly in your Slack channels."
---

The Slack integration lets you deliver CloudForecast Cost Group reports to any Slack channel. Instead of checking your email, your team receives daily cost summaries, spend trend alerts, and anomaly notifications right where they already work.

## What it does

- Posts Cost Group reports to a Slack channel on a schedule you choose
- Sends alerts only when spending is Cloudy or Stormy, if you prefer to reduce noise
- Supports a **Full** or **Short** message format per Cost Group
- Each Cost Group can post to a different channel

## Prerequisites

- An active CloudForecast account with at least one Cost Group configured
- A Slack workspace where you have permission to add apps to channels

## How to connect Slack

1. In CloudForecast, click **Cost Groups** in the left navigation.
2. On the Cost Group card you want to connect, click the **gear icon** to open its settings.
3. Under **How would you like to receive your reports?**, find the Slack row and click **Connect to Slack**.
4. You will be redirected to a Slack authorization page. Log in if prompted.
5. Select the Slack channel where reports should be posted, then click **Authorize**.
6. You are returned to CloudForecast. The Slack row now shows the connected channel.

## Configuring delivery options

After connecting, click the delivery settings for the Cost Group to configure:

- **Frequency** — Choose how often Slack messages are sent:
  - Always (every report)
  - When Cloudy or Stormy
  - When Stormy only
  - Monday or when Stormy/Cloudy
  - Monthly or when Stormy/Cloudy
- **Message format** — Choose between **Full Version** (detailed breakdown) or **Short Version** (summary only).

Each Cost Group has its own Slack frequency and format settings, so different teams can receive the level of detail they need.

## What the Slack message looks like

The Full Version includes your daily AWS spend, a comparison against the prior period, spend trend indicators (Sunny / Cloudy / Stormy), and a direct link back to the full Cost Group report in CloudForecast. The Short Version shows a condensed summary with the headline spend and trend status.

Reports are delivered after your daily cost data is processed, typically within the first few hours of each morning.
