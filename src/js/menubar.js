/*
 * Menu UI Code (using jQuery Ui 1.10.3)
 * @author Wade Harkins <vdtdev@gmail.com>
 * @since 20131110
 */
function updateLastSaved(){
	var cdate = new Date();
	document.getElementById("lastSaved").innerText="Last Saved " + cdate.toDateString() + " at "+cdate.getHours()+ ":"+cdate.getMinutes();
}
function initMenubar(){
	$(function(){
		$("#tbNew").button({
			text:false, 
			icons:{primary:"ui-icon-document"}
		});
		$("#tbNew").bind("mousedown",
			function(){
				$(function(){
					document.getElementById("editbox").value="";
					$("#docord").accordion({active:1});
					_doc.reset();
				});
			}
		);
		$("#tbSave").button({
			text:false,
			icons:{
				primary: "ui-icon-disk"
			}
		});
		$("#tbSave").bind("mousedown",function(){activateSavePanel(true);});
		$("#tbBrowse").button({
			text:false,
			icons:{
				primary: "ui-icon-folder-open"
			}
		});
		$("#tbBrowse").bind("mousedown",function(){activateNotebook();_doc.load_memos();});
		$("#tbOptions").button({
			text:false,
			icons:{primary:"ui-icon-gear"}
		});
		$("#tbClear").button({
			text:false,
			icons:{primary:"ui-icon-trash"}
		});
		$("#tbClear").bind("mousedown",function(){document.getElementById("editbox").value="";});
		$("#tbClose").button({
			text:false,
			icons:{primary:"ui-icon-closethick"}
		});
	});
}
$("window").load(initMenubar());
