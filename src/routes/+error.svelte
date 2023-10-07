<script>
	import { page } from '$app/stores';
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<h1 class="text-3xl text-primary-900-50-token">{$page.status}</h1>
	<p class="text-xl">{$page.error?.message ?? 'Oops!'}</p>
</div>
