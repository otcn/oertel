<? snippet('metaheader') ?>
<body <?= ($singleset) ? 'class="single"' : '' ?>>
	<?php if (!$singleset): ?>
	
  <header class="page-header">
    <div class="row flex">
      <div class="author s">
        <h1><a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a></h1>
      </div>
      <div class="mail s">
        <h4><a href="mailto:<?= $site->email()->html() ?>"><?= $site->email()->html() ?></a></h4>
      </div>
      <div class="phone s">
        <h4><?= $site->phone()->html() ?></h4>
      </div>
      <div class="spacer s">
        <h4><a href="<?= $pages->find('profile')->url() ?>"><?= $pages->find('profile')->title() ?></a></h4>
      </div>
    </div>

    <div class="row one">
      <div class="about l">
        <?= $site->about()->kirbytext() ?>
      </div>
    </div>
  </header>


  <div id="faderOverlay" class="faderOverlay"></div>


  <header id="mobile-page-header" class="mobile-page-header">
    <div class="author">
      <h1> <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a> </h1>
    </div>

    <span id="mobileInfoButton" class="infoButton">ℹ︎</span>

    <div id="mobileInfo" class="info">
      <div class="about l">
        <?= $pages->find('profile')->copy()->kirbytext() ?>
      </div>
      
      <? 
        if ($pages->find('profile')->hasImages()) { echo '<a href="'.$site->url().'"><img src="'.$pages->find('profile')->images()->first()->thumb(['width' => 800, 'quality' => 75])->url().'" alt="Matthias Oertel"/></a>'; } 
      ?>
    </div>
    <h4> <a href="mailto:<?= $site->email()->html() ?>"><?= $site->email()->html() ?></a> </h4>
    <h4> <?= $site->phone()->html() ?> </h4>
  </header>
  
  <?php else: snippet('miniheader') ?>
  <?php endif ?>