<?php snippet('header') ?>

  <div class="page-body flex">
    <?php foreach ($pages->visible() as $set): ?>
      <section class="set s">
        <div class="set-head">
          <h3> <?= $set->title() ?> </h3>
        </div>

        <div class="project">
          <?php
            if($set->uid() != 'selection') {

              /* For normal sets */
              foreach ($set->children() as $project) {
                snippet('project', array('project' => $project, 'favesOnly' => false));
              }

            } else {

              /* For selection set */
              $favedImages = $site->grandChildren()->visible()->files()->filterBy('favorite','1');
              $projects = array();

              foreach ($favedImages as $favedImage) {
                if (!in_array($favedImage->page()->uid(), $projects)) {
                  snippet('project', array('project' => $favedImage->page(), 'favesOnly' => true));
                  array_push($projects, $favedImage->page()->uid());
                }
              }
          
            }
          ?>
        </div>
      </section>
    <?php endforeach ?>
</div>

<!-- CODE FOR ZOOM.JS -->
<?= js('assets/js/zoom.js') ?>
<script>
  document.querySelector('.page-body').addEventListener('click', function(event) {
    event.preventDefault();
    zoom.to({ element: event.target });
  });
</script>

<?php snippet('footer') ?>