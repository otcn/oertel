<?php snippet('header', ['singleset' => false]) ?>

  <div id="content" class="page-body flex">
	  
	  <?php
			// grab a full set of all used images, just in case
			// still needs error handling in case no images are visible or none are selected for selection
			$portfolioImages = new Files($page);
			
    	foreach ($site->grandChildren()->visible() as $project) {
	  	  $portfolioImages->data = array_merge($portfolioImages->data, $project->images()->data);
    	}
			
			foreach ($pages->visible() as $set): ?>
    
      <section class="set s" id="<?= $set->uid() ?>">
	      
          <div class="set-head">
            <span class="caret-left caret">‹</span>
            <h3><?= $set->title() ?></h3>
            <p class="placeholder"></p>
            <span class="caret-right caret">›</span>
          </div>
					
        <?php
	        
	          // For normal sets
            foreach ($set->children() as $project) {
              if ($project->isVisible()) {
                snippet('project', array('project' => $project));
              }
            }
        ?>
      </section>
      <?php endforeach ?>
      
      <section class="set s featured" id="featured">
	        <?php $set = $site->children()->find('featured') ?>
	          
	          <div class="project">
							<div class="project-head featured-head">
              	<hr>
              	<h5>Matthias Oertel</h5>
								<p><?= $site->children()->find('featured')->subline() ?></p>
            	</div>
	          
	          <?php
						
            foreach ($set->selectedImages()->toStructure() as $imageURL) {
            	
            	// get parent page of featured image
              $filename = explode('/',$imageURL);
              $image = $portfolioImages->find(array_pop($filename));

              if ($image !== null) {
	           	 snippet('image', array('url' => $image->thumb('large')->url(), 'slug' => $image->name(), 'orientation' => $image->orientation(), 'height' => $image->height(), 'width' => $image->width(), 'ratio' => $image->height()/$image->width(), 'project' => $image->page(), 'set' => 'featured', 'hoverTitle' => $site->pages()->find('featured')->subline() ));
						 	}
						 
						}
						
						?>
						
            </div>
      </section>
  </div>

<?php snippet('footer') ?>