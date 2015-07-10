// ==UserScript==
// @name         Steam-AutoCraft
// @namespace    http://10101000.redirectme.net/
// @version      1.1
// @description  AutoCraft Badges inside Steam
// @author       10101000 aka Ryan Steed
// @match        *://steamcommunity.com/*/gamecards/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @copyright    2015 10101000 (Ryan Steed)
// @grant        none
// ==/UserScript==

// Isolate jQuery for compatibility with other scripts
jQuery.noConflict();

var craftBadgeState = 0;
var invLinks = jQuery('.gamecards_inventorylink');

jQuery(document).ready(function(){
    if (jQuery('.badge_card_to_collect').length === 0){
        checkBadge();
    }

    if (craftBadgeState == 1){
        addButton();
    }
    
    if (window.sessionStorage.autoCraftState){
        autoCraft();
    }
});

function addButton(){
    if (invLinks){
        invLinks.append('<a><button type="button" class="btn_grey_grey btn_small_thin" id="autocraft"><span>AutoCraft remaining badges</span></button></a>');
        jQuery('#autocraft').click(function(){ autoCraft(); });
    }
}

function checkBadge(){
    if (jQuery('.badge_craft_button').length >= 1){
        craftBadgeState = 1;
    } else {
        delete window.sessionStorage.autoCraftState;
    }
}
    
function craftBadge(){
    jQuery('.badge_craft_button').click();
}
                      
function autoCraft(){
    craftBadge();
    setTimeout(function(){ checkBadge(); window.location.reload(true); }, 10000);
    window.sessionStorage.autoCraftState = 1;
}
