/*global $:false, console:false */
// contact main js
'use strict';

$(document).ready(init);
  let index = {};
function init() {
  $('#contactEdit').modal('hide');
  $('#submit').click(addContact);
  $('#contactList').on('click', 'td.delete', deleteContact);
  $('#contactList').on('click', 'td.edit', launchModal);
  $('#saveContact').on('click', editContact);
}

function launchModal () {
  $('#contactEdit').modal('show'); 
  let $thisRow = $(this).closest('tr'); // jshint ignore:line
  index.value = $thisRow.index();
}

function editContact () {
  //console.log(index.value);
  var person = {};
  person.Name = $('input#NameModal').val();
  person.Phone = $('input#PhoneModal').val();
  person.Email = $('input#EmailModal').val();
  person.index = index.value;
  $('input').each(function(index, input) {
    $(input).val('');
  });


   function doit () {
     var newNum = parseInt(index.value + 1);
     console.log(newNum);
     $('#contactList').children("tr:nth-child(" + newNum  + ")").replaceWith(contactRow(person)) // jshint ignore:line
   }

   $.ajax({
    url:'/contacts/update',
    type:'POST',
    data: person
  }).done(doit()); 
}



function deleteContact(){
  let index={};
  let $thisRow = $(this).closest('tr'); // jshint ignore:line
  index.value  = $thisRow.index();
  
  $.ajax({
    url:'/contacts/delete',
    type:'DELETE',
    data: index
  }).done($(this).parent('tr').remove());  // jshint ignore:line
}


function addContact() {
  var person = {};
  person.Name = $('input#Name').val();
  person.Phone = $('input#Phone').val();
  person.Email = $('input#Email').val();

  $('input').each(function(index, input) {
    $(input).val('');
  });

  $.post('/contacts', person)
  .done(function(){
    var $contactRow = contactRow(person);
    $('#contactList').append($contactRow);
  })
  .fail(function(err){
    console.error(err);
  });
}

function contactRow(person) {
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('Name').text(person.Name);
  var $phone = $('<td>').addClass('Phone').text(person.Phone);
  var $email = $('<td>').addClass('Email').text(person.Email);
  

  var $editTd = $('<td>').addClass('edit text-center');
  var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
  $editTd.append($editIcon);
  
  var $deleteTd = $('<td>').addClass('delete text-center');
  var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg');
  $deleteTd.append($deleteIcon);

  $tr.append($name, $phone, $email, $editTd, $deleteTd);
  return $tr;
}

