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
          if ($set->uid() != 'selection') {

            // For normal sets
            foreach ($set->children() as $project) {
              snippet('project', array('project' => $project));
            }

          } else {
						
						// for the selection
            foreach ($set->selectedImages()->toStructure() as $imageURL): ?>
              
              <?php
                // get parent page of selection image
                $filename = explode('/',$imageURL);
                $str = array_pop($filename);
                $parent = $portfolioImages->find($str)->page();

                $orientation = $portfolioImages->find($str)->orientation();
                $projectTitle = $parent->title();
                $projectCopy = $parent->copy()->kirbytext();
              ?>

              <div class="project">
                <div class="project-head">
                  <?= $projectTitle->kirbytext() ?>
                  <?= $projectCopy->kirbytext()?>
                </div>

                <?php snippet('image', array('url' => $imageURL, 'orientation' => $orientation, 'project' => $parent, 'set' => 'selection', 'hoverTitle' => $projectTitle)); ?>
              </div>
            <?php endforeach ?>

            <?php
          }
        ?>
      </section>
    <?php endforeach ?>
    <div id="overlay" class="overlay"></div>
  </div>

<?php snippet('footer') ?>