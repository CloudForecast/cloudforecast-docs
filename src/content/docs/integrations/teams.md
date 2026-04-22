---
title: "Microsoft Teams Integration"
description: "Receive CloudForecast daily cost reports and alerts in a Microsoft Teams channel via incoming webhook."
---

The Microsoft Teams integration lets you post CloudForecast Cost Group reports into any Teams channel using an incoming webhook. Your team gets daily AWS cost summaries and spend alerts without leaving Teams.

## What it does

- Posts Cost Group reports to a Teams channel on a schedule you choose
- Sends alerts only when spending is Cloudy or Stormy, if you prefer to reduce noise
- Each Cost Group can target a different channel or webhook

## Prerequisites

- An active CloudForecast account with at least one Cost Group configured
- Microsoft Teams with permission to add connectors to a channel

## Step 1 — Create an incoming webhook in Teams

1. In Microsoft Teams, navigate to the channel where you want CloudForecast reports to appear.
2. Click the **...** (More options) menu next to the channel name, then select **Connectors**.
3. Search for **Incoming Webhook** and click **Configure**.
4. Name the webhook **CloudForecast**.
5. Optionally upload the CloudForecast logo as the webhook icon.
6. Click **Create**.
7. Copy the webhook URL that appears — you will need it in the next step.

## Step 2 — Connect the webhook in CloudForecast

1. In CloudForecast, click **Reports** in the left navigation and open a Cost Group.
2. Click **Configure** on the Cost Group you want to connect.
3. Under **How would you like to receive your reports?**, find the Microsoft Teams row and click **Add Integration**.
4. Paste the webhook URL you copied from Teams, then click **Save**.

## Configuring delivery options

After connecting, click the delivery settings for the Cost Group to choose how often Teams messages are sent:

- Always (every report)
- When Cloudy or Stormy
- When Stormy only
- Monday or when Stormy/Cloudy
- Monthly or when Stormy/Cloudy

Each Cost Group has its own Teams frequency setting, so different channels can receive alerts at different thresholds.

## What the Teams message looks like

Messages include your daily AWS spend, a comparison against the prior period, a spend trend indicator (Sunny / Cloudy / Stormy), and a link back to the full Cost Group report in CloudForecast.

Reports are delivered after your daily cost data is processed, typically within the first few hours of each morning.
