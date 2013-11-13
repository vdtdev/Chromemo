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
		chrome.storage.local.get("memos",function(i){saves=i;});
		if(saves==null || saves==undefined){
			saves=new Array();
		}
		var savedata={title:_doc.title,key:_doc.save_key,data:$("#editbox").val()};
		saves.push(savedata);
		var fail=true;
		chrome.storage.local.set({"memos":saves},function(){fail=false;});
	},
	"create_key":function(){
		var d=new Date();
		var key = "";
		key+=d.getUTCDate()+"_"+d.getTime();
		return key;
	},
	"load_memos":function(){
		var d = null;
		chrome.storage.local.get("memos",function(i){d=i;});
		if(d==undefined||d==null){
			$("#notebook_browser").html("<i>No saved memos found</i>");
			return d;
		}
		if(d.memos.length==0){
			$("#notebook_browser").html("<i>No saved memos found</i>");
			return d;
		}
		else{
			$("#notebook_browser").html("<ul></ul>");
			for(m in d.memos){
				$("#notebook_browser").children()[0].append("<li>"+m.title+"</li>");
				$("#notebook_browser").first().children().last().bind("mousedown",function(){loadMemo(m.key);});
			}
		}
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
		$("#docord").on("accordionactivate",function(e,u){
			if(u.newHeader=="Notebook"){
				_doc.load_memos();
			}});
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
