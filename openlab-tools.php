<?php

/*
Plugin Name: openlab-tools
Plugin URI: https://github.com/Thomas-N-GEORGE/ITEMM-OpenLab-tools
Description: This plugin displays the Openlab tools in WP pages. They are called by inserting shortcodes [/] in the WP pages, e.g. [openlab-tools tool="poutres"]
Version: 1.1.2
Author: Thomas GEORGE for ITEMM / OpenLab
Author URI: https://www.itemm.fr
*/

require plugin_dir_path( __FILE__ ) . 'includes/load_tools.php';

/**
 * The olt_app calls the function load_tool($tool) to load a specific tool in WP shortcode place.
 * 
 * I.E. we can call a tool on a WP page by adding the sortcode [openlab-tools tool="the_tool_you_want_to_display"]
 * 
 * @return string|false
 */
        
function olt_app($atts = array()) {
    
    ob_start();
    
    $tool = "";
    
    if (isset($atts["tool"])) {
        $tool = $atts["tool"];
    }

    load_tool($tool);
    
    return ob_get_clean();
}

add_shortcode( 'openlab-tools', 'olt_app' );
        
        