---
title: "Monthly Financial Report (CFO Report)"
description: "Understand the CloudForecast monthly Excel financial report, including delivery timing, the four report sheets, and sub-account breakdowns."
---

The Monthly Financial Report gives finance teams and executives a clear, structured view of your AWS costs for the prior month. It is delivered as an Excel file, making it easy to share with stakeholders who work outside of CloudForecast.

**Delivery timing:** The report is sent between the 6th and 13th of each month, once your previous month's costs are finalized. If your account includes an [Enterprise Discount Program (EDP)](https://www.cloudforecast.io/blog/aws-edp-guide/) discount, the report is held until that discount is also finalized.

If three or more months of cost data are available, the report includes month-over-month comparisons. Green cells indicate costs trending lower; red cells indicate costs trending higher.

---

## Report Sheets

The Excel file contains four sheets:

### Overview Sheet

The main sheet, displayed first when you open the file. It contains several sections:

**Overview**

A summary of your key accounting costs for the month:

- Grand Total
- Sub Total
- All discounts (credits, refunds, etc.)
- Enterprise Discount (if applicable)
- Support cost
- Taxes
- RI Upfront
- RI Discounted Usage

**Total by Sub-Accounts**

Your total cost broken down across all sub-accounts (linked AWS accounts).

**Tag / Tag Key**

If you have selected a tag key in your CloudForecast settings, this section shows total cost broken down by the values in that tag key.

**Product Usages**

A complete list of your AWS costs by product and service, sorted by cost in descending order. Data Transfer costs associated with a product are broken out separately for full visibility.

---

### Overview – RI and SP Sheet

This sheet analyzes the return on your Reserved Instance and Savings Plan purchases. It shows overall performance across all accounts and then breaks it down by each sub-account.

For the overall view:

- Amortized Fees
- On-Demand Equivalent
- Net Savings

For each sub-account (where applicable):

- Upfront fee
- Recurring fee

---

### Sub-Account Sheets

Each sub-account (linked AWS account) gets its own sheet with the same structure as the Overview sheet, scoped to that account's costs. This makes it easy to share cost detail with individual teams or business units.
