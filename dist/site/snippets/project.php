
<div class="project-head">
  <?= $project->title()->html() ?>
  <?= $project->copy() ?>
</div>

<?php foreach($project->files()->sortBy('sort', 'asc') as $image): ?>
  <?php if (!$favesOnly || ($favesOnly && ($image->favorite() == '1'))): ?>
    <figure>
      <img class="<?= $image->orientation() ?>" src="<?= $image->url() ?>" alt="">
    </figure>
<?php endif; endforeach ?>