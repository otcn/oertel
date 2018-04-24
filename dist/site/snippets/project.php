<div class="project">
  <div class="project-head">
    <?= $project->title()->kirbytext() ?>
    <?= $project->copy()->kirbytext() ?>
  </div>

  <?php foreach($project->files()->sortBy('sort', 'asc') as $image): ?>
    <?php snippet('image', array('url' => $image->url(), 'orientation' => $image->orientation(), 'hoverTitle' => $project->title()->html())); ?>
  <?php endforeach ?>
</div>