---
title: Connecting Your Azure Account to CloudForecast
description: How to connect your Azure account to CloudForecast using an App Registration and read-only Cost Management access
---

To use CloudForecast with Azure, you grant CloudForecast read-only access to your Azure cost data using an [Azure App Registration (Service Principal)](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal). This is the standard Azure way to give a third-party application secure, scoped access — no shared passwords or user credentials required.

CloudForecast never makes changes to your Azure infrastructure. We only ever read your cost data via the [Azure Cost Management API](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/assign-access-acm-data).

---

## Before You Start

You'll need:

- An active Azure account with one of the following agreement types:
  - **Enterprise Agreement (EA)**
  - **Microsoft Customer Agreement (MCA)**
  - **Microsoft Partner Agreement (MPA)**
- Permission to [register applications in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal) (requires `Application.ReadWrite.All` or being at least a Cloud Application Administrator)
- Permission to assign roles in your Azure subscription or billing scope (requires Owner or User Access Administrator)

---

## Step 1 — Register an App in Microsoft Entra ID

This creates the identity CloudForecast will use to authenticate with Azure.

1. Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com)
2. Go to **Entra ID → App registrations → New registration**
3. Give it a descriptive name (e.g. `cloudforecast`)
4. Under **Supported account types**, select **Accounts in this organizational directory only**
5. Leave **Redirect URI** blank
6. Click **Register**

Once registered, you'll land on the app's overview page. Copy and save these two values — you'll need them in CloudForecast:

- **Directory (tenant) ID** → this is your **Tenant ID**
- **Application (client) ID** → this is your **Client ID**

---

## Step 2 — Create a Client Secret

A client secret is the password CloudForecast uses to authenticate as your registered app.

1. From your app registration, go to **Certificates & secrets**
2. Select **Client secrets → New client secret**
3. Enter a description (e.g. `cloudforecast`) and choose an expiry duration
4. Click **Add**
5. **Copy the secret value immediately** — Azure only shows it once

> Save this value securely. This is your **Client Secret** in CloudForecast.

> **Note on expiry:** Client secrets expire. When your secret expires, CloudForecast will lose access to your cost data. Make a note of the expiry date and plan to rotate it before it expires.

---

## Step 3 — Grant Cost Management Access

The app registration needs read-only access to your Azure cost data. The role you assign and where you assign it depends on your agreement type and how much data you want CloudForecast to see.

### For Enterprise Agreement (EA)

EA cost access is controlled separately from standard Azure RBAC. You need to enable cost visibility and assign the right role in **Cost Management + Billing**.

**Enable cost visibility (required for EA):**

1. Sign in to the [Azure portal](https://portal.azure.com) as an Enterprise Administrator
2. Go to **Cost Management + Billing → Billing scopes → [your billing account]**
3. Under **Settings → Policies**, enable:
   - **Account owners can view charges** (AO view charges) — required for subscription-level access
   - **Department admins can view charges** (DA view charges) — required if scoping by department

Then assign the **Enrollment Reader** role at the billing account scope to grant read access across the entire enrollment. See [Azure EA access documentation](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/assign-access-acm-data) for full details.

---

### For Microsoft Customer Agreement (MCA)

1. Sign in to the [Azure portal](https://portal.azure.com)
2. Go to **Cost Management + Billing**
3. Select your **Billing Account**, then **Billing profiles → [your billing profile] → Policies**
4. Set **Azure charges** to **Yes** (required to enable cost visibility)
5. Go to **Access control (IAM)** at the billing account or billing profile scope
6. Assign the **Billing account reader** or **Billing profile reader** role to your app registration

See [MCA billing roles](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/understand-mca-roles) for a full breakdown of available roles.

---

### For Subscription or Management Group Scope (all agreement types)

If you want to scope CloudForecast to one or more subscriptions rather than the full billing account:

1. In the [Azure portal](https://portal.azure.com), go to **Subscriptions** (or **Management Groups**)
2. Select the subscription or management group you want CloudForecast to read
3. Go to **Access control (IAM) → Add → Add role assignment**
4. Select the **Cost Management Reader** role
5. Under **Members**, select **User, group, or service principal** and search for your app registration by name
6. Click **Review + assign**

> **Cost Management Reader** is the minimum role required for CloudForecast to read cost data at the subscription or management group level.

---

## Step 4 — Find Your Scope

The **Scope** tells CloudForecast which part of your Azure hierarchy to read costs from. It is an Azure resource path in one of these formats:

| Scope level | Format |
|---|---|
| Subscription | `/subscriptions/{subscription-id}` |
| Management Group | `/providers/Microsoft.Management/managementGroups/{group-id}` |
| EA Billing Account | `/providers/Microsoft.Billing/billingAccounts/{enrollment-number}` |
| MCA Billing Account | `/providers/Microsoft.Billing/billingAccounts/{billing-account-id}` |
| MCA Billing Profile | `/providers/Microsoft.Billing/billingAccounts/{billing-account-id}/billingProfiles/{billing-profile-id}` |

**To find your subscription ID:**
1. In the [Azure portal](https://portal.azure.com), search for **Subscriptions**
2. Click your subscription — the **Subscription ID** is shown on the overview page

**To find your billing account ID:**
1. In the [Azure portal](https://portal.azure.com), go to **Cost Management + Billing**
2. Select **Billing scopes** — your billing account ID is shown in the list

> If you manage multiple subscriptions, using a **Management Group** or **Billing Account** scope lets CloudForecast see all subscriptions in one connection.

---

## Step 5 — Connect in CloudForecast

Go to the **Sources** page in CloudForecast, click **Add Source → Azure**, and fill in the form:

| Field | What to enter |
|---|---|
| **Source Name** | A label for this connection (e.g. "Production Azure") |
| **Tenant ID** | The Directory (tenant) ID from your app registration |
| **Client ID** | The Application (client) ID from your app registration |
| **Client Secret** | The secret value you copied in Step 2 |
| **Azure Agreement Type** | Select your agreement type: Enterprise Agreement (EA), Microsoft Customer Agreement (MCA), or Microsoft Partner Agreement (MPA) |
| **Scope** | The Azure resource path for the billing scope you want CloudForecast to read |

Click **Save Changes**. CloudForecast will validate your credentials and begin importing your cost data.

---

## Connection Statuses

After saving, your source will appear on the Sources page with one of these statuses:

| Status | What it means |
|---|---|
| **Pending** | Connection successful — CloudForecast is importing your data. This takes **24–36 hours**. |
| **Active** | Data is flowing and your dashboards are ready. |
| **Incomplete** | Something went wrong. The error message on the source card will explain what needs to be fixed. |

If you need help, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).

---

## Frequently Asked Questions

**Which agreement type should I select?**
Check your Azure contract. In the [Azure portal](https://portal.azure.com), go to **Cost Management + Billing → Billing scopes** — the billing account type is shown next to your account. Common types are Enterprise Agreement (EA) for large organizations, and Microsoft Customer Agreement (MCA) for pay-as-you-go or newer direct agreements.

**Can I scope CloudForecast to a single subscription instead of my whole billing account?**
Yes. Use a subscription-level scope (`/subscriptions/{subscription-id}`) and assign **Cost Management Reader** to your app registration on that subscription only.

**Can I connect multiple Azure subscriptions or tenants?**
Yes. You can add multiple Azure sources from the Sources page — one per scope or tenant.

**My client secret expires — what happens?**
When the secret expires, CloudForecast will lose access and your source will show as Incomplete. Rotate the secret in Azure, create a new one, and update the Client Secret field in CloudForecast before it expires.

**Will CloudForecast change anything in my Azure account?**
No. CloudForecast is strictly read-only. The role we request (Cost Management Reader or Billing Reader) only allows reading cost data — not modifying resources, subscriptions, or billing settings.
