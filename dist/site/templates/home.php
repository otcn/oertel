<?php snippet('header') ?>

  <div class="page-body flex">
    <?php foreach ($pages->visible() as $set): ?>
      <section class="set s">
        <div class="set-head">
          <h3> <?= $set->title() ?> </h3>
          <p></p>
        </div>

        <div class="project">
          <?php
            if($set->uid() != 'selection') {

              /* For normal sets */
              foreach ($set->children() as $project) {
                snippet('project', array('project' => $project));
              }

            } else {

            	foreach ($set->selectedImages()->toStructure() as $imageURL) {
								snippet('image', array('url' => $imageURL, 'orientation' => 'portrait', 'hoverTitle' => 'Selection image'));
							}
            }
          ?>
        </div>
      </section>
    <?php endforeach ?>
</div>
<?php snippet('footer') ?>