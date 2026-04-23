---
title: "EKS & ECS Container Cost Visibility"
description: "Break down container costs by cluster, namespace, deployment, service, and Kubernetes label for EKS and ECS workloads using AWS Split Cost Allocation Data."
---

Running containers on shared EC2 or Fargate capacity makes cost attribution hard — multiple workloads share the same underlying instance, so there's no obvious way to answer "what does this service actually cost?"

CloudForecast solves this using **AWS Split Cost Allocation Data (SCAD)**, which allocates shared compute costs down to the individual pod or task level. You get cost visibility by cluster, namespace, deployment, ECS service, and Kubernetes label — without installing any agents in your cluster.

For setup instructions, see [Setting Up EKS & ECS Container Cost Visibility](/getting-started/setting-up-container-costs/).

---

## How It Works

AWS SCAD appears in the Cost & Usage Report (CUR) as the `split_line_item_split_cost` column. It represents each container's proportional share of underlying compute cost, calculated using:

- **90% CPU weight / 10% memory weight** (AWS default)

The result is a usage-based cost estimate, not a billing amount. Idle capacity on a node is billed by AWS but is not distributed — only what containers actually consumed is allocated. This means container cost totals will always be lower than your AWS bill for the same cluster.

CloudForecast reads `split_line_item_split_cost` from your CUR and enriches it with EKS and ECS metadata tags to produce the breakdowns described below.

---

## EKS Dashboard

Once your EKS source is active, CloudForecast creates a dashboard with the following default views. Each view is a daily time-series chart you can interact with.

### Clusters

Shows daily `split_line_item_split_cost` grouped by EKS cluster name. Use this as your entry point — click any cluster in the chart to drill down into its namespaces.

### Namespaces

Shows daily cost grouped by Kubernetes namespace across all clusters (or within a specific cluster if filtered). Namespaces are the most common unit for team-level cost attribution.

### Workloads

Shows daily cost grouped by workload type — Deployment, StatefulSet, DaemonSet, Job, ReplicaSet. Helps you understand which workload patterns are most expensive.

### Drilldown

All three charts support multi-level drilldown:

**Cluster → Namespace → Workload Type → Workload Name**

Click any bar to go one level deeper. At the workload name level you see individual deployment or job costs. ReplicaSets automatically show their parent Deployment name for cleaner attribution. Job workloads have ephemeral suffixes stripped so they group correctly.

---

## ECS Dashboard

Once your ECS source is active, CloudForecast creates:

### Clusters

Daily cost grouped by ECS cluster name. Click to drill into services within that cluster.

### Services

Daily cost grouped by ECS service name. This is typically the most useful breakdown for ECS — services map directly to application components.

### Drilldown

**Cluster → Service**

---

## Cost Detective for EKS & ECS

Cost Detective provides a deeper analytical view beyond the default dashboard. Open it via the **Explore** button on any EKS or ECS source card.

### What's Available

**Monthly Overview** — a drilldown chart showing costs by calendar month for the last 1–12 months. Navigate from cluster down through the full hierarchy.

**Daily Overview** — same drilldown structure at daily granularity for the past month. Useful for spotting spikes and short-term trends.

**Top Workloads / Top Services** — a sortable table of every workload or service in your cluster, showing:

| Column | What it shows |
|---|---|
| **7-day avg (per day)** | Average daily cost over the last 7 days |
| **30-day avg (per day)** | Average daily cost over the last 30 days |
| **90-day total** | Total cost over the last 90 days |

The table is exportable and covers up to 500 workloads or services.

### Configuring the Detective View

Before opening the detective dashboard, you can scope the analysis:

- **Tags** — filter to specific tag key/value pairs applied to your EKS or ECS resources
- **Sub Accounts** — restrict the analysis to specific AWS linked accounts

---

## Kubernetes Label Support

AWS includes Kubernetes label key/value pairs in the CUR when EKS label cost allocation tagging is enabled in the AWS billing console. CloudForecast reads these directly and makes them available for filtering in Cost Groups and Cost Detective.

Labels allow you to group container costs by dimensions that match how your team actually thinks about ownership:

| Label | Common use |
|---|---|
| `kubernetes:team` | Team or squad ownership |
| `kubernetes:service` | Microservice name |
| `kubernetes:environment` | prod / staging / dev |
| `kubernetes:product` | Product area or business unit |
| `kubernetes:service_role` | Role within a system (api, worker, cron) |

Labels appear automatically in CloudForecast once they're enabled in AWS and present in the CUR — no additional configuration needed.

---

## Cost Metrics

CloudForecast shows two distinct cost numbers for EKS and ECS:

| Metric | Source | What it means |
|---|---|---|
| **AWS Cost** | `line_item_unblended_cost` or `line_item_amortized_cost` | Your actual AWS bill for EC2 or Fargate. Toggle between Unblended and Amortized in settings. |
| **Container Cost (Split)** | `split_line_item_split_cost` | Estimated cost allocated to each container based on CPU/memory usage. Always amortized by AWS. |

These two numbers will never match — that gap represents idle capacity on your nodes.

---

## Understanding the Gap Between Container Cost and Your AWS Bill

This is expected behavior, not a data problem.

| Reason | Explanation |
|---|---|
| **Idle resources** | AWS bills for the full instance. Unused CPU/memory is not allocated in `split_line_item_split_cost`. |
| **Estimate vs. actuals** | Split cost is a proportional allocation, not a precise measurement. |
| **Scope** | SCAD only covers ECS/EKS compute. Other AWS services (RDS, S3, etc.) are separate. |
| **Always amortized** | AWS bakes RI and Savings Plan amortization into `split_line_item_split_cost` regardless of your cost mode setting. |

**Example:** You run one EC2 instance (`$100/day`) hosting two pods, each using 1 vCPU and 9GB RAM. Node capacity is 4 vCPU / 36GB. Total pod usage is 50% of the node.

- AWS bill: `$100/day`
- Container split cost: `~$50/day`
- Gap: `$50/day` (idle capacity)

Use split cost for **showback and chargeback** — allocate only what teams actually consumed. Use AWS Cost when you need to reconcile against your invoice.

---

## Adding EKS & ECS to Cost Groups

You can include EKS and ECS sources in any Cost Group to combine container costs with other AWS services. When adding a container source to a Cost Group, you can filter by:

- **Tags** — limit to specific Kubernetes or ECS tags
- **Sub Accounts** — limit to specific AWS linked accounts
- **Cost Categories** — apply AWS Cost Category filters

---

## Frequently Asked Questions

**Why doesn't my namespace cost match what my AWS bill shows for the cluster?**
Split cost only includes what pods consumed — idle node capacity is billed by AWS but not allocated. The gap is expected.

**Do I need to install anything in my cluster?**
No. All data comes from AWS SCAD in your CUR. No agents, no cluster access required.

**Will Kubernetes labels appear automatically?**
Yes, once EKS label cost allocation tags are enabled in the AWS billing console and AWS starts including them in the CUR. There's no additional CloudForecast configuration needed.

**Can I use this for chargeback?**
Yes. The recommended approach is to allocate only consumed capacity (split cost) to teams, and account for idle capacity separately at the platform or infrastructure team level.

**Why do ReplicaSet costs show a Deployment name?**
CloudForecast maps ReplicaSets to their parent Deployment using the `aws_EksDeployment` tag, so costs roll up to a meaningful workload name rather than an ephemeral ReplicaSet identifier.

**What happened to my Job workload names?**
Job workloads have ephemeral suffixes (e.g. `-abc12`, `-12345`) stripped automatically so that recurring jobs group together rather than appearing as separate workloads each run.

**Can I see costs broken down by AWS region or account?**
Yes — region and account breakdowns are available in Cost Detective and Cost Groups. The default dashboard views group by cluster, namespace, and workload.
