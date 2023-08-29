<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppBar, AppShell, LightSwitch, Modal, Toast } from '@skeletonlabs/skeleton';

	import { Users, TrafficCone, ClipboardList } from 'lucide-svelte';
	import IconLabel from '$lib/components/ui/icon-label.svelte';

	import { page } from '$app/stores';
</script>

<Toast />
<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/" class="text-2xl font-bold text-primary-900-50-token">
					<IconLabel icon={ClipboardList} label="theCoach" />
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<ul class="bg-surface-200-700-token flex justify-center gap-10 py-4">
			<li
				class="text-xl text-secondary-900-50-token"
				class:font-bold={$page.url.pathname.startsWith('/teams')}
			>
				<a href="/teams"><IconLabel icon={Users} label="Teams" /></a>
			</li>
			<li
				class="text-xl text-secondary-900-50-token"
				class:font-bold={$page.url.pathname.startsWith('/sessions')}
			>
				<a href="/sessions"><IconLabel icon={TrafficCone} label="Sessions" /></a>
			</li>
		</ul>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">
		<div class="flex justify-center py-3">
			<span
				>Made by <a href="https://github.com/jorandmol" class="font-bold text-primary-900-50-token"
					>@jorandmol</a
				></span
			>
		</div>
	</svelte:fragment>
</AppShell>
