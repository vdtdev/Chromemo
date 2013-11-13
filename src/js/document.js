/*
 * 'document' functionality
 * Document and Browser accordons + dialog boxes
 */

// document function class

var _doc = {
	"saved" : false,
	"title" : "untitled",
	"save_key" : null,
	"save_note" : function() {
		var saves=null;
		chrome.storage.local.get("memos",function(data){
			if(data==undefined){
				data=new Array();
			}
			var newdata=new Array();
			if(data.memos.length!=undefined){
				for(i=0;i<data.memos.length;i++){
					newdata.push(data.memos[i]);
				}
			}
			
			var savedata={title:_doc.title,key:_doc.save_key,data:$("#editbox").val()};
			newdata.push(savedata);
			var fail=true;
			chrome.storage.local.set({"memos":newdata},function(){fail=false;});
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
			if (data.memos == undefined) {
				$("#notebook_browser").html("<i>No saved memos found</i>");
				return false;
			} 
			else if (data.memos.length==0){
				$("#notebook_browser").html("<i>No saved memos found</i>");
				return false;
			}
				else {
				$("#notebook_browser").html("<ul id='memolist'></ul>");
				for ( i = 0; i < data.memos.length; i++) {
					$("#memolist").append("<li id='" + data.memos[i].key + "'></li>");
					$("#" + data.memos[i].key).text(data.memos[i].title);
					$("#" + data.memos[i].key).bind("mousedown", function() {
						loadMemo(data.memos[i].key);
					});
				}

			}
		});

	},
	"load_note":function(noteKey){
		chrome.storage.local.get("memos",function(data){
			if(data.memos!=undefined){
				for(var i in data.memos){
					if(i.key==noteKey){
						_doc.title=i.title;
						_doc.saved=false;
						_doc.save_key=i.key;
						$("#editbox").val(i.data);
					}
				}
			}
		});
	},
	"reset":function(){
		_doc.title=null;
		_doc.key=null;
		_doc.saved=false;
		$("#lastSaved").text("Unsaved");
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
			// only generate a new key if there isn't one already'
			if(_doc.save_key==null){
				_doc.save_key=_doc.create_key();
			}
			_doc.save_note();
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
$("window").load(_doc.load_memos());
