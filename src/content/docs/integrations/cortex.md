---
title: "Cortex AWS Costs Plugin"
description: "Send CloudForecast Cost Group reports into Cortex so engineering teams can see AWS costs alongside their services."
---

## What is Cortex?

[Cortex](https://www.cortex.io/) is an Internal Developer Portal (IDP) that helps engineering teams manage services, infrastructure, and operational workflows from a central place.

CloudForecast offers a plugin for the [Cortex Plugin Marketplace](https://www.cortex.io/post/cortex-plugin-marketplace) that surfaces AWS cost data directly inside Cortex. You map each CloudForecast Cost Group to a Cortex Entity Tag, so every service or team in Cortex can see the AWS costs associated with it — without leaving their developer portal.

**Note:** Contact the [CloudForecast team](mailto:founders@cloudforecast.io) or your Cortex Account Manager to enable the Cortex plugin for your account before starting setup.

---

## How the mapping works

A **Cost Group** in CloudForecast represents a slice of your AWS costs filtered by tags, sub-accounts, or Cost Categories. An **Entity Tag** in Cortex identifies a service or team — for example, `checkout-service` or `data-platform`.

When you map a Cost Group to an Entity Tag, CloudForecast sends that Cost Group's daily report to Cortex, where it appears under that entity's Plugins tab. This gives each team ownership and visibility into the AWS costs attributable to their services.

---

## Part 1 — Set up the Custom Integration in Cortex

Cortex receives data from CloudForecast via a Custom Integration (webhook). Set it up once per account.

1. In Cortex, click your user icon in the bottom left and select **Settings**.
2. Under **Integrations**, click **Custom Integrations**.
3. Under **New Custom Integration**, fill in the three fields:
   - **Name:** `CloudForecast`
   - **Entity Tag JQ:** `.entityTag`
   - **Key:** `cloudforecast`
4. Click **Save**.

Copy the webhook URL shown under the key — you will paste this into CloudForecast in the next step.

---

## Part 2 — Connect Cortex in CloudForecast

1. In CloudForecast, go to **Setup > Cortex**.
2. Paste the webhook URL from your Cortex Custom Integration into the **Custom Integration Link** field.
3. Click **Save Changes**.

---

## Part 3 — Map Cost Groups to Cortex Entity Tags

Repeat these steps for each Cost Group you want to appear in Cortex.

1. In CloudForecast, go to **Reports > Cost Groups**.
2. Click **Configure** on a Cost Group.
3. Under **How would you like to receive your reports?**, click **+ Add Integration** for Cortex.
4. Enter the **Entity Tag** from your Cortex account that should receive this Cost Group's data.
5. Click **Save**.

Within approximately 24 hours, the Cost Group data will appear in Cortex under that entity's **Plugins** tab.
