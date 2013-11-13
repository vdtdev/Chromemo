Chromemo
=========

Chromemo is a Memo/Notebook application written for Chrome.

Status
------
Working
 + Saving memos
 + Listing saved memos in notebook
 
To Do:
 + Implement loading/overwriting existing memos

Data Structures
---------------

Memos are stored in an array of Memo objects;

JSON definition of memo object:
```
{title:"Memo title",
 key:"unique key generated from date/time of save",
 data:"memo content"}
 ```



Libraries Used
--------------
* jQuery
* jQueryUI


Revision Notes
--------------
  + 2013.11.13@10:20AM - Implemented a basic "load memo" function (`_doc.load_memo`); untested as of yet
  
 
2013, Wade Harkins. <vdtdev@gmail.com> 
