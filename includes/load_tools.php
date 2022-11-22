<?php

// load CSS style, JS script and return the chosen HTML content as a string
function load_tool($tool) {

    // css common style sheet for all tools
    wp_register_script('olt-script', plugin_dir_url( __DIR__ ) . '/css/olt_style.css');
    wp_enqueue_style( 'olt-style',  plugin_dir_url( __DIR__ ) . '/css/olt_style.css' ); 
    
    switch ($tool) {
        case "lames_idiophones":
            // css specific style sheets
            wp_register_style('olt-style', plugin_dir_url( __DIR__ ) . '/css/l_i_style.css' );
            wp_enqueue_style( 'olt-style',  plugin_dir_url( __DIR__ ) . '/css/l_i_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __DIR__ ) . '/js/l_i_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __DIR__ ) . '/js/l_i_script.js');
            // html
            include_once plugin_dir_path( __DIR__ ) . 'includes/lames_idiophones.html';
            break;
        case "flexion_3_points":
            // css specific style sheets
            wp_register_style('olt-style', plugin_dir_url( __DIR__ ) . '/css/f_3_style.css' );
            wp_enqueue_style( 'olt-style',  plugin_dir_url( __DIR__ ) . '/css/f_3_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __DIR__ ) . '/js/f_3_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __DIR__ ) . '/js/f_3_script.js');
            // html
            include_once plugin_dir_path( __DIR__ ) . 'includes/flexion_3_points.html';
            break;
        case "flexion_4_points":
            // css specific style sheets
            wp_register_style('olt-style', plugin_dir_url( __DIR__ ) . '/css/f_4_style.css' );
            wp_enqueue_style( 'olt-style',  plugin_dir_url( __DIR__ ) . '/css/f_4_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __DIR__ ) . '/js/f_4_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __DIR__ ) . '/js/f_4_script.js');
            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/flexion_4_points.html';
            break;
        case "poutres" :
            // css specific style sheets
            wp_register_style('olt-style', plugin_dir_url( __DIR__ ) . '/css/poutres_style.css' );
            wp_enqueue_style( 'olt-style',  plugin_dir_url( __DIR__ ) . '/css/poutres_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __DIR__ ) . '/js/poutres_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __DIR__ ) . '/js/poutres_script.js');
            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/poutres.html';
            break;
        case "plaques_woodhouse" :
            // css specific style sheets
            wp_register_style('olt-style', plugin_dir_url( __DIR__ ) . '/css/p_w_style.css' );
            wp_enqueue_style( 'olt-style',  plugin_dir_url( __DIR__ ) . '/css/p_w_style.css' ); 
            // js scripts
            wp_register_script('olt-script', plugin_dir_url( __DIR__ ) . '/js/p_w_script.js', array('jquery'),'1.0', true);
            wp_enqueue_script( 'olt-script',  plugin_dir_url( __DIR__ ) . '/js/p_w_script.js');
            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/plaques_woodhouse.html';
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