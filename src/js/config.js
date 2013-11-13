/*
 * Chromemo Configuration Functionality
 */

var _config={
	"configuration":null,
	"loadConfig":function(){
		var cfg=null;
		chrome.storage.local.get("config",function(i){cfg=i;});
		this.configuration=cfg;
	}
};
