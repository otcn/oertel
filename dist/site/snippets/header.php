<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="robots" content="noindex">

  <title><?= $site->title()->html() ?> — <?= $page->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">
  
  <?= css('assets/css/Theinhardt-Regular.css') ?>
  <?= css('assets/css/o.css') ?>

  <?= js('https://code.jquery.com/jquery-3.3.1.min.js') ?>
  <?= js('https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js') ?>
  
  <!-- Mobile -->
  <?= css('https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css') ?>
  <?= js('https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js') ?>
  
  <?= js('assets/js/o.min.js') ?>

  <meta property="og:title" content="<?= $site->title()->html() ?>">
  <meta property="og:site_name" content="Matthias Oertel Photography">
  <meta property="og:url" content="<?= $site->url() ?>">
  <meta property="og:description" content="<?= $site->description()->kirbytext() ?>">
  <meta property="og:image" content="<?= $site->socialImage()->url() ?>">
</head>

<body>
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

  <div id="faderOverlay"></div>


  <!-- Mobile header -->
  <header id="mobile-page-header" class="mobile-page-header">
    <div class="author">
      <h1> <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a> </h1>
    </div>

    <span class="infoButton">ℹ︎</span>

    <div class="info">
      <div class="about l">
        <?= $page->about()->kirbytext() ?>
      </div>

      <div class="clients l">
        <h2>Clients</h2>
        <?= $page->clients()->kirbytext() ?>
      </div>

      <h4> <a href="mailto:<?= $site->email()->html() ?>"><?= $site->email()->html() ?></a> </h4>
      <h4> <?= $site->phone()->html() ?> </h4>
    </div>
  </header>
</body>