// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.cloudforecast.io',
	integrations: [
		starlight({
			favicon: '/favicon.ico',
			head: [
				{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
				{ tag: 'link', attrs: { rel: 'preload', href: '/fonts/satoshi-400.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' } },
				{ tag: 'link', attrs: { rel: 'preload', href: '/fonts/satoshi-700.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' } },
			],
			title: 'CloudForecast Docs',
			logo: {
				src: './src/assets/cloudforecast-logo.svg',
				replacesTitle: true,
			},
			customCss: ['./src/styles/custom.css'],
			pagination: false,
			components: {
				Head: './src/components/Head.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				SocialIcons: './src/components/SocialIcons.astro',
			},
			sidebar: [
				{
					label: '🔭 Overview',
					items: [
						{ label: 'Home', link: '/' },
						{ label: 'What Is CloudForecast?', slug: 'overview/what-is-cloudforecast' },
						{ label: 'FAQ', slug: 'overview/faq' },
					],
				},
				{
					label: '🚀 Getting Started',
					items: [
						{ label: 'Setup Guide', slug: 'getting-started/setup-guide' },
						{ label: 'Signing Up', slug: 'getting-started/signing-up' },
						{ label: 'Connecting Your AWS Account', slug: 'getting-started/connecting-aws' },
						{ label: 'Connecting Your Azure Account', slug: 'getting-started/connecting-azure' },
						{ label: 'Connecting Your Azure CSP Account', slug: 'getting-started/connecting-azure-csp' },
						{ label: 'Connecting Databricks', slug: 'getting-started/connecting-databricks' },
						{ label: 'Setting Up EKS & ECS Container Cost Visibility', slug: 'getting-started/setting-up-container-costs' },
						{ label: 'Setting Up ZeroWaste (AWS Cost Optimization)', slug: 'getting-started/zerowaste' },
					],
				},
				{
					label: '✨ Features',
					items: [
						{ label: 'Cost Groups', slug: 'features/cost-groups' },
{ label: 'Cost Detective', slug: 'features/cost-detective' },
						{ label: 'ZeroWaste', slug: 'features/zerowaste' },
						{ label: 'RI & SP Inventory', slug: 'features/ri-sp-inventory' },
						{ label: 'RI & SP Usage Dashboard', slug: 'features/ri-sp-usage' },
						{ label: 'AWS Marketplace Dashboard', slug: 'features/marketplace' },
						{ label: 'Cost Increase Alerts', slug: 'features/cost-increase-alerts' },
					{ label: 'Cost Increase Investigation', slug: 'features/cost-increase-investigation' },
						{ label: 'MAP Tracker', slug: 'features/map-tracker' },
					{ label: 'Monthly Financial Report', slug: 'features/monthly-financial-report' },
						{ label: 'Tagging Center', slug: 'features/tagging-center' },
						{ label: 'EKS & ECS Container Cost Visibility', slug: 'features/container-costs' },
						{ label: 'Databricks Cost Dashboard', slug: 'features/databricks' },
					],
				},
				{
					label: '🔌 Integrations',
					items: [
						{ label: 'Slack', slug: 'integrations/slack' },
						{ label: 'Microsoft Teams', slug: 'integrations/teams' },
						{ label: 'Jira', slug: 'integrations/jira' },
						{ label: 'ProsperOps', slug: 'integrations/prosperops' },
						{ label: 'Cortex', slug: 'integrations/cortex' },
						{ label: 'Databricks', slug: 'integrations/databricks' },
					],
				},
				{
					label: '🔒 Account & Security',
					items: [
						{ label: 'Settings', slug: 'account/settings' },
						{ label: 'Billing', slug: 'account/billing' },
						{ label: 'Single Sign-On', slug: 'account/sso' },
						{ label: 'AWS IAM Permissions Reference', slug: 'account/iam-permissions' },
					],
				},
			],
		}),
	],
});
