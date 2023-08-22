<script lang="ts">
	import ButtonIcon from '$lib/components/ui/button-icon.svelte';
	import { autofocus } from '$lib/utils/ui.js';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { Pencil, PlusCircle, Save, Trash2, XCircle, TrafficCone } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const {
		form: tForm,
		errors: tErrors,
		constraints: tConstraints,
		delayed: tDelayed,
		reset: tReset,
		enhance: tEnhance
	} = superForm(data.teamForm, {
		onResult({ result }) {
			if (result.type === 'success') {
				toggleEdition();
			}
		}
	});
	let editing: boolean = false;
	function toggleEdition() {
		editing = !editing;

		if (!editing) {
			tReset();
		}
	}

	const {
		form: pForm,
		errors: pErrors,
		constraints: pConstraints,
		delayed: pDelayed,
		reset: pReset,
		enhance: pEnhance
	} = superForm(data.playerForm, {
		onResult({ result }) {
			if (result.type === 'success' && result.status === 200) {
				addingPlayer && togglePlayerAddition();
			}
		}
	});
	let addingPlayer: boolean = false;
	function togglePlayerAddition() {
		addingPlayer = !addingPlayer;

		if (!addingPlayer) {
			pReset();
		}
	}

	const {
		form: sForm,
		errors: sErrors,
		delayed: sDelayed,
		enhance: sEnhance
	} = superForm(data.sessionForm, { dataType: 'json' });
</script>

<div class="h-full py-10 gap-10 flex flex-col items-center">
	<section id="team" class="flex flex-col items-center w-4/5 gap-4">
		{#if !editing}
			<div class="flex flex-col gap-3 justify-center items-center">
				<h1 class="text-primary-900-50-token text-2xl">{data.team.name}</h1>
				<p>{data.team.description ? data.team.description : '...'}</p>
			</div>
			<div class="flex gap-5 justify-center">
				<button
					type="button"
					class="btn btn-sm variant-filled-surface rounded flex justify-center items-center gap-1"
					on:click={toggleEdition}
				>
					<Pencil />
					<span class="text-lg">Update</span>
				</button>
				<form action="?/deleteTeam" method="post" use:tEnhance>
					<input type="hidden" name="id" bind:value={$tForm.id} />
					<button
						type="submit"
						class="btn btn-sm variant-filled-error rounded flex justify-center items-center gap-1"
						on:click={(e) =>
							!confirm('Are you sure you want to delete this team? All info will be lost') &&
							e.preventDefault()}
					>
						<Trash2 />
						<span class="text-lg">Remove</span>
					</button>
				</form>
			</div>
		{:else}
			<form action="?/editTeam" method="post" use:tEnhance>
				<input type="hidden" name="id" bind:value={$tForm.id} />
				<div class="flex flex-col gap-3 justify-center items-center mb-5">
					<input
						use:autofocus
						type="text"
						name="name"
						class="text-2xl p-3 rounded"
						placeholder="Team's name"
						aria-invalid={$tErrors.name ? 'true' : undefined}
						bind:value={$tForm.name}
					/>
					{#if $tErrors.name}<span class="text-error-500">{$tErrors.name}</span>{/if}
					<textarea
						name="description"
						class="p-3 w-full rounded resize-none"
						rows="10"
						placeholder="Team's description"
						aria-invalid={$tErrors.description ? 'true' : undefined}
						bind:value={$tForm.description}
						{...$tConstraints.description}
					/>
					{#if $tErrors.description}<span class="text-error-500">{$tErrors.description}</span>{/if}
				</div>
				<div class="flex gap-5 justify-center">
					<button
						type="submit"
						class="btn variant-filled-success rounded flex justify-center items-center gap-1"
						disabled={$tDelayed}
					>
						{#if !$tDelayed}
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
					<button
						type="button"
						class="btn btn-sm variant-filled-error rounded flex justify-center items-center gap-1"
						on:click={toggleEdition}
						disabled={$tDelayed}
					>
						<XCircle />
						<span class="text-lg">Cancel</span>
					</button>
				</div>
			</form>
		{/if}
	</section>
	<section id="players" class="w-3/5">
		<div class="flex flex-col lg:flex-row gap-3 justify-between items-center mb-5">
			<h1 class="text-primary-900-50-token text-2xl">Players</h1>
			{#if !addingPlayer}
				<div class="flex justify-end gap-5">
					<ButtonIcon
						icon={PlusCircle}
						label="Add player"
						variant="filled-success"
						onClick={togglePlayerAddition}
					/>
					{#if data.players && data.players.length > 0}
						<form action="?/createSession" method="post" use:sEnhance>
							<input type="hidden" name="teamId" bind:value={$sForm.teamId} />
							<input type="hidden" name="teamName" bind:value={$sForm.teamName} />
							{#each $sForm.players as _, i}
								<input type="hidden" bind:value={$sForm.players[i].id} />
								<input type="hidden" bind:value={$sForm.players[i].name} />
								<input type="hidden" bind:value={$sForm.players[i].number} />
								<input type="hidden" bind:value={$sForm.players[i].teamId} />
							{/each}
							<button
								type="submit"
								class="col-span-2 lg:col-span-1 btn variant-filled-secondary rounded flex justify-center items-center gap-1"
								disabled={$sDelayed}
							>
								{#if !$sDelayed}
									<TrafficCone />
									<span class="text-lg">New session</span>
								{:else}
									<ProgressRadial
										...
										stroke={100}
										width="w-5"
										meter="stroke-secondary-500"
										track="stroke-secondary-500/30"
									/>
									<span class="text-lg">Creating</span>
								{/if}
							</button>
						</form>
					{/if}
				</div>
			{/if}
		</div>
		{#if addingPlayer}
			{#if $pErrors}
				<div class="flex flex-col items-center gap-2 mb-2">
					{#if $pErrors.name}<span class="text-error-500">{$pErrors.name}</span>{/if}
					{#if $pErrors.number}<span class="text-error-500">{$pErrors.number}</span>{/if}
				</div>
			{/if}
			<form
				class="grid grid-cols-4 lg:grid-cols-6 gap-3 mb-5"
				action="?/addPlayer"
				method="post"
				use:pEnhance
			>
				<input type="hidden" name="teamId" bind:value={data.team.id} />
				<input
					use:autofocus
					type="text"
					name="name"
					class="col-span-3 p-3 rounded"
					placeholder="New player's name"
					aria-invalid={$pErrors.name ? 'true' : undefined}
					bind:value={$pForm.name}
					{...$pConstraints.name}
				/>
				<input
					type="number"
					name="number"
					class="col-span-1 p-3 rounded"
					placeholder="Number"
					aria-invalid={$pErrors.number ? 'true' : undefined}
					bind:value={$pForm.number}
					{...$pConstraints.number}
				/>
				<button
					type="submit"
					class="col-span-2 lg:col-span-1 btn variant-filled-success rounded flex justify-center items-center gap-1"
					disabled={$pDelayed}
				>
					{#if !$pDelayed}
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
					onClick={togglePlayerAddition}
					disabled={$pDelayed}
					classNames={'col-span-2 lg:col-span-1'}
				/>
			</form>
		{/if}
		{#if data.players && data.players.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
				{#each data.players as player}
					<article
						class="flex items-center gap-3 variant-ringed-primary hover:variant-ghost-primary hover:shadow-lg rounded p-3"
					>
						<span class="badge-icon variant-ghost-tertiary">{player.number}</span>
						<h1 class="grow text-2xl text-primary-900-50-token">{player.name}</h1>
						{#if !addingPlayer || $sDelayed}
							<form action="?/deletePlayer" method="post" use:pEnhance>
								<input type="hidden" name="id" value={player.id} />
								<input type="hidden" name="teamId" bind:value={player.teamId} />
								<input type="hidden" name="name" bind:value={player.name} />
								<input type="hidden" name="number" bind:value={player.number} />
								<button
									type="submit"
									class="btn-icon btn-icon-sm variant-filled-error"
									on:click={(e) =>
										!confirm(
											'Are you sure you want to delete this player? All of his/her info will be lost'
										) && e.preventDefault()}
								>
									<Trash2 size={18} />
								</button>
							</form>
						{/if}
					</article>
				{/each}
			</div>
		{:else}
			<h2 class="text-lg">There are not players in this team</h2>
		{/if}
	</section>
</div>
