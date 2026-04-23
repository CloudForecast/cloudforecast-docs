---
title: Connecting Databricks to CloudForecast
description: How to connect your Databricks workspace to CloudForecast using a service principal and SQL warehouse for DBU-level cost tracking
---

CloudForecast reads your Databricks billing and usage system tables to give you complete visibility into where your Databricks Unit (DBU) costs are going — broken down by workspace, cluster, job, and query. Your Databricks spend appears alongside your AWS and Azure costs in one unified view, so you no longer have to switch between platforms to understand your total cloud bill.

What you get after connecting:

- **Unified cost view** — Databricks spend alongside your AWS and Azure infrastructure costs in CloudForecast
- **DBU-level cost tracking** — see exactly how much each workspace, cluster, and job costs
- **Query-level analysis** — identify which queries are driving the highest spend
- **Team and workspace allocation** — break down costs by team or project for accurate chargeback

---

## Before You Start

You'll need:

- A Databricks account with at least one workspace
- Permission to create service principals in the [Databricks account console](https://accounts.cloud.databricks.com)
- Metastore Admin privileges to grant access to system tables
- A SQL warehouse (you'll create one as part of this guide)
- Databricks system tables enabled on your account (covered in Step 4)

---

## Step 1 — Create a Service Principal

A service principal is a non-human identity CloudForecast uses to authenticate with Databricks. Databricks recommends service principals over personal access tokens for production integrations. See the [Databricks service principals documentation](https://docs.databricks.com/en/admin/users-groups/service-principals.html) for full background.

1. Sign in to the [Databricks account console](https://accounts.cloud.databricks.com)
2. Go to **User Management → Service Principals**
3. Click **Add service principal**
4. Give it a descriptive name (e.g. `cloudforecast`)
5. Click **Add**
6. Open the service principal you just created and go to the **Secrets** tab
7. Click **Generate secret**, set the expiry to **730 days**, and click **Generate**
8. **Copy both the Application ID and the Secret value now** — the secret is only shown once

> Save the Application ID and Secret value somewhere secure. You will need both when connecting in CloudForecast.

---

## Step 2 — Create a Dedicated Workspace

CloudForecast needs a Databricks workspace to run its cost analysis queries.

1. In the [Databricks account console](https://accounts.cloud.databricks.com), go to **Workspaces**
2. Click **Create Workspace**
3. Enter a name (e.g. `cloudforecast`), select a region (N. Virginia is preferred for lowest latency), and select **Use Serverless compute with default storage**
4. Click **Start Quickstart** and wait for the workspace to be created
5. Open the workspace, go to the **Permissions** tab
6. Click **Add permissions** and add the service principal you created in Step 1 as a **User**
7. **Copy the workspace URL** (e.g. `my-workspace.cloud.databricks.com`) — you'll need this in CloudForecast

---

## Step 3 — Configure a SQL Warehouse

CloudForecast uses a small SQL warehouse to run queries efficiently without spinning up full cluster infrastructure.

1. Open your workspace and navigate to **SQL → SQL Warehouses**
2. Click **Create SQL Warehouse**
3. Configure it as follows:
   - **Name**: anything descriptive (e.g. `cloudforecast`)
   - **Cluster size**: 2X-Small
   - **Auto stop**: 5 minutes
4. Click **Create**
5. Open the warehouse, go to the **Permissions** tab, and add your service principal with **Can Manage** access — this allows CloudForecast to shut the warehouse down promptly after queries complete
6. Go to the **Connection details** tab and **copy the Warehouse ID** — you'll need this in CloudForecast

---

## Step 4 — Enable System Tables and Grant Access

CloudForecast reads from Databricks system tables to retrieve billing and usage data. You must be a Metastore Admin to run these grants.

CloudForecast reads from the following standard, read-only Databricks system tables:

| Table | Purpose |
|---|---|
| `system.billing.usage` | SKU-level usage records by workspace, used to calculate DBU costs |
| `system.billing.list_prices` | Official Databricks list pricing per SKU |
| `system.compute.clusters` | Cluster metadata and configuration |
| `system.compute.warehouses` | SQL warehouse metadata |
| `system.compute.node_timeline` | Compute node lifecycle and timing |
| `system.access.workspaces_latest` | Workspace identifiers and names |
| `system.access.table_lineage` | Lineage relationships between tables |
| `system.query.history` | Query execution history and performance |
| `system.lakeflow.jobs` | Lakeflow job metadata and configuration |
| `system.lakeflow.pipelines` | Lakeflow pipeline metadata |

**To grant access**, open the SQL editor in your workspace (must be logged in as a Metastore Admin) and run the following statements, replacing `<application-id>` with your service principal's Application ID from Step 1:

```sql
GRANT USE_SCHEMA ON SCHEMA system.billing TO `<application-id>`;
GRANT USE_SCHEMA ON SCHEMA system.compute TO `<application-id>`;
GRANT USE_SCHEMA ON SCHEMA system.access TO `<application-id>`;
GRANT USE_SCHEMA ON SCHEMA system.query TO `<application-id>`;
GRANT USE_SCHEMA ON SCHEMA system.lakeflow TO `<application-id>`;

GRANT SELECT ON TABLE system.billing.usage TO `<application-id>`;
GRANT SELECT ON TABLE system.billing.list_prices TO `<application-id>`;
GRANT SELECT ON TABLE system.compute.clusters TO `<application-id>`;
GRANT SELECT ON TABLE system.compute.warehouses TO `<application-id>`;
GRANT SELECT ON TABLE system.compute.node_timeline TO `<application-id>`;
GRANT SELECT ON TABLE system.access.workspaces_latest TO `<application-id>`;
GRANT SELECT ON TABLE system.access.table_lineage TO `<application-id>`;
GRANT SELECT ON TABLE system.query.history TO `<application-id>`;
GRANT SELECT ON TABLE system.lakeflow.jobs TO `<application-id>`;
GRANT SELECT ON TABLE system.lakeflow.pipelines TO `<application-id>`;
```

> The exact statements with your service principal's Application ID pre-filled are also available in **Sources → Databricks → IAM Configuration Steps** inside CloudForecast.

See the [Databricks system tables documentation](https://docs.databricks.com/en/admin/system-tables/index.html) if you need help enabling system tables on your account.

---

## Step 5 — Connect in CloudForecast

Go to the **Sources** page in CloudForecast, click **Add Source → Databricks**, and fill in the form:

| Field | What to enter |
|---|---|
| **Source Name** | A label for this connection (e.g. "Databricks Production") |
| **Databricks Host** | The hostname of your workspace (e.g. `my-workspace.cloud.databricks.com`) |
| **Credentials** | Select **Service Principal** (recommended) or **Access Token** |
| **Client ID** | The Application (client) ID of your service principal from Step 1 |
| **Client Secret** | The secret value you copied in Step 1 |
| **SQL Warehouse ID** | The Warehouse ID from Step 3 |
| **Discount Percentage** | Your committed use discount (0–100), if you have one. Leave blank if not applicable. |

> CloudForecast recommends the **Service Principal** credential method. If you use a Personal Access Token instead, be aware that Databricks recommends service principals for production integrations — see the [Databricks authentication documentation](https://docs.databricks.com/aws/en/dev-tools/auth/pat) for details.

Click **Save Changes**. CloudForecast will test your connection — this may take up to a minute if the SQL warehouse is starting up for the first time.

---

## Connection Statuses

After saving, your source will appear on the Sources page with one of these statuses:

| Status | What it means |
|---|---|
| **Pending** | Connection successful — CloudForecast is importing your data. This typically takes 24–36 hours. |
| **Active** | Data is flowing and your Databricks dashboard is ready. |
| **Incomplete** | Something went wrong. The error message on the source card will explain what needs to be fixed. |

If you need help, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).

---

## What Becomes Available After Connection

Once your source is **Active**, you'll see a **Dashboard** link on the Databricks source card. The Databricks dashboard shows your DBU costs broken down by workspace, cluster, job, and query — alongside your other cloud costs in CloudForecast.

If CloudForecast detects provider-level cloud costs associated with your Databricks account, a **Providers** view will also become available showing the underlying infrastructure spend.

---

## Frequently Asked Questions

**Can I use a Personal Access Token instead of a service principal?**
Yes, CloudForecast supports both. However, Databricks recommends service principals for production use because they are not tied to a specific user account. If the user who created a personal access token leaves your organization, the token becomes invalid.

**What is the Discount Percentage field for?**
If you have a committed use agreement with Databricks that gives you a percentage discount off list prices, enter that discount here so CloudForecast can show your actual costs rather than list prices.

**How long does the initial data import take?**
Historical data import typically completes within 24–36 hours of your source reaching Pending status.

**Can I connect multiple Databricks workspaces?**
Yes. Add a separate Databricks source for each workspace from the Sources page.

**Will CloudForecast change anything in my Databricks account?**
No. CloudForecast only reads from system tables. The only management permission we request is the ability to stop the SQL warehouse promptly after queries finish, which minimizes your warehouse runtime costs.
