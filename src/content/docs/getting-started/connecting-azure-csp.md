---
title: Connecting Azure CSP to CloudForecast
description: How to connect an Azure Cloud Solution Provider (CSP) account to CloudForecast using an app registration and partner credentials
---

Azure Cloud Solution Provider (CSP) is a Microsoft partner program where a reseller or managed service provider purchases and manages Azure subscriptions on behalf of their customers. If you are a CSP partner — or if your Azure subscriptions are managed through a CSP partner rather than purchased directly from Microsoft — your billing data comes through the partner's account, not through a standard Azure EA or MCA billing account.

CloudForecast supports Azure CSP connections. Instead of reading from a direct Azure billing account, CloudForecast uses the [Microsoft Partner Center API](https://learn.microsoft.com/en-us/partner-center/develop/partner-center-rest-api-reference) to access cost and usage data across your CSP customers and their subscriptions.

See [Microsoft's CSP overview](https://learn.microsoft.com/en-us/partner-center/customers/csp-overview) for background on the CSP program.

---

## Before You Start

You'll need:

- A Microsoft Partner Center account with access to the customers you want to monitor
- Permission to register applications in [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal) (your partner tenant)
- The application will need access to the Partner Center API — your Entra ID admin can grant this

---

## Step 1 — Register an App in Microsoft Entra ID

This creates the identity CloudForecast will use to authenticate with Partner Center and read CSP billing data.

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com) using your **partner tenant** credentials
2. Go to **Entra ID → App registrations → New registration**
3. Give it a descriptive name (e.g. `cloudforecast-csp`)
4. Under **Supported account types**, select **Accounts in this organizational directory only**
5. Leave **Redirect URI** blank
6. Click **Register**

Once registered, you'll land on the app's overview page. Copy and save these two values:

- **Directory (tenant) ID** — this is your **Tenant ID** in CloudForecast
- **Application (client) ID** — this is your **Client ID** in CloudForecast

---

## Step 2 — Create a Client Secret

1. From your app registration, go to **Certificates & secrets**
2. Select **Client secrets → New client secret**
3. Enter a description (e.g. `cloudforecast`) and choose an expiry duration
4. Click **Add**
5. **Copy the secret value immediately** — Azure only shows it once

> Save this value securely. This is your **Client Secret** in CloudForecast.

> **Note on expiry:** Client secrets expire. When your secret expires, CloudForecast will lose access to your CSP data. Plan to rotate it before the expiry date and update it in CloudForecast.

---

## Step 3 — Grant Partner Center API Access

Your app registration needs permission to call the Partner Center API.

1. From your app registration, go to **API permissions → Add a permission**
2. Select **APIs my organization uses** and search for **Microsoft Partner Center**
3. Select **Delegated permissions** and add the appropriate permissions for cost data access
4. Click **Grant admin consent** to apply the permissions

See [Partner Center authentication documentation](https://learn.microsoft.com/en-us/partner-center/develop/partner-center-authentication) for full details on configuring app-based authentication.

---

## Step 4 — Connect in CloudForecast

Go to the **Sources** page in CloudForecast, click **Add Source → Azure CSP**, and fill in the form:

| Field | What to enter |
|---|---|
| **Source Name** | A label for this connection (e.g. "Azure CSP") |
| **Tenant ID** | The Directory (tenant) ID from your app registration |
| **Client ID** | The Application (client) ID from your app registration |
| **Client Secret** | The secret value you copied in Step 2 |

Click **Save Changes**. CloudForecast will validate your credentials and begin importing data from your CSP account.

---

## Connection Statuses

After saving, your source will appear on the Sources page with one of these statuses:

| Status | What it means |
|---|---|
| **Pending** | Connection successful — CloudForecast is importing your data. This typically takes 24–36 hours. |
| **Active** | Data is flowing and your CSP overview is ready. |
| **Incomplete** | Something went wrong. The error message on the source card will explain what needs to be fixed. |

If you need help, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).

---

## What Becomes Available After Connection

Once your source is **Active**, you'll see a **CSP Overview** link on the source card. This dashboard shows cost and usage data across your CSP customers and their subscriptions.

CloudForecast automatically discovers and lists the Azure subscriptions associated with your CSP account. These appear as child sources under your CSP connection on the Sources page. Each subscription can be viewed individually or aggregated in the CSP Overview.

---

## Frequently Asked Questions

**How is Azure CSP different from a regular Azure connection?**
With a standard Azure EA or MCA account, you connect directly to your own billing account. With CSP, Microsoft bills your CSP partner, who then bills your organization. The billing data flows through the partner's account rather than your own, which requires connecting through the Partner Center API instead of the standard Azure Cost Management API.

**Can I connect multiple CSP accounts?**
Yes. Add a separate Azure CSP source for each partner tenant from the Sources page.

**My client secret is expiring — what do I do?**
Generate a new client secret in your app registration, copy the new value, and update the Client Secret field in CloudForecast before the old secret expires. Your source will show as Incomplete once the secret expires.

**Will CloudForecast change anything in my Azure or Partner Center account?**
No. CloudForecast is strictly read-only. We only request the permissions needed to read cost and usage data.
