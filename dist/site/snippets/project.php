
<div class="project-head">
  <?= $project->title()->html() ?>
  <?= $project->copy() ?>
</div>

<?php foreach($project->files()->sortBy('sort', 'asc') as $image): ?>
   <?php snippet('image', array('url' => $image->url(), 'orientation' => $image->orientation())); ?>
<?php endforeach ?>