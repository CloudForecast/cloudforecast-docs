---
title: "Monthly Tagging Compliance Report"
description: "Understand the CloudForecast monthly tagging compliance report, including the four report sheets and how to interpret compliance metrics."
---

The Monthly Tagging Compliance Report gives you a complete view of how your AWS resources conform to your organization's tagging policy. It makes it easy to measure progress, find untagged resources, and drive accountability for tagging compliance.

> **Note:** This report is available on Enterprise plans only. To receive the report, you must first enter your tagging policy in the CloudForecast application under **Tagging Strategies**.

The report is delivered as an Excel file, along with a `.tsv` file containing a full list of all untagged resources for further processing.

---

## Report Sheets

The Excel file contains four sheets:

### Tag Compliance – Overview

A high-level summary of your tagging compliance across your entire AWS environment, based on the policy you have defined. This sheet includes:

**Overall Compliance**

- Total Charges
- Compliance % of Charges
- Resources Count
- Compliance % of Resources

**Compliance by Sub-Account**

The same metrics broken down by each linked AWS account.

**Tag by Tag Resource Coverage**

For each tag key in your policy:

- Resources Count
- Valid – Resources where the tag key exists and the value meets policy requirements.
- Invalid – Resources where the tag key exists but the value does not meet policy requirements.
- Missing – Resources with no value for the tag key at all.

**Compliance by Product**

The same compliance metrics broken down by AWS product.

> All numbers in this sheet reflect only resources that are actually taggable.

---

### Non-Resource-Based Charges

This sheet lists all charges that cannot be associated with a taggable resource, such as API calls and other per-product overhead. The total charges here, combined with the total in the Tag Compliance sheet, equal your full AWS cost for the month.

---

### Tag Key Value Charges

This sheet shows total costs for the month broken down by each individual tag value within your tag keys. It also includes the total charges for resources that have no tag value at all.

---

### Non-Compliant Resources

A ranked list of your top 1,000 non-compliant resources, sorted by cost over the last 30 days. Each row represents a resource that does not meet your tagging policy, and includes:

- Resource ID
- Product Name
- Account Name
- Region
- Tag key compliance status for each required tag (Valid, Invalid, or Missing)
- Existing tags on the resource

A complete `.tsv` rollup of all non-compliant resources (not just the top 1,000) is included as a separate file alongside the Excel report.
