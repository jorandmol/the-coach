<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
	export let label: string;
	export let disabled: boolean = false;
	export let icon: any;
	export let variant: string = 'filled-surface';
	export let classNames: string = '';
	export let onClick: any;

	function handleClick() {
		onClick();
	}
</script>

<button
	{type}
	class="btn btn-sm variant-{variant} rounded flex justify-center items-center gap-1 {classNames}"
	on:click={handleClick}
	{disabled}
>
	<svelte:component this={icon} />
	<span class="text-lg">{label}</span>
</button>
