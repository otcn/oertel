<?php snippet('header', ['singleset' => false]) ?>

  <div id="content" class="page-body flex">
	  
	  <?php
			$portfolioImages = new Files();
			
    	foreach ($site->grandChildren()->listed() as $project) {
	  	  $portfolioImages->data = array_merge($portfolioImages->data, $project->images()->data);
    	}
			
			foreach ($pages->filter('template', 'set')->listed() as $set): ?>
    
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
              if ($project->listed()) {
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