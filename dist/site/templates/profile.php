<?php snippet('metaheader', ['singleset' => true]) ?>
<section class="profile">
	
	<div>
		<?= ($page->hasImages()) ? '<a href="'.$site->url().'"><img src="'.$page->images()->first()->thumb(['width' => 800, 'quality' => 75])->url().'" alt="Matthias Oertel"/></a>' : '' ?>
		<div>
			<h4>Profile</h4>
			<?= $page->copy()->kirbytext() ?>
		</div>
	</div>
	
	<div class="join">
		<div>
			<div>
				<h4>Currently accepting new bookings</h4>
				<p>
					<?= $site->phone()->html() ?><br/>
					<a href="mailto:<?= $site->email()->html() ?>"><?= $site->email()->html() ?></a>
				</p>
			</div>
			<div>
				<h4>Selected publications</h4>
				<?= $page->publications()->kirbytext() ?>
			</div>
		</div>
	
		<div>
			<div></div>
			<div>
				<h4>Selected clients</h4>
				<?= $page->clients()->kirbytext() ?>
			</div>
		</div>
		
		<div>
			<p><a href="<?= $site->url() ?>">Return to portfolio</a></p>
			<p><a href="<?= $pages->find('imprint')->url() ?>" target="_blank">Imprint/Privacy Policy</a></p>
		</div>
	
	</div>

</section>

</body>
</html>