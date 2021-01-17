<!doctype html>
<html lang="en">
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
