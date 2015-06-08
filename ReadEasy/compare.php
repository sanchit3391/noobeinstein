<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="generator" content="CoffeeCup HTML Editor (www.coffeecup.com)">
    <meta name="dcterms.created" content="Fri, 24 Apr 2015 19:57:36 GMT">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <title></title>
    <script type="text/javascript" src="scripts/jquery.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui.js"></script>
    <script type="text/javascript" src="scripts/highlight.js"></script>
    <script type="text/javascript" src="scripts/compare.js"></script>	
	<link rel="stylesheet" type="text/css" href="scripts/jquery-ui.css" />   
    <!--[if IE]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body onload="initialize()">
  <input type="hidden" value="<?php $_GET['document_id']?>"></input>
  <p id="test"></p>
  <input type="hidden" id="document_id" value="<?php echo $_GET['document_id']?>" />
<div style="width:50%; height:100%;float:left;"><h1 style="text-align:center;">Original</h1><br/>
<textarea style="width:100%; height:300px; overflow:hidden;" id="original"></textarea></div>
<div style="width:50%;height:100%; float:left"><h1 style="text-align:center;">Edited</h1><br/>
<textarea style="width:100%; height:300px; overflow:hidden" id="edited"></textarea></div>

<div style="width:100%;height:100px; float:left;" id="community"><h1 style="text-align:center;">Community</h1><br/>
  <textarea style="width:100%; height:20px;" placeholder="Add Content" id="edit_text"></textarea><br/>
  <input type="checkbox" id="dependent" name="dependent" value="dependent">My change is dependent on existing content</input>
  <br/>
  <button onclick="handle_edit()">Submit Edit</button>
  <h2>Previous Edits</h2>
  <ul id="previous_edits"></ul>
</div>
  </body>
</html>