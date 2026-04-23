---
title: Connecting Your AWS Account to CloudForecast
description: How to connect your AWS account to CloudForecast
---

To use CloudForecast with AWS, you need two things in place:

1. **A CUR 2.0 Data Export** — an AWS feature that writes your cost data to an S3 bucket on a daily basis
2. **Read-only access for CloudForecast** — so we can read that data from your S3 bucket

CloudForecast never makes changes to your infrastructure. We only ever read your cost data.

---

## Part 1 — Set Up Your AWS Cost & Usage Report (CUR 2.0)

[AWS Cost and Usage Reports (CUR)](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html) is the official AWS feature that exports a detailed breakdown of your cloud costs to an S3 bucket. CloudForecast reads from this export to power your dashboards and reports.

You can either **create a new CUR export** or **use an existing one** if you already have CUR set up.

---

### Option A — Create a New CUR 2.0 Export

#### Before You Start

- You must be signed into the **management (payer) account** of your AWS Organization, or an account with billing access enabled
- You need an **S3 bucket** to receive the export — you can create one during setup or use an existing bucket
- The S3 bucket must be in any **standard AWS region** (not AWS GovCloud or China)

#### Step-by-Step

**1. Open the Data Exports console**

In your AWS Console, go to:
**Billing and Cost Management → Data Exports → Create export**

Select **Standard data export** as the export type.

> See the [AWS guide to creating a standard data export](https://docs.aws.amazon.com/cost-management/latest/userguide/dataexports-create-standard.html) if you need a walkthrough of the console.

---

**2. Name your export**

Enter a name for the export (e.g. `cloudforecast-cur`). Names can be up to 128 characters and may only contain letters, numbers, hyphens (`-`), and underscores (`_`).

---

**3. Configure the export settings**

| Setting | Recommended value | Notes |
|---|---|---|
| **Include resource IDs** | Enabled | Allows CloudForecast to break down costs per resource |
| **Time granularity** | Daily or Hourly | Daily is sufficient for most teams |
| **Compression & format** | gzip + CSV | CloudForecast supports both CSV and Parquet |
| **File versioning** | Overwrite existing file | Saves S3 storage costs |
| **Split cost allocation data** | Optional | Enable if you use ECS or EKS and want per-pod/task cost breakdowns |
| **Cost Optimization Hub** | Optional | Enable if you want savings recommendations in CloudForecast |

> **Tip:** Leave all column selections checked — more data gives CloudForecast more to work with.

---

**4. Configure the S3 destination**

Choose an existing S3 bucket or create a new one:

- **Bucket name** — note this down, you'll enter it in CloudForecast
- **S3 path prefix** — a folder name inside the bucket (e.g. `cloudforecast`). Note this down too — this is your **CUR prefix** in CloudForecast
- **Region** — the bucket can be in any standard AWS region

> AWS will automatically apply the required bucket policy so it can write reports to your bucket. Do not modify this policy after setup — it will break delivery. See [Setting up an S3 bucket for data exports](https://docs.aws.amazon.com/cur/latest/userguide/dataexports-s3-bucket.html) for details.

---

**5. Create the export**

Click **Create**. AWS will begin delivering your first export within 24 hours. Subsequent exports refresh once per day.

---

### Option B — Use an Existing CUR Export

If you already have a CUR report set up, you can connect CloudForecast to it without creating a new one.

You'll need to find two pieces of information from your existing export:

**1. Find your S3 bucket name and prefix**

In your AWS Console, go to:
**Billing and Cost Management → Data Exports**

Click on your existing export and note down:
- **S3 bucket name** — the bucket where the report is delivered
- **S3 path prefix** — the folder path inside the bucket (e.g. `reports/my-cur`)

**2. Check your export format**

CloudForecast supports both **gzip CSV** and **Parquet** formats. Either will work.

**3. Confirm resource IDs are included**

For the best experience with CloudForecast, ensure your existing export has **Include resource IDs** enabled. If it does not, you may see limited breakdown detail in your reports.

> **Note:** If your existing CUR export was created using the legacy Cost and Usage Reports (CUR 1.0) console, it will still work — but we recommend migrating to [CUR 2.0 (Data Exports)](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html) for better compatibility.

---

## S3 Bucket Requirements

Whether using an existing bucket or creating a new one, your S3 bucket must meet these requirements. See the [AWS S3 bucket naming rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html) for full details.

| Requirement | Detail |
|---|---|
| **Naming** | 3–63 characters, lowercase letters, numbers, hyphens, and periods only |
| **No consecutive periods** | `my..bucket` is not valid |
| **No consecutive hyphens** | `my--bucket` is not valid |
| **No period adjacent to hyphen** | `my.-bucket` or `my-.bucket` is not valid |
| **Not formatted as an IP address** | e.g. `192.168.1.1` is not valid |
| **Region** | Any standard AWS region (not GovCloud or China) |
| **ACLs** | Recommended off — use bucket policies instead (default for new buckets) |

> AWS requires a specific [S3 bucket policy](https://docs.aws.amazon.com/cur/latest/userguide/dataexports-s3-bucket.html) to allow the Data Exports service to write to your bucket. This is applied automatically when you create a new export through the console. If you use an existing bucket, verify this policy is in place and has not been modified.

---

## Part 2 — Connect CloudForecast to Your AWS Account

Once your CUR export is in place, go to the **Sources** page in CloudForecast and click **Add Source → AWS**.

Fill in the connection form:

| Field | What to enter |
|---|---|
| **Source Name** | A label for this connection (e.g. "Production AWS") |
| **S3 Bucket** | The name of the S3 bucket where your CUR is delivered |
| **Cost & Usage Report Prefix** | The S3 path prefix you configured for your CUR export |
| **Cost Optimization Hub Prefix** | *(Optional)* The S3 prefix for Cost Optimization Hub exports, if enabled |

---

### Granting CloudForecast Read-Only Access

CloudForecast needs read-only access to your S3 bucket via an [AWS IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html). There are three ways to set this up:

---

#### Option 1 — CloudFormation (Recommended)

This is the easiest and most secure method. [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) automates the creation of the IAM role with the exact permissions CloudForecast needs — no manual configuration required.

Once you've entered your S3 bucket name in the form:

1. Click **Launch CloudFormation Stack** — you'll be taken to the AWS Console with a pre-built stack
2. Review and launch the stack — it creates a read-only IAM role for CloudForecast automatically
3. Copy the **IAM ARN** from the stack outputs back into the CloudForecast form

[View CloudFormation setup instructions →](https://www.cloudforecast.io/documentation/getting-started/cloudformation-method)

---

#### Option 2 — Terraform

If your team manages infrastructure with Terraform, use the [CloudForecast Terraform module](https://github.com/CloudForecast/tf-aws-iam). This creates the same read-only [IAM cross-account role](https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html) as the CloudFormation method.

The form will display the values you need to pass to the module:
- **External ID** — your CloudForecast company identifier
- **S3 Bucket** — the bucket name you entered above

After running `terraform apply`, paste the generated **IAM ARN** into the form.

---

#### Option 3 — Access Keys (Not Recommended)

You can use [AWS Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) instead of an IAM role, but this is less secure. If you use this method, switch to the **Access Keys** tab and enter your **AWS Access Key** and **AWS Secret Key**.

> We strongly recommend using IAM roles (Options 1 or 2) over access keys wherever possible. AWS also recommends cross-account roles as a [security best practice](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

---

### Test the Connection

Click **Test Connection**. CloudForecast will verify it can access your S3 bucket and read your cost data.

---

## Connection Statuses

After submitting, your source will appear on the Sources page with one of these statuses:

| Status | What it means |
|---|---|
| **Pending** | Connection successful — CloudForecast is importing your data. This takes **24–36 hours**. |
| **Active** | Data is flowing and your dashboards are ready. |
| **Incomplete** | Something went wrong. The error message on the source card will explain what needs to be fixed. |

If you need help at any point, reach out to [support@cloudforecast.io](mailto:support@cloudforecast.io).

---

## Frequently Asked Questions

**Do I need to create a new S3 bucket?**
No. You can use any existing S3 bucket as long as it meets the [naming and region requirements](#s3-bucket-requirements) above.

**Can I connect multiple AWS accounts?**
Yes. You can connect additional AWS accounts as separate sources from the Sources page.

**How long before I see data?**
After a successful connection test, it typically takes **24–36 hours** for your first data to appear. This is because CloudForecast waits for AWS to deliver the next daily CUR export before importing it. AWS itself notes that [the first report delivery can take up to 24 hours](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html).

**Does CloudForecast support legacy CUR 1.0?**
Yes, but we recommend [CUR 2.0 (Data Exports)](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html) for the best compatibility and feature support.

**Will CloudForecast change anything in my AWS account?**
No. CloudForecast is strictly read-only. The IAM role we create only has permission to read from your S3 bucket — nothing else. You can review our permissions in the [CloudFormation template](https://www.cloudforecast.io/documentation/getting-started/cloudformation-method).
