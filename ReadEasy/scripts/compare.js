var originalIndex;
var editedIndex;
var originalLength;
var editedLength;
var currentStart;
var currentEnd;
var refresh_edit = false;
var edit_data_json = [];

function Edit(id, edited_by, content, vote)
{
    this.id =  id;
    this.editedBy = edited_by;
    this.content = content;
    this.vote = vote;
}



function initialize()
{
  originalStart = 0;
  editedStart = 0;
  originalEnd = 0;
  editedEnd = 0;
  get_documents();
}

//Gets the original document from the server
function get_documents()
{
    var url = "helper/get_document.php";
    $.ajaxSetup({
    dataType: "text json",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    data: {
        "document_id": $('#document_id').val()
    }
    });
    $.ajax({
    url: url,
    type: 'POST',
    cache: false,
    dataType: "json",
    success: function (data) {
    //for refresh
        setup_documents(data);
    },
    error: function (xhr, status, errorThrown) {
        //alert(status + errorThrown);
    }
    });
}

//Sets up the two views with the document
function setup_documents(json_data)
{
    $('#original').html(json_data[0].content);
    get_edits(-1,-1);
}

//continuous polling of the DOM
window.setInterval(function(){
  //get_selection('original');
  //get_selection('edited');
}, 1000);

//Gets the selection made in the text area
function get_selection(textarea_id)
{
  //None selected
  if(document.getElementById(textarea_id).selectionStart == document.getElementById(textarea_id).selectionEnd ){
    return;
  }
  if(document.getElementById(textarea_id).selectionEnd != 0){
    set_indexes(textarea_id);
  }
  if(textarea_id == 'original')
  {
    //highlight_text(textarea_id);
    get_edits(document.getElementById(textarea_id).selectionStart, document.getElementById(textarea_id).selectionEnd);
  }
}

function highlight_text(textarea_id)
{
    var current_html = $('#' + textarea_id).html().split("");
    var temp_html = [];
    var counter = 0;
    for(var i=0; i<current_html.length;i++)
    {
        if(i == document.getElementById(textarea_id).selectionStart)
        {
            var mark_html = "<mark>".split("");
            for(var j=0; j<mark_html.length; j++)
            {
                temp_html[counter] = mark_html[j];
                counter += 1;
            }
        }
        if(i == document.getElementById(textarea_id).selectionEnd)
        {
            var mark_html = "</mark>".split("");
            for(var j=0; j<mark_html.length; j++)
            {
                temp_html[counter] = mark_html[j];
                counter += 1;
            }
        }
        temp_html[counter] = current_html[i];
        counter += 1;
    }
    alert(temp_html.join(""))
    $('#' + textarea_id).html(temp_html.join(""));
}


//Sets the current indexes (more of a helper method)
function set_indexes(textarea_id)
{
    if(currentStart == document.getElementById(textarea_id).selectionStart && currentEnd == document.getElementById(textarea_id).selectionEnd)
        return;
    currentStart = document.getElementById(textarea_id).selectionStart;
    currentEnd = document.getElementById(textarea_id).selectionEnd;
}

function handle_edit()
{
    if($('#dependent').prop('checked'))
    {
        get_dependent_text();
    }
    else
    {
        submit_edit();
    }
}


//Gets the dependent text and then calls submit edit
function get_dependent_text()
{
    $('body').append('<div style="width:500px; height: 500px;" id="dep_dialog"></div>');
    $('#dep_dialog').html('<h1>Select dependent content</h1>' + $('#original').html());

    $("#dep_dialog").dialog({
      buttons: [
        {
          text: "Ok",
          icons: {
            primary: "ui-icon-heart"
          },
          click: function() {
            $( this ).dialog( "close" );
            //submit_edit();
          }
        },
        {
          text: "Cancel",
          icons: {
            primary: "ui-icon-heart"
          },
          click: function() {
            $( this ).dialog( "close" );
          }
        }
      ]
    });
}

//Submits the changes that are entered in the box below
function submit_edit()
{
    var url = "helper/submit_edit.php";
    $.ajaxSetup({
	dataType: "text json",
	contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	data: {
	    "original_start": document.getElementById('original').selectionStart,
		"original_end": document.getElementById('original').selectionEnd,
		"edited_by": "Sanchit",
		"content": $('#edit_text').val(),
		"document_id": $('#document_id').val()
	}
    });
    $.ajax({
	url: url,
	type: 'POST',
	cache: false,
	dataType: "text",
	success: function (data) {
	    $('#edit_text').val('');
        get_edits(-1, -1);
	},
	error: function (xhr, status, errorThrown) {
	    //alert(status + errorThrown);
	}
    });
}

//Gets the previous edits to the document so that it can be loaded correctly
//in the text area
function get_edits(from, to)
{
    if(from==to)
    {
        refresh_edit = true;
    }
	var url = "helper/get_edits.php";
    $.ajaxSetup({
	dataType: "text json",
	contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	data: {
	    "start_index": from,
		"end_index": to,
		"document_id": $('#document_id').val()
	}
    });
    $.ajax({
	url: url,
	type: 'POST',
	cache: false,
	dataType: "json",
	success: function (data) {
	    edit_data_json = data;
		set_edit_textarea_data(data);
		set_list(data);
	},
	error: function (xhr, status, errorThrown) {
	    alert(status + errorThrown);
	}
    });
}


//Parses out the changes made previously and appends the unchanged data to it thus
//giving the edit text area the full edited doc
//TODO: pick the top voted one in common area
function set_edit_textarea_data(json_data)
{
    if(refresh_edit == true){
        refresh_edit = false;
        var edit_html = $('#original').val().split("");
        for(var i=0;i<json_data.length;i++)
        {
            var edit_segment = json_data[i].content.split("");
            var temp_counter = 0;
            for(var j=json_data[i].original_start;j<json_data[i].original_end;j++)
            {
                edit_html[j] = edit_segment[temp_counter];
                temp_counter += 1;
            }
        }
        $("#edited").val(edit_html.join(''));
    }
}

//Alters the vote of a comment
function alter_vote(edit_id, vote_count, alter_amount)
{
    var url = "helper/edit_vote.php";
    $.ajaxSetup({
    dataType: "text json",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    data: {
        "vote_count": (vote_count + alter_amount),
        "id": edit_id
    }
    });
    $.ajax({
    url: url,
    type: 'POST',
    cache: false,
    dataType: "json",
    success: function (data) {
        for(var i=0;i<edit_data_json.length;i++)
        {
            if(edit_data_json[i].id == data[0].id)
            {
                edit_data_json[i].vote = data[0].vote;
                set_list(edit_data_json);
                break;
            }
        }
    },
    error: function (xhr, status, errorThrown) {
        alert(status + errorThrown);
    }
    });
}

//Sets the list at the bottom which shows all the changes to the document sorted by vote count
//default
function set_list(json_data)
{
    $('#previous_edits').html('');
    for(var i=0;i<json_data.length;i++)
    {
        var edit = new Edit(json_data[i].id, json_data[i].edited_by, json_data[i].content, json_data[i].vote);
        $('#previous_edits').append('<li id="' + edit.id + '"></li>');
        set_edit_list_content(edit);
    }
}

//more of a helper method
function set_edit_list_content(edit)
{
    var button_html = '<button onclick="alter_vote(' + edit.id + ', ' + edit.vote +', 1)">Up</button><button onclick="alter_vote(' + edit.id + ', ' + edit.vote + ', -1)">Down</button>'
    $('#' + edit.id).html('User:' + edit.editedBy + '<br/>Content: ' + edit.content + '<br/>Votes: ' + edit.vote + '<br/>' + button_html);
}