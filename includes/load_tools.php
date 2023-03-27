<?php

/**
 * This file contains the load_tool function that will let WP load all files to display a tool.
 * 
 * 
 * load_tool will first enqueue a general common style sheet, and a common script file to all tools.
 * 
 * After that, it enqueues a specific style sheet and a specific script file, per tool.
 * 
 * And finally it includes the specific HTML file to dispaly the tool.
 * 
 * If no valid tool name is given in WP shortcode, it displays helping message (see end of function)
 * 
*/ 

// load CSS style, JS script and return the chosen HTML content as a string
function load_tool($tool) {

    // css common style sheet for all tools
    wp_register_style('olt_common_style', plugin_dir_url( __DIR__ ) . '/css/olt_style.css');
    wp_enqueue_style( 'olt_common_style',  plugin_dir_url( __DIR__ ) . '/css/olt_style.css' ); 

    // js common module script file
    wp_register_script('olt_common_script', plugin_dir_url( __DIR__ ) . '/js/olt_class.js', array('jquery'),'1.0', true);
    wp_enqueue_script( 'olt_common_script',  plugin_dir_url( __DIR__ ) . '/js/olt_class.js');

    
    switch ($tool) {
        case "lames_idiophones":
            // css specific style sheet
            wp_register_style('olt_l_i_style', plugin_dir_url( __DIR__ ) . '/css/l_i_style.css' );
            wp_enqueue_style( 'olt_l_i_style',  plugin_dir_url( __DIR__ ) . '/css/l_i_style.css' ); 

            // js specific script
            wp_register_script('olt_l_i_script', plugin_dir_url( __DIR__ ) . '/js/l_i_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_l_i_script', plugin_dir_url( __DIR__ ) . '/js/l_i_script.js');

            // html
            include_once plugin_dir_path( __DIR__ ) . 'includes/lames_idiophones.html';
            break;

        case "flexion_3_points":
            // css specific style sheet
            wp_register_style('olt_f_3_p_style', plugin_dir_url( __DIR__ ) . '/css/f_3_style.css' );
            wp_enqueue_style( 'olt_f_3_p_style',  plugin_dir_url( __DIR__ ) . '/css/f_3_style.css' ); 

            // js specific script
            wp_register_script('olt_f_3_p_script', plugin_dir_url( __DIR__ ) . '/js/f_3_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_f_3_p_script', plugin_dir_url( __DIR__ ) . '/js/f_3_script.js');

            // html
            include_once plugin_dir_path( __DIR__ ) . 'includes/flexion_3_points.html';
            break;

        case "flexion_4_points":
            // css specific style sheet
            wp_register_style('olt_f_4_p_style', plugin_dir_url( __DIR__ ) . '/css/f_4_style.css' );
            wp_enqueue_style( 'olt_f_4_p_style',  plugin_dir_url( __DIR__ ) . '/css/f_4_style.css' ); 

            // js specific script
            wp_register_script('olt_f_4_p_script', plugin_dir_url( __DIR__ ) . '/js/f_4_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_f_4_p_script', plugin_dir_url( __DIR__ ) . '/js/f_4_script.js');

            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/flexion_4_points.html';
            break;

        case "poutres" :
            // css specific style sheet
            wp_register_style('olt_poutres_style', plugin_dir_url( __DIR__ ) . '/css/poutres_style.css' );
            wp_enqueue_style( 'olt_poutres_style',  plugin_dir_url( __DIR__ ) . '/css/poutres_style.css' ); 

            // js specific script
            wp_register_script('olt_poutres_script', plugin_dir_url( __DIR__ ) . '/js/poutres_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_poutres_script', plugin_dir_url( __DIR__ ) . '/js/poutres_script.js');

            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/poutres.html';
            break;

        case "plaques_woodhouse" :
            // css specific style sheet
            wp_register_style('olt_p_w_style', plugin_dir_url( __DIR__ ) . '/css/p_w_style.css' );
            wp_enqueue_style( 'olt_p_w_style',  plugin_dir_url( __DIR__ ) . '/css/p_w_style.css' ); 

            // js specific script
            wp_register_script('olt_p_w_script', plugin_dir_url( __DIR__ ) . '/js/p_w_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_p_w_script', plugin_dir_url( __DIR__ ) . '/js/p_w_script.js');

            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/plaques_woodhouse.html';
            break;

        case "cordes" :
            // css specific style sheet
            wp_register_style('olt_cordes_style', plugin_dir_url( __DIR__ ) . '/css/cordes_style.css' );
            wp_enqueue_style( 'olt_cordes_style',  plugin_dir_url( __DIR__ ) . '/css/cordes_style.css' ); 

            // js specific script
            wp_register_script('olt_cordes_script', plugin_dir_url( __DIR__ ) . '/js/cordes_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_cordes_script', plugin_dir_url( __DIR__ ) . '/js/cordes_script.js');

            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/cordes.html';
            break;

        case "equivalence" :
            // css specific style sheet
            wp_register_style('olt_equiv_style', plugin_dir_url( __DIR__ ) . '/css/equiv_style.css' );
            wp_enqueue_style( 'olt_equiv_style',  plugin_dir_url( __DIR__ ) . '/css/equiv_style.css' ); 

            // js specific script
            wp_register_script('olt_equiv_script', plugin_dir_url( __DIR__ ) . '/js/equiv_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_equiv_script', plugin_dir_url( __DIR__ ) . '/js/equiv_script.js');

            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/equiv.html';
            break;

        case "quartiers" :
            // css specific style sheet
            wp_register_style('olt_quartiers_style', plugin_dir_url( __DIR__ ) . '/css/quartiers_style.css' );
            wp_enqueue_style( 'olt_quartiers_style',  plugin_dir_url( __DIR__ ) . '/css/quartiers_style.css' ); 

            // js specific script
            wp_register_script('olt_quartiers_script', plugin_dir_url( __DIR__ ) . '/js/quartiers_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_quartiers_script', plugin_dir_url( __DIR__ ) . '/js/quartiers_script.js');

            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/quartiers.html';
            break;

        case "template" :
            // css specific style sheet
            wp_register_style('olt_template_style', plugin_dir_url( __DIR__ ) . '/css/template_style.css' );
            wp_enqueue_style( 'olt_template_style',  plugin_dir_url( __DIR__ ) . '/css/template_style.css' ); 

            // js specific script
            wp_register_script('olt_template_script', plugin_dir_url( __DIR__ ) . '/js/template_script.js', ['jquery','olt_common_script'],'1.0', true);
            wp_enqueue_script( 'olt_template_script', plugin_dir_url( __DIR__ ) . '/js/template_script.js');

            // html                    
            include_once plugin_dir_path( __DIR__ ) . 'includes/template.html';
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
                        \"cordes\"</br>
                        \"equivalence\"</br>
                        \"quartiers\"</br>
                        \"template\"</br>
                    <p>
            ";
      }
}