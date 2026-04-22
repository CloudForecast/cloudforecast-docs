---
title: "Single Sign-On (SSO)"
description: "Set up Single Sign-On for your CloudForecast account using Google Workspace, Okta, or Azure AD."
---

CloudForecast integrates with [WorkOS](https://www.workos.com/) to provide secure Single Sign-On (SSO) support. SSO allows your team members to log in using your organization's existing identity provider rather than managing separate CloudForecast credentials.

**Supported identity providers:**

- Google Workspace
- Okta
- Azure AD (Microsoft Entra ID)
- And many others supported by WorkOS

---

## Benefits of Single Sign-On

- A secure way to give multiple team members access to CloudForecast without sharing credentials.
- Team members can view the full cost report from a Slack notification without needing separate login credentials.
- Externally linked graphs and charts can be shared directly with teammates.
- Simplifies access management — when an employee leaves your organization, revoking their identity provider access also removes their CloudForecast access.

---

## Who Is WorkOS?

WorkOS is a platform that helps companies like CloudForecast add enterprise-grade SSO support without building and maintaining integrations with each identity provider in-house. WorkOS handles the authentication handshake for all major identity providers in a secure, standards-compliant way.

WorkOS is modeled on the OAuth 2.0 framework. You can read more in the [WorkOS documentation](https://workos.com/docs/sso/guide/introduction).

---

## Is My Data Secure?

WorkOS holds SOC 2 Type II certification and follows strict security practices, including:

- **Data Integrity** – A dedicated in-house security team enforces adherence to international standards and privacy protocols.
- **Operational Security** – Policies covering incident response, security compliance, and vendor management.
- **Automated Infrastructure** – Systems are continuously monitored, logged, and kept up to date against security vulnerabilities.

Relevant WorkOS policy pages:

- [Privacy Policy](https://workos.com/privacy)
- [Information Security Policy](https://workos.com/security)
- [Terms of Service](https://workos.com/terms-of-service)

---

## How to Enable SSO for CloudForecast

SSO is available on request. Email [support@cloudforecast.io](mailto:support@cloudforecast.io) to have SSO enabled for your account. Once enabled, you will see a new **SSO** option under your account settings.

> **Note:** The steps below use Google Workspace as an example. Other providers such as Okta and Azure AD follow a similar process but may require additional configuration details specific to that provider.

**Setup steps:**

1. After SSO is enabled on your account, go to **Account → SSO**.
2. Click **Configure your SSO authentication**. This opens the WorkOS admin portal.
3. Choose your organization's identity provider and click **Get Started**.
4. Enter and confirm the allowed domain name associated with your identity provider. Click **Confirm**.
5. If the domain matches your identity provider, you will see a confirmation screen.
6. Click **Test Single Sign-On** to verify the connection in the WorkOS portal. You can also review recent SSO events and usage from this screen.
7. Click **Back to CloudForecast** to return to the app.
8. Let the CloudForecast team know you have completed setup. Once confirmed on our end, your SSO status will show as **Active**.
