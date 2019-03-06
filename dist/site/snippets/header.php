<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="robots" content="<?= ($site->indexing() == '1' && (!in_array($page->template(), ['set', 'featured', 'error', 'imprint']))) ? 'index, follow' : 'noindex, nofollow' ?>">
  <meta name="googlebot" content="<?= ($site->indexing() == '1' && (!in_array($page->template(), ['set', 'featured', 'error', 'imprint']))) ? 'index, follow' : 'noindex, nofollow' ?>">

  <title><?= $site->title() ?></title>
  <meta name="description" content="<?= $site->description() ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  
  <?= css('assets/css/Theinhardt-Regular.css') ?>
  <?= css('assets/css/o.css') ?>
  
  <? 
	  if (!$singleset) {
			echo js('https://code.jquery.com/jquery-3.3.1.min.js');
			echo js('assets/js/o.min.js');
		}
	?>

	<meta property="og:type" content="website" />
  <meta property="og:title" content="<?= $site->title() ?>">
  <meta property="og:site_name" content="Matthias Oertel Photography">
  <meta property="og:url" content="<?= $site->url() ?>">
  <meta property="og:description" content="<?= $site->description() ?>">
  <?= ($site->socialimage()->empty()) ? '' : '<meta property="og:image" content="'.$site->images()->find($site->socialImage())->thumb(array('width' => 800))->url().'">' ?>
  
	
</head>

<body <?= ($singleset) ? 'class="single"' : '' ?>>
	<?php if (!$singleset): ?>
	
  <header class="page-header">
    <div class="row flex">
      <div class="author s">
        <h1> <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a> </h1>
      </div>
      <div class="mail s">
        <h4> <a href="mailto:<?= $site->email()->html() ?>"><?= $site->email()->html() ?></a> </h4>
      </div>
      <div class="phone s">
        <h4> <?= $site->phone()->html() ?> </h4>
      </div>
      <div class="spacer s">
        <p></p>
      </div>
    </div>

    <div class="row one">
      <div class="about l">
        <?= $site->about()->kirbytext() ?>
      </div>
    </div>

    <div class="row one">
      <div class="clients l">
        <h2>Clients</h2>
        <?= $site->clients()->kirbytext() ?>
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
        <?= $site->about()->kirbytext() ?>
      </div>

      <div class="clients l">
        <h2>Clients</h2>
        <?= $site->clients()->kirbytext() ?>
      </div>
    </div>
          <h4> <a href="mailto:<?= $site->email()->html() ?>"><?= $site->email()->html() ?></a> </h4>
      <h4> <?= $site->phone()->html() ?> </h4>
  </header>
  
  <?php else: snippet('miniHeader') ?>
  <?php endif ?>
 
</body>