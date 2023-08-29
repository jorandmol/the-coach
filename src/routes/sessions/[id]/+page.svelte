<script lang="ts">
	import { modalStore, type ModalSettings, toastStore } from '@skeletonlabs/skeleton';

	import type { PlayerRating } from '$lib/server/repository/player-rating.js';
	import { dateToString, numToRoman } from '$lib/utils/formater.js';

	import RatingIcon from '$lib/components/ui/rating-icon.svelte';
	import PlayerRatingModal from '$lib/components/player-rating-modal.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const form = superForm(data.form, {
		onResult({ result }) {
			if (result.type === 'success' && result.status === 200) {
				modalStore.close();
			}
		},
		onUpdated({ form }) {
			if (form.message) {
				toastStore.trigger({
					message: form.message,
					background: 'variant-filled-error'
				});
			}
		}
	});

	function openModal(rating: PlayerRating) {
		const modalSettings: ModalSettings = {
			type: 'component',
			component: {
				ref: PlayerRatingModal
			},
			meta: { rating, ...form }
		};
		modalStore.trigger(modalSettings);
	}
</script>

<div class="h-full py-10 gap-10 flex flex-col items-center">
	<section id="session" class="flex flex-col items-center w-3/5 gap-4">
		<div
			class="flex w-full flex-col md:flex-row gap-3 md:justify-between items-center md:items-end"
		>
			<h2 class="text-2xl text-primary-900-50-token w-full text-left">
				{data.session.team.name}
			</h2>
			<h1 class="text-3xl font-bold text-secondary-900-50-token w-full text-center">
				Session {numToRoman(data.session.order)}
			</h1>
			<h2 class="text-xl md:text-2xl text-surface-900-50-token w-full text-right">
				{dateToString(data.session.date)}
			</h2>
		</div>
	</section>
	<section id="ratings" class="flex flex-col items-center w-3/5 gap-4">
		{#if data.ratings && data.ratings.length > 0}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2 w-full">
				{#each data.ratings as rating}
					<button type="button" on:click={() => openModal(rating)}>
						<article
							class="flex items-center gap-3 variant-ringed-primary hover:variant-ghost-primary hover:shadow-lg rounded p-3"
						>
							<span class="badge-icon variant-ghost-tertiary">{rating.player.number}</span>
							<h1 class="grow text-2xl text-primary-900-50-token">{rating.player.name}</h1>
							<RatingIcon rating={rating.rate} />
						</article>
					</button>
				{/each}
			</div>
		{:else}
			<h2 class="text-lg">This session has no player rating</h2>
		{/if}
	</section>
</div>
