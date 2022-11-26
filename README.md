# ITEMM-OpenLab-tools

## ITEMM - OpenLab tools for helping musical instrument makers

***
***

We implement seven different tools which are basically charts doing some calculation after user input, and displaying results.
There is an eighth "template" tool meant to be a model for any new tool you would like to create.

This repo contains a set of files organized in a main directory that should be uploaded as a plugin in WordPress. 

You can call the different tools by using a shortcode in a WP page such as [openlab-tools tool="the_tool_you_want_to_display"]

***
***

## How to upload this plugin in WP :
Simply download the code, compressed as a .zip file named openlab-tools.zip.

Go to WP in the admin section, and do : Plugin --> Add New --> Upload Plugin. 

Upload your .zip file, and activate the plugin.

After that is done, use a shortcode in one of your WP pages as mentionned above.

To get the images to display correctly, first you need to upload images in WP media. Then you can copy the link to these images found in your WP media library, and paste the link in the .html corresponding files. Paste inside the tag \<img src="wp_link_to_your_img.png"> or <iframe src ="wp_link_to_your_img.pdf">  

You're done.

***
***

## How the plugin works with its files : 
- The entry point is the file openlab-tools.php which calls the load_tool() function in file /includes/load_tool.php
- load_tool() will take care of loading the proper files to get the tool displayed, styled with CSS, and scripted with Javascript ! If you want to add a new tool, check the "template" part in this function and adapt it to your new tool.
- Javascript : we have a central olt_class.js script that is common to all tools, it contains the main functionnalities for interaction. And one other .js specific file per tool : here you can find the specific fields (corresponding to the /includes/.html tool file) for input/output and calculations.
- Style : a main olt_style common to every tool, you can here change the style for all tools. And if you need some specific tweaking, please use the specific .css files. 


