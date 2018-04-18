<?php

class ControlledimagesField extends RadioField {
  public function options() {
			return call_user_func($this->controller, $this);
		}

  static public $assets = array(
    'css' => array(
      'controlledimages.css'   // /path/to/field/assets/css/styles.css
    )
  );

  public function content() {

    $html = '<ul class="controlledimages">';

    switch($this->columns()) {
      case 2:
        $width = ' field-grid-item-1-2';
        break;
      case 3:
        $width = ' field-grid-item-1-3';
        break;
      case 4:
        $width = ' field-grid-item-1-4';
        break;
      case 5:
        $width = ' field-grid-item-1-5';
        break;
      default:
        $width = '';
        break;
    }

    foreach($this->options() as $key => $value) {
      $html .= '<li>';
      $html .= $this->item($key, $value);
      $html .= '</li>';
    }

    $html .= '</ul>';

    $content = new Brick('div');
    $content->addClass('field-content');
    $content->append($html);

    return $content;

  }

}