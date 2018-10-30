 <? if (!in_array($page->template(), ['set', 'featured'])): ?>
 <header class="page-header">
    <div class="row flex">
      <div class="author s">
        <h1> <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a> </h1>
      </div>
      <div class="mail s">
      </div>
      <div class="spacer s">
        <p></p>
      </div>
      <div class="spacer s">
        <p></p>
      </div>
    </div>
  </header>

  <!-- Mobile header -->
  <header id="mobile-page-header" class="mobile-page-header">
    <div class="author">
      <h1> <a href="<?= url() ?>" rel="home"><?= $site->title()->html() ?></a> </h1>
    </div>
  </header>
  <? endif ?>