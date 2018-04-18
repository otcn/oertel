<?php

class imageselection {
    static function imagelist($field) {
        $kirby = kirby();
        $site = $kirby->site();
        
        $result = array();
        
        foreach ($site->grandChildren() as $project) {
	        foreach ($project->images() as $image) {
		        $result[$image->url()] = $image;
	        }
        }
				
        return $result;
    }
}