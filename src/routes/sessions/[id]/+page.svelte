<script lang="ts">
	import { dateToString, numToRoman } from '$lib/utils/formater.js';

	import RatingIcon from '$lib/components/ui/rating-icon.svelte';

	export let data;
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
					<article
						class="flex items-center gap-3 variant-ringed-primary hover:variant-ghost-primary hover:shadow-lg rounded p-3"
					>
						<span class="badge-icon variant-ghost-tertiary">{rating.player.number}</span>
						<h1 class="grow text-2xl text-primary-900-50-token">{rating.player.name}</h1>
						<RatingIcon rating={rating.rate} />
					</article>
				{/each}
			</div>
		{:else}
			<h2 class="text-lg">This session has no player rating</h2>
		{/if}
	</section>
</div>
