<script lang="ts">
	import ButtonIcon from '$lib/components/ui/button-icon.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { PlusCircle, Save, XCircle } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, constraints, delayed, reset, enhance } = superForm(data.form, {
		onResult({ result }) {
			if (result.type === 'success') {
				toggleCreation();
			}
		}
	});

	let creating: boolean = false;
	function toggleCreation() {
		creating = !creating;

		if (!creating) {
			reset();
		}
	}
</script>

<div class="h-full py-10 flex flex-col items-center gap-3">
	<div class="flex justify-between items-center w-4/5">
		<h1 class="text-primary-900-50-token text-2xl">Your teams</h1>
		{#if !creating}
			<ButtonIcon
				icon={PlusCircle}
				label="Create"
				variant="filled-success"
				onClick={toggleCreation}
			/>
		{/if}
	</div>
	{#if creating}
		{#if $errors}
			<div class="flex flex-col items-center gap-2 mb-2">
				{#if $errors.name}<span class="text-error-500">{$errors.name}</span>{/if}
			</div>
		{/if}
		<form
			action="?/addTeam"
			method="post"
			class="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-3"
			use:enhance
		>
			<input
				type="text"
				name="name"
				class="col-span-2 lg:col-span-3 p-3 rounded"
				placeholder="New team's name"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				{...$constraints.name}
			/>
			<button
				type="submit"
				class="btn variant-filled-success rounded flex justify-center items-center gap-1"
				disabled={$delayed}
			>
				{#if !$delayed}
					<Save />
					<span class="text-lg">Save</span>
				{:else}
					<ProgressRadial
						...
						stroke={100}
						width="w-5"
						meter="stroke-primary-500"
						track="stroke-primary-500/30"
					/>
					<span class="text-lg">Saving</span>
				{/if}
			</button>
			<ButtonIcon
				icon={XCircle}
				label="Cancel"
				variant="filled-error"
				onClick={toggleCreation}
				disabled={$delayed}
			/>
		</form>
	{/if}
	{#if data.teams && data.teams.length > 0}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-3 w-4/5 mt-2">
			{#each data.teams as team, i}
				<a href="/teams/{team.slug}">
					<article
						class="variant-ringed-primary hover:variant-ghost-primary hover:shadow-lg rounded flex gap-8 p-5"
					>
						<div
							class="hidden md:flex justify-center items-center text-5xl text-secondary-900-50-token"
						>
							#{i + 1}
						</div>
						<div class="flex flex-col gap-3">
							<h1 class="text-2xl text-primary-900-50-token">
								<span class="text-secondary-900-50-token md:hidden">#{i + 1}</span>
								{team.name}
							</h1>
							<h1 class="text-lg">{team.description ? team.description : '...'}</h1>
						</div>
					</article>
				</a>
			{/each}
		</div>
	{:else}
		<h2 class="text-lg">You have no teams yet</h2>
	{/if}
</div>
