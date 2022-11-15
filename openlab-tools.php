<?php

/*
Plugin Name: openlab-tools
Plugin URI: https://www.totgeogeo.com
Description: This plugin displays the Openlab tools in WP pages. They are called by shortcodes [/] in the WP pages.
Version: 1.0
Author: Thomas GEORGE for ITEMM / OpenLab
*/

// includes
//require_once(plugin_dir_path( __FILE__ ) . 'includes/html_strings.php');

// functions to enqueue Stylesheets and Scripts
function olt_styles() {
    // wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/l_i_style.css' );
    // wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/l_i_style.css' );     

    // wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/f_3_style.css' );
    // wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/f_3_style.css' ); 
    
    wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/f_4_style.css' );
    wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/f_4_style.css' ); 
}

function olt_scripts() {
    // wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/l_i_script.js', array('jquery'),'1.0', true);
    // wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/l_i_script.js');                      
    
    // wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/f_3_script.js', array('jquery'),'1.0', true);
    // wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/f_3_script.js');                      

    wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/f_4_script.js', array('jquery'),'1.0', true);
    wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/f_4_script.js');                      
}

function include_html_file($olt_tool) {
    switch ($olt_tool) {
        case "lames_idiophones":
            include_once plugin_dir_path( __FILE__ ) . 'includes/lames_idiophones.html';
            break;
        case "flexion_3_points":
            include_once plugin_dir_path( __FILE__ ) . 'includes/flexion_3_points.html';
            break;
        case "flexion_4_points":
            include_once plugin_dir_path( __FILE__ ) . 'includes/flexion_4_points.html';
            break;
        default:
            echo "
                    <p>
                        Can't find the tool... </br>
                        Please check tool attribute in shortcode :</br>
                        [openlab-tools tool=\"the_tool_you_want_to_display\"]
                    <p>
            ";
      }
}

/**
 * The olt_app is loaded inside a div.
 * We can use it on the admin page doing the sortcode [openlab-tools]
 * @return string|false
 */

function olt_app($atts = array()) {
    
    ob_start();

    $olt_tool = $atts["tool"];

    // enqueue chosen .CSS & .JS
    olt_styles();
    olt_scripts();


    // include_once plugin_dir_path( __FILE__ ) . 'includes/flexion_4_points.html';
    
    // return the chosen HTML content as a string
    include_html_file($olt_tool);

    return ob_get_clean();
}

add_shortcode( 'openlab-tools', 'olt_app' );

