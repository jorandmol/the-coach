<script lang="ts">
	import { numToRoman, dateToString } from '$lib/utils/formater.js';

	export let data;
</script>

<div class="h-full py-10 flex flex-col items-center gap-3">
	<div class="flex justify-between items-center w-4/5">
		<h1 class="text-primary-900-50-token text-3xl">Your sessions</h1>
	</div>
	{#if data.sessions && data.sessions.length > 0}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-3 w-4/5 mt-2">
			{#each data.sessions as session, i}
				<a href="/sessions/{session.id}">
					<article
						class="variant-ringed-primary hover:variant-ghost-primary hover:shadow-lg rounded flex-col gap-2 p-5"
					>
						<div class="flex flex-col md:flex-row gap-1 justify-between items-center">
							<h2 class="text-2xl text-primary-900-50-token">
								{session.team.name}
							</h2>
							<h2 class="text-xl md:text-2xl text-secondary-900-50-token">
								Session {numToRoman(session.order)}
							</h2>
						</div>
						<div class="flex justify-end text-surface-900-50-token">
							{dateToString(session.date)}
						</div>
					</article>
				</a>
			{/each}
		</div>
	{:else}
		<h2 class="text-lg">You have no sessions yet</h2>
	{/if}
</div>
