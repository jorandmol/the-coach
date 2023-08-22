<script lang="ts">
	import { Angry, Frown, HelpCircle, Laugh, Meh, Smile } from 'lucide-svelte';

	export let rating: number | null;

	let ratingMap: Record<number, any> = {
		1: { icon: Angry, color: 'bg-red-500' },
		2: { icon: Frown, color: 'bg-orange-500' },
		3: { icon: Meh, color: 'bg-yellow-500' },
		4: { icon: Smile, color: 'bg-green-500' },
		5: { icon: Laugh, color: 'bg-green-700' }
	};
</script>

<span class="badge-icon {rating ? ratingMap[rating].color : 'bg-surface-50'} text-surface-900">
	<svelte:component this={rating ? ratingMap[rating].icon : HelpCircle} />
</span>
