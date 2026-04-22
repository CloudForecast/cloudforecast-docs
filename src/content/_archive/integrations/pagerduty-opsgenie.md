---
title: "PagerDuty and OpsGenie Integration"
description: "Page your on-call team automatically when CloudForecast detects a cost spike in a Cost Group."
---

CloudForecast integrates with PagerDuty and OpsGenie so your on-call team is paged when AWS costs exceed expected thresholds. Each Cost Group can be configured independently to trigger alerts when its report status is Cloudy or Stormy.

## What triggers an alert

Alerts are fired based on the frequency you configure per Cost Group:

- Always (every report)
- When Cloudy or Stormy
- When Stormy only
- Monday or when Stormy/Cloudy
- Monthly or when Stormy/Cloudy

Alerts are sent after your daily cost data is processed, following your regular email report delivery.

---

## PagerDuty

### Prerequisites

- An active CloudForecast account with at least one Cost Group configured
- A PagerDuty account with permission to create or modify services

### Setup

**In PagerDuty:**

1. Log in to [PagerDuty](https://app.pagerduty.com/) and go to **Configuration > Services**.
2. Select an existing service or click **+ New Service** to create one.
3. Inside the service, click **+ New Integration**.
4. Set the **Integration Name** to `CloudForecast`.
5. Under integration type, select **Use our API directly** and ensure **Events API v2** is selected in the dropdown.
6. Click **Add Integration** and copy the **Integration Key** that appears.

**In CloudForecast:**

1. Click **Reports** in the left navigation and open the Cost Group you want to connect.
2. Click **Configure**, then find the PagerDuty row under **How would you like to receive your reports?** and click **Add Integration**.
3. Paste the Integration Key from PagerDuty.
4. Select the alert frequency.
5. Click **Save**.

PagerDuty will now receive an alert whenever the Cost Group meets the trigger condition you selected.

---

## OpsGenie

### Prerequisites

- An active CloudForecast account with at least one Cost Group configured
- An OpsGenie account with permission to manage team integrations

### Setup

**In OpsGenie:**

1. Log in to [OpsGenie](https://app.opsgenie.com/) and click **Teams** in the left navigation.
2. Select the team you want to receive CloudForecast alerts.
3. Click the **Integrations** tab at the top, then click **+ Add Integration**.
4. Find **API** in the list and click **Add**.
5. Name the integration `CloudForecast Alerts`.
6. Copy the **API Key** shown, then click **Save**.

**In CloudForecast:**

1. Click **Reports** in the left navigation and open the Cost Group you want to connect.
2. Click **Configure**, then find the OpsGenie row under **How would you like to receive your reports?** and click **Add Integration**.
3. Paste the API Key from OpsGenie.
4. Select the alert frequency.
5. Click **Save**.

OpsGenie will now create an alert for the selected team whenever the Cost Group meets the trigger condition you selected.
