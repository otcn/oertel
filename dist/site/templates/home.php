<?php snippet('header') ?>

  <div id="content" class="page-body flex">
	  <?php
		  	// grab a full set of all used images, just in case
		  	// still needs error handling in case no images are visible or none are selected for selection
		  	$portfolioImages = new Files($page);
		  
        foreach ($site->grandChildren()->visible() as $project) {
	        $portfolioImages->data = array_merge($portfolioImages->data, $project->images()->data);
        }
		?>
	  
    <?php foreach ($pages->visible() as $set): ?>
      <section class="set s" id="<?= $set->uid() ?>">
        <div class="set-head">
          <i class="fas fa-caret-left"></i>
          <h3> <?= $set->title() ?> </h3>
          <p></p>
          <i class="fas fa-caret-right"></i>
        </div>

        <?php
          if ($set->uid() != 'featured') {

            // For normal sets
            foreach ($set->children() as $project) {
              snippet('project', array('project' => $project));
            }

          } else {
						
						// for the featured set
            foreach ($set->selectedImages()->toStructure() as $imageURL): ?>
              
              <?php
                // get parent page of featured image
                $filename = explode('/',$imageURL);
                $image = $portfolioImages->find(array_pop($filename));
                if ($image !== null):
              ?>
              
              

              <div class="project">
                <div class="project-head">
                  <hr>
                  <h5> <?= $image->page()->title() ?> </h5>
                  <?= $image->page()->copy()->kirbytext() ?>
                </div>

                <?php snippet('image', array('url' => $imageURL, 'orientation' => $image->orientation(), 'height' => $image->height(), 'width' => $image->width(), 'ratio' => $image->height()/$image->width(), 'project' => $image->page(), 'set' => 'featured', 'hoverTitle' => $image->page()->title())) ?>
              </div>
            <?php endif; endforeach ?>

            <?php
          }
        ?>
      </section>
    <?php endforeach ?>
    <div id="overlay" class="overlay"></div>
  </div>

<?php snippet('footer') ?>