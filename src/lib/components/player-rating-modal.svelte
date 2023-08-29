<script lang="ts">
	import { ProgressRadial, modalStore } from '@skeletonlabs/skeleton';
	import ButtonIcon from './ui/button-icon.svelte';
	import { Eraser, Save, XCircle } from 'lucide-svelte';
	import { ratingMap } from '$lib/utils/rating';
	import { page } from '$app/stores';

	export let parent: any;

	let selectedRate: number | undefined = $modalStore[0]
		? $modalStore[0].meta.rating.rate
		: undefined;

	let iconSize: number = 60;

	const { errors, delayed, enhance } = $modalStore[0].meta;
</script>

{#if $modalStore[0]}
	<form
		action={$page.url.pathname}
		method="post"
		class="card bg-surface-50-900-token border border-solid border-surface-900-50-token rounded p-4 w-modal shadow-xl flex flex-col gap-8"
		use:enhance
	>
		<input type="hidden" name="ratingId" value={$modalStore[0].meta.rating.id} />
		<div class="flex flex-col gap-1 justify-center items-center">
			<h1 class="text-2xl text-primary-900-50-token text-center">
				{$modalStore[0].meta.rating.player.name}
			</h1>
			<h2 class="text-xl text-center">How do you feel after this session?</h2>
			{#if !selectedRate}
				<p>Select one of the following options</p>
			{:else}
				<p>
					You have chosen <span class="font-bold">{ratingMap[selectedRate].label}</span>
				</p>
				<button
					class="btn-icon btn-icon-sm variant-ghost-surface"
					on:click={() => (selectedRate = undefined)}
				>
					<Eraser />
				</button>
			{/if}
			{#if $errors.ratingId || $errors.rate}<span class="text-error-500"
					>There are errors in the data sent</span
				>{/if}
		</div>
		<div class="grid grid-cols-1 md:grid-cols-5 gap-4 mt-0">
			{#each Object.keys(ratingMap) as rate}
				<label class="flex flex-col justify-center items-center">
					<input
						type="radio"
						name="rate"
						value={Number(rate)}
						bind:group={selectedRate}
						class="hidden"
					/>
					<span class="btn-icon w-fit cursor-pointer">
						<svelte:component
							this={ratingMap[Number(rate)].icon}
							size={iconSize}
							strokeWidth="1"
							fill={ratingMap[Number(rate)].hexColor}
						/>
					</span>
					<small class="font-bold">{ratingMap[Number(rate)].label}</small>
				</label>
			{/each}
		</div>
		<div class="flex justify-center gap-2">
			<button
				type="submit"
				class="col-span-2 lg:col-span-1 btn variant-filled-success rounded flex justify-center items-center gap-1"
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
				onClick={() => parent.onClose()}
				disabled={$delayed}
			/>
		</div>
	</form>
{/if}
