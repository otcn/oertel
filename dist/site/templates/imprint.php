<?php snippet('imprintHeader') ?>
	  
<?php foreach($pages->invisible() as $imprint): ?>
    <div class="l"><?= $imprint->copy()->kirbytext() ?></div>
<?php endforeach ?>