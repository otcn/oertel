<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'de' ?>">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="robots" content="noindex">

  <title><?= $site->title()->html() ?> | <?= $page->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <?= css('assets/css/o.css') ?>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js"></script>
  <?= js('assets/js/o.min.js') ?>

  <!-- Mobile -->
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
  <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
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

     <i class="far fa-info-circle"></i>

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