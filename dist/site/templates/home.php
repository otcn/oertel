<?php snippet('header') ?>

  <div class="page-body flex">
    <?php foreach ($pages->visible() as $set): ?>
      <section class="set s" id="<?= $set->uid() ?>">
        <div class="set-head">
          <h3> <?= $set->title() ?> </h3>
          <p></p>
        </div>

        <?php
          if($set->uid() != 'selection') {

            /* For normal sets */
            foreach ($set->children() as $project) {
              snippet('project', array('project' => $project));
            }

          } else {

            foreach ($set->selectedImages()->toStructure() as $imageURL) {
              snippet('image', array('url' => $imageURL, 'orientation' => 'portrait', 'project' => 'selection', 'set' => 'selection', 'hoverTitle' => 'Selection image'));
            }
          }
        ?>
      </section>
    <?php endforeach ?>
    <div id="overlay" class="overlay"></div>
  </div>

<?php snippet('footer') ?>