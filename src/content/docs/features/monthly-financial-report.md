---
title: Monthly Financial Report
description: An automatically generated Excel workbook delivered each month with a complete breakdown of your AWS costs — designed for finance teams, executives, and anyone who needs a structured view of cloud spend.
---

The Monthly Financial Report is an Excel workbook that CloudForecast generates and delivers to your inbox each month. It gives finance teams and engineering leaders a structured, multi-tab breakdown of your AWS costs — covering a plain-language executive summary, top cost movers, detailed service-level spend, Reserved Instance and Savings Plan usage, EC2 Spot savings, and per sub-account breakdowns.

This report is set up and delivered by the CloudForecast team. If you have questions about enabling it, adjusting recipients, or customizing what it includes, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).

---

## When It's Delivered

The report is delivered between the **6th and 13th of each month**, once AWS has finalized your previous month's cost data. The exact delivery date varies because CloudForecast waits for AWS to close out all charges before generating the report — this ensures the numbers are complete and accurate.

---

## Workbook Structure

The report is an Excel workbook with the following tabs, in order:

1. Executive Summary
2. Overview (master payer account)
3. Overview — Marketplace *(if you have Marketplace charges)*
4. Overview — RI
5. Overview — Savings Plan
6. Overview — EC2 Spot
7. One tab per sub-account

---

## Tab 1 — Executive Summary

The Executive Summary tab is designed to be read in under a minute. It opens with a one-line plain-language statement of your total spend for the month and how it compares to the prior month — for example, *"You spent $142,000 in March 2025, which is up by 12% ($15,200) compared to February 2025."* The text is color-coded: red for increases, green for decreases, blue/grey if spend is flat (within 5%).

### Top Account Movers

Below the summary statement is a hierarchical table of the accounts, services, and regions that moved the most month-over-month. Each row shows:

| Column | What it shows |
|---|---|
| **AWS Dimensions** | The account, service (product), or region being measured |
| **Month over Month % Change** | Percentage change from the prior month. Color-coded: red = increase, green = decrease, grey = flat (within 5%) |
| **Month over Month $ Increase** | The dollar difference from the prior month |
| **Current Month** | Total unblended cost for the most recently completed month |
| **Prior Month** | Total unblended cost for the month before that |
| **Three Month Avg** | Average of the prior three months of spend for the same dimension |

The table is hierarchical: accounts appear first, and under each account the services that drove its change are listed, and under each service the regions that drove it. Only entries that moved meaningfully (relative to the account's own percentage change) are shown — minor fluctuations are filtered out to keep the summary focused.

### New Marketplace Purchases

Below the top movers is a table of any **new AWS Marketplace purchases** that appeared this month for the first time (specifically, subscriptions or charges with a usage period spanning more than one month). Columns include:

- **Month** — the billing month the charge appeared
- **Invoice ID** — the AWS invoice identifier
- **Account Name** — which sub-account the charge is on
- **Product Name** — the Marketplace product
- **Start Date / End Date** — the usage period
- **Total Cost** — the unblended cost for that charge

---

## Tab 2 — Overview

The Overview tab is the core of the report. It covers your entire AWS spend across the master payer account, with each row representing one month of data. The first column is always frozen so you can scroll right without losing the month label.

### Overview Section — Cost Breakdown Columns

These columns appear for every month row and break down your total bill into its components:

| Column | Definition |
|---|---|
| **Grand Total** | Your total AWS bill for the month — the number you would see on your invoice. Includes all charges, discounts, refunds, taxes, RI fees, and Marketplace charges. Sourced from `line_item_unblended_cost` across all CUR line item types. |
| **Grand Total Average per Day** | Grand Total divided by the number of calendar days in that month. Useful for normalizing months of different lengths when comparing spend trends. |
| **Amortized Cost** | Your total cost recalculated to spread upfront RI and Savings Plan purchases evenly across the months they cover, rather than showing a spike in the month of purchase. Sourced from `line_item_amortized_cost`. Use this figure when you want a smoother, commitment-adjusted view of spend. |
| **Sub Total** | Gross charges before any credits, refunds, or discounts are applied — positive line items only. Excludes `recordtype` values like `EdpDiscount`, `Refund`, and `Tax`. |
| **All Discounts (Credits, Refunds, ...)** | The total value of credits, refunds, and any other reductions applied to your account by AWS. Shown as a negative number. |
| **Enterprise Discount (EDP)** | Volume-based discounts from an AWS Enterprise Discount Program agreement (`recordtype = 'EdpDiscount'`). Shown separately so you can see the impact of your negotiated pricing. |
| **Support** | Charges for your AWS Support plan (Business, Developer, Enterprise, or Premium Support). Isolated from service spend so it doesn't distort usage cost trends. |
| **Sub Total (Excl. Marketplace)** | Gross charges for AWS-native services only, excluding any third-party AWS Marketplace software. |
| **Marketplace** | Third-party software and service charges billed through the AWS Marketplace. |
| **Taxes** | Tax line items applied by AWS (`recordtype = 'Tax'`). Amounts vary by region and account configuration. |
| **RI Upfront** | One-time upfront payments made when purchasing Reserved Instances (`recordtype = 'Fee'` with `reservation_reservation_a_r_n` present). These appear as a cost spike in the month of purchase in the Grand Total, but are spread evenly in the Amortized Cost column. |
| **RI Recurring Fee** | Monthly recurring fees for active Reserved Instances (`recordtype = 'RIFee'`) — what you pay each month for partial- or no-upfront RI payment plans. |
| **Savings Plan Upfront Fees** | One-time upfront payments made when purchasing Savings Plans (`recordtype = 'SavingsPlanUpfrontFee'`). Like RI upfront fees, these create a spike in the purchase month's Grand Total but are amortized in the Amortized Cost column. |
| **Savings Plan Recurring Fees** | Monthly recurring commitment charges for active Savings Plans (`recordtype = 'SavingsPlanRecurringFee'`). |

### Overview Section — Sub-account Columns

To the right of the cost breakdown columns, the Overview tab adds a column for **each sub-account** showing its total positive unblended cost (gross charges, without discounts) per month. Sub-accounts are ordered from highest to lowest spend in the most recent month.

### Overview Section — Tag Columns *(optional)*

If tag-based reporting is configured for your account, additional columns appear to the right of the sub-account columns, grouping spend by AWS tag key and value. For example, if you track a `team` tag, you'll see columns for each team value (e.g. `platform`, `data`, `frontend`) showing how much that tag value spent each month. Resources with no tag value for that key appear under `NO_TAG`.

### Comparisons Section

Below the monthly data rows, a **Comparisons** section shows the dollar difference between the most recent month and several reference periods. Each comparison row is a formula: current month minus the average of the reference months.

| Comparison row | What it calculates |
|---|---|
| Current month vs prior month | Dollar difference from one month ago |
| Current month vs two months ago | Dollar difference from two months ago |
| Current month vs same month last year | Year-over-year dollar difference |
| Current month vs last 3 months avg | Difference from the 3-month trailing average (excluding current month) |
| Current month vs last 6 months avg | Difference from the 6-month trailing average |
| Current month vs last 12 months avg | Difference from the 12-month trailing average |
| Current month vs last 24 months avg | Difference from the 24-month trailing average |
| Current month vs YTD avg | Difference from the average of months in the current calendar year (excluding current month) |

Comparison rows are color-coded using a red-to-green gradient: red = higher than the reference period, green = lower. Comparisons only appear if enough historical data is available for the reference period.

### Averages Section

Below the comparisons, an **Averages** section shows the rolling average of your spend across the same time windows:

- Last 3 months average
- Last 6 months average
- Last 12 months average
- Last 24 months average
- Year-to-date average

Averages apply to every column in the sheet — Grand Total, Sub Total, each sub-account, each tag value, and so on.

### Product Usage Section

Below the Overview section (separated by a few blank rows), a **Product Usage** section breaks down the same monthly time series by AWS service — EC2, RDS, S3, CloudFront, etc. Services are sorted by spend in the most recent month, highest first.

For each service:
- **All** — total charges for that service (excludes taxes; only positive charges)
- **Data transfer only** — if the service had data transfer charges, a separate sub-column appears showing just those charges

The Product Usage section also includes its own Comparisons and Averages rows, structured the same way as the Overview section.

---

## Tab 3 — Overview — Marketplace *(conditional)*

This tab only appears if your account has AWS Marketplace charges. It follows the same structure as the Overview tab, but scoped entirely to Marketplace billing — so you can track third-party software spend with the same month-over-month and year-over-year context.

---

## Tab 4 — Overview — RI

The RI tab shows your Reserved Instance costs and utilization history over the **past 12 months**, broken down by sub-account.

### Overview columns (aggregate, across all accounts)

These columns pull from the AWS Cost Explorer RI Utilization API (EC2, ElasticSearch, ElastiCache, RDS, Redshift):

| Column | Definition |
|---|---|
| **Amortized Fees** | The total amortized cost of your RIs for the month — upfront fees spread across the commitment period plus recurring fees. This is what your RIs effectively cost you each month on a normalized basis. |
| **OnDemand Equivalent** | What you would have paid for the same compute hours at On-Demand rates, with no RI discount. The difference between this and Amortized Fees is your RI savings. |
| **Net Savings** | The dollar amount saved by using RIs instead of On-Demand pricing (OnDemand Equivalent minus Amortized Fees). |

### Per-account columns

For each sub-account:

| Column | Definition |
|---|---|
| **Upfront Fee** | One-time upfront payment made when purchasing an RI in that account. Appears only in the month of purchase. |
| **Recurring Fee** | Monthly recurring fee for active RIs in that account. This is the ongoing commitment cost for partial- and no-upfront RIs. |

---

## Tab 5 — Overview — Savings Plan

The Savings Plan tab covers your Savings Plan commitment and usage history over the past 12 months, broken down by sub-account.

### Overview columns (aggregate)

These columns pull from the AWS Cost Explorer Savings Plan Utilization API:

| Column | Definition |
|---|---|
| **Amortized Fees** | The total amortized cost of your Savings Plans for the month — upfront fees spread across the term plus recurring fees. This is the normalized monthly cost of your SP commitments. |
| **OnDemand Equivalent** | What you would have paid for the same usage at full On-Demand rates if you had no Savings Plans. |
| **Net Savings** | Dollar amount saved by your Savings Plans (OnDemand Equivalent minus Amortized Fees). |

### Per-account columns

For each sub-account:

| Column | Definition |
|---|---|
| **UpfrontFee** | One-time upfront payment for Savings Plans purchased in that account. Appears in the month of purchase. |
| **RecurringFee** | Monthly recurring commitment charge for active Savings Plans. |
| **Covered Cost (OnDemand cost if no SP rate)** | What the usage covered by your Savings Plans would have cost at full On-Demand rates — i.e., the cost before the SP discount was applied. Sourced from `savings_plan_savings_plan_a_r_n` matched rows with `recordtype = 'SavingsPlanCoveredUsage'`. |
| **Effective Cost (with SP rate)** | The actual cost you paid for that covered usage after the Savings Plan discount was applied (`savings_plan_effective_cost`). The difference between Covered Cost and Effective Cost is the saving you received from the SP. |

---

## Tab 6 — Overview — EC2 Spot

The EC2 Spot tab quantifies how much you saved by using Spot Instances instead of On-Demand pricing. It covers the past 12 months. Figures are **approximations** based on current On-Demand rates and only include Spot usage from January 2020 onward.

The tab has two sections:

### Summary by Account

An overview of your total Spot savings, plus a breakdown by each sub-account:

| Column | Definition |
|---|---|
| **Spot Cost** | What you actually paid for EC2 Spot Instance hours that month. |
| **OnDemand Equivalent** | What those same instance-hours would have cost at current On-Demand rates, based on published AWS pricing for each instance type. |
| **% of Savings** | The effective discount percentage you received by using Spot instead of On-Demand, calculated as `1 - (Spot Cost / OnDemand Equivalent)`. For example, 70% means you paid 30 cents for every dollar of equivalent On-Demand compute. |

### Summary by Instance Type

The same three columns repeated for each EC2 instance type (e.g. `m5.xlarge`, `c5.2xlarge`) that appeared in your Spot usage, ordered by Spot cost in the most recent month. This lets you see which instance families are generating the most savings.

---

## Sub-account Tabs

Each sub-account in your AWS Organization gets its own dedicated tab. The structure mirrors the Overview tab exactly — the same column definitions apply — but the data is scoped to that account only:

- Grand Total, Amortized Cost, Sub Total, All Discounts, Enterprise Discount, Support, Sub Total (Excl. Marketplace), Marketplace, Taxes, RI Upfront, RI Recurring Fee, SP Upfront Fees, SP Recurring Fees
- Product Usage breakdown for that account
- Month-over-month and year-over-year Comparisons
- Rolling Averages

Sub-account tabs are ordered from highest to lowest spend in the most recent month.

---

## Customization

The CloudForecast team can configure the following for your report:

- **Tag breakdowns** — add one or more AWS tag keys as additional columns in the Overview tab (e.g. break down spend by `team`, `environment`, or `cost-center`)
- **Recipients** — add or update the email addresses the report is sent to

To request changes, contact [support@cloudforecast.io](mailto:support@cloudforecast.io).
