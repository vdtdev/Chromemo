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
			if(data.memos!=undefined){
				if(data.memos.length!=undefined){
					for(i=0;i<data.memos.length;i++){
						newdata.push(data.memos[i]);
					}
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
		_doc.save_key=key;
		return key;
	},
	/**
	 * Refreshes the listing of saved memos in the notebook panel 
	 */
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
					$("#memolist").append("<li><a href='#' id='" +	data.memos[i].key + 
					"'></a><span id='x" + data.memos[i].key + 
					"' class='ui-icon ui-icon-trash' style='float:right;'></span></li>");
					$("#" + data.memos[i].key).text(data.memos[i].title);
					//$("#" + data.memos[i].key).append("<span id='x" + data.memos[i].key + "' class='ui-icon ui-icon-trash' style='float:right;'></span>");
					var x = data.memos[i].key;
					$("#" + data.memos[i].key).bind("mousedown",function(){loadMemo(this.id);});
					$("#x" + data.memos[i].key).bind("mousedown",function(){
						_doc.delete_note(this.id.substr(1));
						$(this).parent().hide();
						if(_doc.save_key==this.id.substr(1)){
							_doc.reset();
						}
						});
				}

			}
		});

	},
	"delete_note":function(noteKey){
		var index=-1;
		var fail=true;
		chrome.storage.local.get("memos",function(data){
			if(data.memos!=undefined){
				for(i=0;i<data.memos.length;i++){
					if(data.memos[i].key==noteKey){
						index=i;
						
					}
				}
			    if(index!=-1){
			    	data.memos.splice(index,1);
			    	chrome.storage.local.set({"memos":data.memos},function(){fail=false;});
			    }
			}
		});
		return fail;
	},
	"load_note":function(noteKey){
		chrome.storage.local.get("memos",function(data){
			if(data.memos!=undefined){
				for(i=0;i<data.memos.length;i++){
					if(data.memos[i].key==noteKey){
						_doc.title=data.memos[i].title;
						_doc.saved=false;
						/* no longer restoring the save key, because it might not always end up being cleared and then overwrites */
						//_doc.save_key=data.memos[i].key; 
						$("#editbox").val(data.memos[i].data);
						$("#docord").accordion({active:1});
					}
				}
			}
		});
	},
	"reset":function(){
		_doc.title=null;
		_doc.save_key=null;
		_doc.saved=false;
		$("#lastSaved").text("Unsaved");
	}
	
};
function loadMemo(memoKey){
	_doc.load_note(memoKey);
}
/**
 * initialize accordion and save panel events 
 */
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
