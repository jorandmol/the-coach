<script lang="ts">
	import { ratingMap } from '$lib/utils/rating';
	import { HelpCircle } from 'lucide-svelte';

	export let rating: number | null;
</script>

<span class="badge-icon {rating ? ratingMap[rating].color : 'bg-surface-50-900-token'}">
	<svelte:component this={rating ? ratingMap[rating].icon : HelpCircle} />
</span>
