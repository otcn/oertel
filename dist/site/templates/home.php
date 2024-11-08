<?php snippet('header', ['singleset' => false]) ?>

  <div id="content" class="page-body flex">
	  
	  <?php
			// grab a full set of all used images, just in case
			// still needs error handling in case no images are visible or none are selected for selection
			$portfolioImages = new Files($page);
			
    	foreach ($site->grandChildren()->published() as $project) {
	  	  $portfolioImages->data = array_merge($portfolioImages->data, $project->images()->data);
    	}
			
			foreach ($pages->filter('template', 'set')->published() as $set): ?>
    
      <section class="set s" id="<?= $set->uid() ?>">
	      
          <div class="set-head">
            <span class="caret-left caret">‹</span>
            <h3><?= $set->title() ?></h3>
            <p class="placeholder"></p>
            <span class="caret-right caret">›</span>
          </div>
					
        <?php
	          // For regular sets
            foreach ($set->children() as $project) {
              if ($project->ispublished()) {
                snippet('project', array('project' => $project));
              }
            }
        ?>
      </section>
      <?php endforeach ?>
      
      <section class="set s featured" id="featured">	          
	          <div class="project">
							<div class="project-head featured-head">
              	<hr>
              	<h5>Matthias Oertel</h5>
								<p><?= $site->featuredImagesSubline() ?></p>
            	</div>
	          
	          <?php
            foreach ($site->featuredImages()->toFiles() as $image) {
              if ($image !== null) {
                snippet('image', array('url' => $image->thumb('large')->url(), 'slug' => $image->name(), 'orientation' => $image->orientation(), 'height' => $image->height(), 'width' => $image->width(), 'ratio' => $image->height()/$image->width(), 'project' => $image->page(), 'set' => 'featured', 'hoverTitle' => $site->featuredImagesSubline() ));
               }
            }						
						?>
						
            </div>
      </section>
  </div>

<?php snippet('footer') ?>