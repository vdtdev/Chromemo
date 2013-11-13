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
		chrome.storage.local.get("memos",function(data){
			saves=data;
			if(saves==null || saves==undefined){
				saves=new Array();
			}
			var savedata={title:_doc.title,key:_doc.save_key,data:$("#editbox").val()};
			saves.memos.concat(savedata);
			var fail=true;
			chrome.storage.local.set({"memos":saves},function(){fail=false;});
			_doc.saved=true;
			updateLastSaved();
		});
	},
	"create_key":function(){
		var d=new Date();
		var key = "";
		key+=d.getUTCDate()+"_"+d.getTime();
		return key;
	},
	"load_memos":function(){
		var d = null;
		chrome.storage.local.get("memos", function(data) {
			d = data;
			if (d.memos == undefined) {
				$("#notebook_browser").html("<i>No saved memos found</i>");
				return false;
			} else {
				$("#notebook_browser").html("<ul id='memolist'></ul>");
				for ( i = 0; i < d.memos.length; i++) {
					$("#memolist").append("<li id='" + d.memos[i].key + "'></li>");
					$("#" + d.memos[i].key).text(d.memos[i].title);
					$("#" + d.memos[i].key).bind("mousedown", function() {
						loadMemo(d.memos[i].key);
					});
				}

			}
		}); 

	},
	"reset":function(){
		_doc.title=null;
		_doc.key=null;
		_doc.saved=false;
	}
	
};
function loadMemo(memoKey){}
function initAccordion() {
	$(function() {
		$("#docord").accordion({
			collapsable : true,
			heightStyle: "fill"
		});
		$("#saveBoxHeader").hide();
		$("#saveBox").hide();
		$("#dlgSaveOk").bind("mousedown",function(){
			_doc.title=$("#dlgSaveName").val();
			_doc.save_key=_doc.create_key();
			_doc.saveNote();
			activateSavePanel(false);
		});
		$("#dlgSaveCancel").bind("mousedown",function(){activateSavePanel(false);});
		// auto refresh memo listing
	/*	$("#docord").on("accordionactivate",function(e,u){
			if(u.newHeader=="Notebook"){
				_doc.load_memos();
			}});*/
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
		$("#docord").accordion({active:0});
	});
}

/**
 * Show and Expand the 'Save' panel 
 */
function activateSavePanel(b){
	if(b){
		$("#saveBoxHeader").show();
		$("#saveBox").show();
		$("#docord").accordion({active:2});
	}
	else{
		$("#saveBoxHeader").hide();
		$("#saveBox").hide();
		$("#docord").accordion({active:0});
	}
	
}

$("window").load(initAccordion());
$("window").load(initNotebook());
