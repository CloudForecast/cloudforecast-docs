---
title: "Access Keys Method"
description: "Access Keys Method"
---**Important Note: This setup method is not preferred and will be deprecated soon. We strongly encourage using the[CloudFormation method instead](/getting-started/cloudformation-method/).**

There are 3 steps total to complete this method:

  1. Copy CUR S3 bucket policy
  2. Paste Bucket Permissions
  3. Generate Access Credentials

_Important note: Before proceeding with these steps, be sure to follow these steps to enable the CUR files in your[AWS billing dashboard](https://www.cloudforecast.io/features/aws-billing-dashboard/): [Enable AWS CUR files](/getting-started/enable-aws-cost-and-usage-report/)_

### [](/getting-started/access-keys-method/#step-1-copy-cur-s3-bucket-policy)Step 1: Copy CUR S3 bucket policy

_Note: This step can be skipped if you have already copied the policy from the Enable AWS CUR file steps_

  1. Click your user name in the top navigation bar of AWS and then select “My Billing Dashboard”
  2. Under “My Billing Dashboard” proceed to “Cost and Usage Reports” on the left navigation.
  3. Check “on” on the CUR report name that was just created from this step [Enable AWS CUR files](/getting-started/enable-aws-cost-and-usage-report/)_
  4. Press edit
  5. Click Configure and under “Select existing bucket”, select the S3 bucket that was created for this report.
  6. Press next, which should lead you to “Verify Policy”
  7. Select all, and copy this policy into a notepad.
  8. Close out this modal.

### [](/getting-started/access-keys-method/#step-2-paste-bucket-permissions)Step 2: Paste Bucket Permissions

  1. Go to the [Amazon S3 Console](https://console.aws.amazon.com/s3/) and select/search for the S3 bucket created from [Enable AWS CUR files](/getting-started/enable-aws-cost-and-usage-report/).
  2. Click Permissions from the top tab and and then “Bucket Policy”.
  3. Paste the policy that you copied from Step 1 and press save.

### [](/getting-started/access-keys-method/#step-3-generate-access-credentials)Step 3: Generate Access Credentials

  1. Click on your username in the top navigation bar of AWS and select “My Security Credentials”
  2. On the left navigation, select “Users” and then click “Add user”.
  3. In step one of details, type in a User name in the “User name” field that you want to use for CloudForecast.
  4. Under access type, ensure only “programmatic access” is selected and then press “Next:Permissions” to go to step 2 of the form.
  5. Here are two options for adding policy for the user: 
     * Option A: Add user to a group
     * Option B: Attach it to an existing policy.

#### [](/getting-started/access-keys-method/#option-a---add-user-to-a-group)OPTION A – ADD USER TO A GROUP

  1. Ensure “Add User to group” is highlighted and then press “Create Group”
  2. In the “Group name” field, enter in a name you want for CloudForecast.
  3. On the bottom right hand corner, press “Create Group”
  4. Copy the following user policy and replace F00 with the bucket name:

    
    
    {
     "Version": "2012-10-17",
     "Statement": [
         {
             "Effect": "Allow",
             "Action": [
                 "s3:Get*",
                 "s3:List*"
             ],
             "Resource": [
                 "arn:aws:s3:::FOO",
                 "arn:aws:s3:::FOO/*"
             ]
         },
         {
             "Effect": "Allow",
             "Action": [
                 "organizations:ListAccounts"
             ],
             "Resource": [
                 "*"
             ]
         },
         {
             "Effect": "Allow",
             "Action": [
                 "ce:*"
             ],
             "Resource": [
                 "*"
             ]
         },
         {
             "Effect": "Allow",
             "Action": [
                 "savingsplans:List*",
                 "savingsplans:Describe*"
             ],
             "Resource": "*"
         }
     ]
    }

  1. Navigate back to your AWS tab.
  2. On the bottom table, select the group that you just created from step 3 and click into that group. You can either scroll to find or use the search functionality. This will open up a new tab in your browser
  3. Under the permissions tab, open “Inline policies” and select “click here”
  4. Select Custom Policy and press the Select button
  5. Name the Policy in Policy Name. Paste in the policy from above (ensure F00 has been replaced with the bucket name!) and press Apply Policy.
  6. Go back to your original tab from step 6, and ensure the CloudForecast Group is selected. Press “Next: Review” on the bottom right to go.
  7. Press Create User and you will be given two keys to copy in a notepad: Bucket Name, Access Key ID and Secret Access Key.
  8. Navigate back to CloudForecast. Under the setup portion, enter in the Bucket Name, Access Key ID and Secret Access Key and press “Confirm”
  9. CloudForecast will connect to your AWS account to verify your settings! You will receive your first email report within 24 hours from CloudForecast.

#### [](/getting-started/access-keys-method/#option-b---attaching-an-existing-policy)OPTION B – ATTACHING AN EXISTING POLICY

  1. Ensure “Attach existing policies directly” is highlighted and then press the “Create policy” button right below.
  2. A new tab will pop up and select “Create Your Own Policy” with the blue bottom on the right
  3. Copy the following user policy and replace f00 with the bucket name:

    
    
    {
     "Version": "2012-10-17",
     "Statement": [
         {
             "Effect": "Allow",
             "Action": [
                 "s3:Get*",
                 "s3:List*"
             ],
             "Resource": [
                 "arn:aws:s3:::FOO",
                 "arn:aws:s3:::FOO/*"
             ]
         },
         {
             "Effect": "Allow",
             "Action": [
                 "organizations:ListAccounts"
             ],
             "Resource": [
                 "*"
             ]
         },
         {
             "Effect": "Allow",
             "Action": [
                 "ce:*"
             ],
             "Resource": [
                 "*"
             ]
         },
         {
             "Effect": "Allow",
             "Action": [
                 "savingsplans:List*",
                 "savingsplans:Describe*"
             ],
             "Resource": "*"
         }
     ]
    }

  1. After you are done pasting the policy, press “Create Policy” to save.
  2. Navigate back to the tab from Step 1 and search for the policy you just crated. Ensure the left checkbox is checked off next to the policy.
  3. Press “Next: Review”
  4. Press “Create user” in step 3, and you will be given two keys to copy in a notepad: Access Key ID and Secret Access Key.
  5. Navigate back to CloudForecast. Under the setup portion, enter in the Bucket Name, Access Key ID and Secret Access Key and press “Confirm”
  6. CloudForecast will connect to your AWS account to verify your settings! You will receive your first email report within 24 hours from CloudForecast.

Within 24 hours, you should receive your first report from CloudForecast. Feel free to reach out to us if you do not receive your first email report.
