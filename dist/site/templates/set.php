<?php snippet('header', ['singleset' => true]) ?>
  <div id="content" class="page-body flex">
	  
	  <?php
			// grab a full set of all used images, just in case
			// still needs error handling in case no images are visible or none are selected for selection
			$portfolioImages = new Files($page);
			
    	foreach ($site->grandChildren()->visible() as $project) {
	  	  $portfolioImages->data = array_merge($portfolioImages->data, $project->images()->data);
    	}
			
			$set = $page;
			
		?>
    
      <section class="set s zoomedSet" id="<?= $set->uid() ?>">
	      
        <?php
	        
          if ($set->uid() != 'featured') {
            
            // For normal sets
            echo ($page->clientSelection() == 'true') ? '<h1>Matthias Oertel</h1>' : '';
            foreach ($set->children() as $project) {
              if ($project->isVisible()) {
                snippet('project', array('project' => $project));
              }
            }

          } else { 
	     
          ?>
	          
	          <div class="project">
							<div class="project-head">
              	<hr>
              	<h5>Matthias Oertel</h5>
								<p><?= $site->pages()->find('featured')->subline() ?></p>
            	</div>
	          
	          <?php
						
						// for the featured set
            foreach ($set->selectedImages()->toStructure() as $imageURL) {
            	
            	// get parent page of featured image
              $filename = explode('/',$imageURL);
              $image = $portfolioImages->find(array_pop($filename));
              
              if ($image !== null) {
	           	 snippet('image', array('url' => $imageURL, 'slug' => $image->name(), 'orientation' => $image->orientation(), 'height' => $image->height(), 'width' => $image->width(), 'ratio' => $image->height()/$image->width(), 'project' => $image->page(), 'set' => 'featured', 'hoverTitle' => $site->pages()->find('featured')->subline() ));
						 	}
						 
						}
						
						?>
						
            </div>
            
            <?php } ?>
      </section>
  </div>
  
  <div class="prefooter">
	  <a href="<?= $site->url() ?>">View full portfolio</a>
  </div>

<?php snippet('footer') ?>