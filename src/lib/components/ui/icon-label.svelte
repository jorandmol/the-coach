<script lang="ts">
	export let icon: any;
	export let label: string;
</script>

<div class="flex gap-2 justify-center items-center">
	<svelte:component this={icon} />
	<span>{label}</span>
</div>
