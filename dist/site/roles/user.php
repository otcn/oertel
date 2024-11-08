<?php

return [
  'name'        => 'User',
  'default'     => true,
  'permissions' => [
    '*'                 => true,
    'panel.page.visibility' => function() {
	    
	    if (($this->target() == $this->site())
	    	&& ($this->site()->children()->filterBy('template', 'set')->published()->count() >= 4) 
	    	&& ($this->target()->visibility() == 'visible')) {
        return false;
      } else {
        return true;
      }
	    
	  }
  ]
];