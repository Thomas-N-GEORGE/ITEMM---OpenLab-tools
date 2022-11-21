<?php

/*
Plugin Name: openlab-tools
Plugin URI: https://www.totgeogeo-github.com
Description: This plugin displays the Openlab tools in WP pages. They are called by shortcodes [/] in the WP pages.
Version: 1.0
Author: Thomas GEORGE for ITEMM / OpenLab
*/


// load CSS style, JS script and return the chosen HTML content as a string
function load_tool($tool) {
    wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/olt_style.css' ); 
    switch ($tool) {
        case "lames_idiophones":
            // css styles
            // wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/l_i_style.css' );
            // wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/l_i_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/l_i_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/l_i_script.js');
            // html
            include_once plugin_dir_path( __FILE__ ) . 'includes/lames_idiophones.html';
            break;
        case "flexion_3_points":
            // css styles
            // wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/f_3_style.css' );
            // wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/f_3_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/f_3_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/f_3_script.js');
            // html
            include_once plugin_dir_path( __FILE__ ) . 'includes/flexion_3_points.html';
            break;
        case "flexion_4_points":
            // css styles
            // wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/f_4_style.css' );
            // wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/f_4_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/f_4_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/f_4_script.js');
            // html                    
            include_once plugin_dir_path( __FILE__ ) . 'includes/flexion_4_points.html';
            break;
        case "poutres" :
            // css styles
            // wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/poutres_style.css' );
            // wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/poutres_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/poutres_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/poutres_script.js');
            // html                    
            include_once plugin_dir_path( __FILE__ ) . 'includes/poutres.html';
            break;
        case "plaques_woodhouse" :
            // css styles
            // wp_register_style('olt-style', plugin_dir_url( __FILE__ ) . '/css/p_w_style.css' );
            // wp_enqueue_style( 'olt-style',  plugin_dir_url( __FILE__ ) . '/css/p_w_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __FILE__ ) . '/js/p_w_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __FILE__ ) . '/js/p_w_script.js');
            // html                    
            include_once plugin_dir_path( __FILE__ ) . 'includes/plaques_woodhouse.html';
            break;
        default:
            echo "
                    <p>
                        Can't find the tool... </br>
                        Please check tool attribute in shortcode :</br>
                        [openlab-tools tool=\"the_tool_you_want_to_display\"]</br>
                        It should be one of the following : </br>
                        \"lames_idiophones\"</br>
                        \"flexion_3_points\"</br>
                        \"flexion_4_points\"</br>
                        \"poutres\"</br>
                        \"plaques_woodhouse\"</br>
                    <p>
            ";
      }
}

/**
 * The olt_app is loaded inside a div.
 * We can call it on a WP page adding the sortcode [openlab-tools tool="the_tool_you_want_to_display\"]
 * @return string|false
 */

function olt_app($atts = array()) {
    
    ob_start();

    $tool = ""; //$atts["tool"];

    if (isset($atts["tool"])) {
        $tool = $atts["tool"];
    }

    load_tool($tool);

    return ob_get_clean();
}

add_shortcode( 'openlab-tools', 'olt_app' );

