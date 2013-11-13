/*
 * 'document' functionality
 * Document and Browser accordons + dialog boxes
 */

// document function class

var _doc = {
	"saved" : false,
	"title" : "untitled",
	"save_key" : null,
	"saveNote" : function() {
		var saves=null;
		chrome.storage.locaol.get("memos",function(i){saves=i;});
		if(saves==null || saves==undefined){
			saves=new Array();
		}
		var savedata={title:_doc.title,key:_doc.save_key,data:$("#editbox").val()};
		saves.push(savedata);
		var fail=true;
		chrome.storage.local.set("memos",saves,function(){fail=false;});
	},
	"create_key":function(){
		var d=new Date();
		var key = "";
		key+=d.getUTCDate()+"_"+d.getTime();
		return key;
	}
	
};
/**
 * jQuery up the Accordion 
 */
function initAccordion() {
	$(function() {
		$("#docord").accordion({
			collapsable : true,
			heightStyle: "fill"
		});
	});
}
/**
 * jquery up the notebook appearance 
 */
function initNotebook(){
	$(function(){
		$("#notebook").addClass("ui-state-default"),
		$("#notebook_browser").addClass("ui-dialog-content");
	});
}
/**
 * Expands the 'notebook' panel 
 */
function activateNotebook(){
	$(function(){
		$("#docord").accordion({active:1});
	});
}

function initDialogs(){
	$(function(){
		$("#dialog-save").dialog({
			modal:true,
			autoOpen:false,
			buttons:{
				Ok:function(){
					_doc.title=$("#dlgSaveName").val();
					_doc.save_key=_doc.create_key();
					_doc.saveNote();
					$(this).dialog("close");
				},
				Cancel:function(){
					$(this).dialog("close");
				}
			}
		});
	});
}
$("window").load(initAccordion());
$("window").load(initNotebook());
$("window").load(initDialogs());
