<?php snippet('header', ['singleset' => true]) ?>
  
  <div class="page-body customSelection">
    <h5><?= $page->title() ?></h5>
    <?= ($page->subtitle()->isNotEmpty()) ? '<p>'.$page->subtitle().'</p>' : '' ?>
    <?= $page->text()->kt() ?>
	 <?php foreach ($page->images() as $image): ?>
    <figure class="<?= $image->orientation() ?>">
      <img src="<?= $image->thumb('xlarge')->url() ?>" alt="Image copyright by Matthias Oertel" />
    </figure>
   <? endforeach ?>
  </div>
  
  <div class="prefooter">
	  <a href="<?= $site->url() ?>">View full portfolio</a>
  </div>

<?php snippet('footer') ?>