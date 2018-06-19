<div class="project">
  <div class="project-head">
    <?= $project->title()->kirbytext() ?>
    <?= $project->copy()->kirbytext() ?>
  </div>

  <?php foreach($project->files()->sortBy('sort', 'asc') as $image): ?>
  	<?= $project->page() ?>
    <?php snippet('image', array('url' => $image->url(), 'orientation' => $image->orientation(), 'height' => $image->height(), 'width' => $image->width(), 'ratio' => $image->height()/$image->width(), 'project' => $project->slug(), 'set' => $project->parent()->slug(), 'hoverTitle' => $project->title()->html())); ?>
  <?php endforeach ?>
</div>